import {Container} from './ui/Component';
import {BaseLayout} from './ui/layouts/Layout';

export class LayLayout extends BaseLayout {
    onLayout() {
        this._component.layout()
    }
}

export class NoLayout extends BaseLayout {
    onLayout() {

    }
}

export const Box = Container.extend({
    _className: "_Box_",

    ctor(props, children) {

        const widthType = !isDefined(props.width) || typeof(props.width) === 'number'
            ? 'static'
            : props.width === 'auto'
            ? 'auto'
            : props.fly || typeof(props.width) === 'string'
            ? 'dependent'
            : null;
        const heightType = !isDefined(props.height) || typeof(props.height) === 'number'
            ? 'static'
            : props.height === 'auto'
            ? 'auto'
            : props.fly || typeof(props.height) === 'string'
            ? 'dependent'
            : null;
        const leftType = !isDefined(props.left) || typeof(props.left) === 'number'
            ? 'static'
            : props.fly || typeof(props.left) === 'string'
            ? 'dependent'
            : null;
        const rightType = !isDefined(props.right) || typeof(props.right) === 'number'
            ? 'static'
            : props.fly || typeof(props.right) === 'string'
            ? 'dependent'
            : null;
        const bottomType = !isDefined(props.bottom) || typeof(props.bottom) === 'number'
            ? 'static'
            : props.fly || typeof(props.bottom) === 'string'
            ? 'dependent'
            : null;
        const topType = !isDefined(props.top) || typeof(props.top) === 'number'
            ? 'static'
            : props.fly || typeof(props.top) === 'string'
            ? 'dependent'
            : null;

        if (isDefined(props.left) && isDefined(props.right)) {
            cc.error('Нельзя left + right!');
            props.right = undefined;
        }
        if (isDefined(props.top) && isDefined(props.bottom)) {
            cc.error('Нельзя top + bottom!');
            props.top = undefined;
        }

        if (!isDefined(props.left) && !isDefined(props.right)) {
            props.left = 0;
        }
        if (!isDefined(props.bottom) && !isDefined(props.top)) {
            props.top = 0;
        }
        if (widthType === 'dependent') {
            if (heightType === 'dependent' && props.width.indexOf('width') > -1 && props.width.indexOf('height') > -1) {
                cc.error('Нельзя ratio на width и height одновременно!');
                props.height = 100;
            }
            if (props.width.indexOf('width') > -1) {
                cc.error('Нельзя ratio width использовать в самом width!');
                props.width = 100;
            }
        }
        if (heightType === 'dependent') {
            if (props.height.indexOf('height') > -1) {
                cc.error('Нельзя ratio height использовать в самом height!');
                props.height = 100;
            }
        }

        props = _.extend(props, {
            layout: props.layout === LayLayout ? LayLayout : NoLayout,
            autoWidth: widthType === 'auto',
            autoHeight: heightType === 'auto',
            isWidthDependent: widthType === 'dependent',
            isHeightDependent: heightType === 'dependent',
            isHorPosDependent: leftType === 'dependent' || rightType === 'dependent',
            isVertPosDependent: bottomType === 'dependent' || topType === 'dependent',
            width: props.width === 'auto' ? (props.minWidth ? props.minWidth : 0) : props.width || 0,
            height: props.height === 'auto' ? (props.minHeight ? props.minHeight : 0) : props.height || 0,
            anchorPoint: props.anchorPoint || cc.p(0, 1),
            padding: props.padding || 0,
            origin: props.origin || cc.p(0, 1),
            original: {
                anchorPoint: props.anchorPoint,
                width: props.width,
                height: props.height,
                left: props.left,
                right: props.right,
                top: props.top,
                bottom: props.bottom
            }
        });

        switch (this._className) {
            case '_Box_':
                const offsetContainer = new OriginOffsetContainer(props, children);
                this._super(props, [offsetContainer]);
                break;
            case '_Lay_':
                this._super(props, children);
                break;
            case '_OriginOffsetContainer_':
                this._super(props, children);
                break;
            default: 
                this._super(props, children);
                break;
        }
    },

    /* update layout */
    layout(parent) {
        /* own static position (offsets) */
        this.updateStaticPosition();

        /* update children */
        for (let child of this.getChildren()) {
            if (child._className === "_Box_" || child._className === '_OriginOffsetContainer_') {
                child.layout(this);
            }
        }

        /* update own autosize */
        this.updateAutosize();

        /* update dependent children */
        for (let child of this.getChildren()) {
            if (child._className === "_Box_" || child._className === '_OriginOffsetContainer_') {
                child.signalUpdateDependent(this);
            }
        }

        if (this._params.assert) {
            this._assert(this._params.assert);
        }
    },

    /* возвращает свои размеры и положение. Хорошее место для оптимизаций */
    getBounds() {
        return this.getBoundingBox();
    },

    /* функция, обратная origin point. Указывает на свой bounding box с учётом origin point */
    getDimensions() {
        return {x:0, y:0, width:this.width, height:this.height};
    },

    fetchChildren() {
        let result = this.getChildren();
        result = result.reduce((a, c) => {
            if (c._className === '_OriginOffsetContainer_') {
                return a.concat(c.fetchChildren());
            } else {
                return a.concat([c])
            }
        }, []);
        return result;
    },

    updateStaticPosition() {
        if (!this._params.isHorPosDependent) {
            this.setPositionX(isDefined(this._params.left) ? this._params.left : -this._params.right)
        }
        if (!this._params.isVertPosDependent) {
            this.setPositionY(isDefined(this._params.top) ? -this._params.top : this._params.bottom)
        }
    },

    /* автоматические увеличение, вслед за детьми */
    updateAutosize() {
        if (!this._params.autoWidth && !this._params.autoHeight) {
            return;
        }     

        const origin = this._params.origin;
        const padding = this._params.padding;
        let left = -origin.x * this.width - padding;
        let right = (1 - origin.x) * this.width + padding;
        let bottom = -origin.y * this.height - padding;
        let top = (1 - origin.y) * this.height + padding;
        const oldAnchor = this.getAnchorPointCoords(left, right, bottom, top);
        const oldOrigin = this.getOriginPointCoords(left, right, bottom, top);

        for (let c of this.fetchChildren()) {
            const bounds = c.getBounds();
            left = Math.min(left, bounds.x - padding);
            right = Math.max(right, bounds.x + bounds.width + padding);
            bottom = Math.min(bottom, bounds.y - padding);
            top = Math.max(top, bounds.y + bounds.height + padding);
        }

        const newAnchor = this.getAnchorPointCoords(left, right, bottom, top);
        const newOrigin = this.getOriginPointCoords(left, right, bottom, top);

        if (this._params.autoWidth) {
            const newWidth = right - left;
            this._add_left(newAnchor.x - oldAnchor.x);
            this._set_width(newWidth);

            for (let c of this.getChildren()) {
                c.signalOffsetParentResizedWidth(oldOrigin, newOrigin);
            }
        }

        if (this._params.autoHeight) {
            const newHeight = top - bottom;
            this._add_bottom(newAnchor.y - oldAnchor.y);
            this._set_height(newHeight);

            for (let c of this.getChildren()) {
                c.signalOffsetParentResizedHeight(oldOrigin, newOrigin);
            }
        }
    },

    signalOffsetParentResizedWidth(oldOrigin, newOrigin) {
        if (!this._params.isHorPosDependent) {
            this._add_left(oldOrigin.x - newOrigin.x);
        }
    },

    signalOffsetParentResizedHeight(oldOrigin, newOrigin) {
        if (!this._params.isVertPosDependent) {
            this._add_bottom(oldOrigin.y - newOrigin.y);
        }
    },

    signalUpdateDependent(parent) {
        const parentDimensions = parent.getDimensions();            

        if (!this._params.isWidthDependent && !this._params.isHeightDependent && !this._params.isHorPosDependent && !this._params.isVertPosDependent) {
            return;
        }

        if (this._params.isWidthDependent || this._params.isHorPosDependent) {
            this._signalUpdateDependentAxis(
                parent, parentDimensions, 
                this._params.isWidthDependent, 
                this._params.isHorPosDependent, 
                'left', 'right', 'width', 
                this._set_left, this._set_right, this._set_width)
        }

        if (this._params.isHeightDependent || this._params.isVertPosDependent) {
            this._signalUpdateDependentAxis(
                parent, parentDimensions, 
                this._params.isHeightDependent, 
                this._params.isVertPosDependent, 
                'bottom', 'top', 'height', 
                this._set_bottom, this._set_top, this._set_height)
        }
    },

    getAnchorPointCoords(left, right, bottom, top) {
        if (!isDefined(left) || !isDefined(right) || !isDefined(bottom) || !isDefined(top)) {
            const bounds = this.getDimensions();
            left = bounds.x
            right = bounds.x + bounds.width
            bottom = bounds.y
            top = bounds.y + bounds.height
        }
        const width = right - left
        const height = top - bottom
        const anchor = this.getAnchorPoint();
        return cc.p(left + width * anchor.x, bottom + height * anchor.y)
    },

    getOriginPointCoords(left, right, bottom, top) {
        if (!isDefined(left) || !isDefined(right) || !isDefined(bottom) || !isDefined(top)) {
            const bounds = this.getDimensions();
            left = bounds.x
            right = bounds.x + bounds.width
            bottom = bounds.y
            top = bounds.y + bounds.height
        }
        const width = right - left
        const height = top - bottom
        const origin = this._params.origin;
        return cc.p(left + width * origin.x, bottom + height * origin.y)
    },

    _signalUpdateDependentAxis(parent, parentDimensions, isSizeDependent, isPosDependent, axisDirect, axisNegative, axisSize, axisDirectSetter, axisNegativeSetter, axisSizeSetter) {
        const size = this._params.original[axisSize]
        const direct = this._params.original[axisDirect]
        const opposite = this._params.original[axisNegative]

        if (isSizeDependent && isDefined(size)) {
            axisSizeSetter.call(this, this._calc(size, parent, parentDimensions, axisSize), parentDimensions);
        }
        
        if (isPosDependent && isDefined(direct)) {
            axisDirectSetter.call(this, this._calc(direct, parent, parentDimensions, axisSize), parentDimensions);
        }
        
        if (isPosDependent && isDefined(opposite)) {
            axisNegativeSetter.call(this, this._calc(opposite, parent, parentDimensions, axisSize), parentDimensions);
        }
    },

    _set_left(value, parentDimensions) {
        if (!isDefined(value)) {
            return
        }
        this._params.left = value;
        if (this._params.isHorPosDependent) {
            this.setPositionX(parentDimensions.x + value);
        } else {
            this.setPositionX(value);
        }
    },

    _set_right(value, parentDimensions) {
        if (!isDefined(value)) {
            return
        }
        const bounds = this.getBounds();
        if (this._params.isHorPosDependent) {
            this._set_left(parentDimensions.width - value, parentDimensions);
        } else {
            this._set_left(-value, parentDimensions);
        }
    },

    _set_width(value) {
        if (!isDefined(value)) {
            return
        }
        this.setWidth(value);
        this._params.width = value;
    },

    _set_bottom(value, parentDimensions) {
        if (!isDefined(value)) {
            return
        }
        this._params.bottom = value;
        if (this._params.isVertPosDependent) {
            this.setPositionY(parentDimensions.y + value);
        } else {
            this.setPositionY(value);
        }
    },

    _set_top(value, parentDimensions) {
        if (!isDefined(value)) {
            return
        }
        const bounds = this.getBounds();
        if (this._params.isVertPosDependent) {
            this._set_bottom(parentDimensions.height - value, parentDimensions);
        } else {
            this._set_bottom(-value, parentDimensions);
        }
    },

    _set_height(value) {
        if (!isDefined(value)) {
            return
        }
        this.setHeight(value);
        this._params.height = value;
    },

    _add_left(value) {
        if (!isDefined(value)) {
            return
        }
        this.setPositionX(this.x + value);
        this._params.left += value;
    },

    _add_width(value) {
        if (!isDefined(value)) {
            return
        }
        this.setWidth(this.width + value);
        this._params.width += value;
    },

    _add_bottom(value) {
        if (!isDefined(value)) {
            return
        }
        this.setPositionY(this.y + value);
        this._params.bottom += value;
    },

    _add_height(value) {
        if (!isDefined(value)) {
            return
        }
        this.setHeight(this.height + value);
        this._params.height += value;
    },


    _calc(value, parent, parentBounds, axis) {
        if (typeof(value) === 'string') {
            value = value
                .replaceAll(/(\d+(\.\d+){0,1})%/g, (a, num) => parentPercent(parent, parentBounds, +num, axis))
                .replaceAll(/(\d+(\.\d+){0,1})d%/g, (a, num) => designPercent(+num, axis))
                .replaceAll(/(\d+(\.\d+){0,1})s%/g, (a, num) => screenPercent(+num, axis))
                .replaceAll(/width/g, (a, num) => this.width)
                .replaceAll(/height/g, (a, num) => this.height)
            return eval(value);
        } else {
            return value;
        }
    },

    _assert(json) {
        json = JSON.parse(json);
        const rootPosition = this._container.convertToWorldSpaceAR(this._container.position);
        const rootSize = this._container.convertToWorldSpaceAR(this._container.size);
        for (name in json) {
            const assertion = json[name];
            const box = getChildByName(this, name);
            if (!box) {
                cc.error(`Cant find a Box named ${name}`)
                return
            }
            const bb = box.getBoundingBox();
            if (isDefined(assertion.left)) {
                const left = box.convertToWorldSpaceAR(bb.position).x - rootPosition.x;
                if (Math.floor(assertion.left) !== Math.floor(left)) {
                    cc.error(`Assertion error for left in ${name}: ${Math.floor(assertion.left)} != ${Math.floor(left)}!`)
                }
            }
            if (isDefined(assertion.bottom)) {
                const bottom = box.convertToWorldSpaceAR(bb.position).y - rootPosition.y;
                if (Math.floor(assertion.bottom) !== Math.floor(bottom)) {
                    cc.error(`Assertion error for bottom in ${name}: ${Math.floor(assertion.bottom)} != ${Math.floor(bottom)}!`)
                }
            }
            if (isDefined(assertion.width)) {
                const width = bb.width;
                if (Math.floor(assertion.width) !== Math.floor(width)) {
                    cc.error(`Assertion error for width in ${name}: ${Math.floor(assertion.width)} != ${Math.floor(width)}!`)
                }
            }
            if (isDefined(assertion.height)) {
                const height = bb.height;
                if (Math.floor(assertion.height) !== Math.floor(height)) {
                    cc.error(`Assertion error for height in ${name}: ${Math.floor(assertion.height)} != ${Math.floor(height)}!`)
                }
            }
        }
    }
});

export const OriginOffsetContainer = Box.extend({
    _className: "_OriginOffsetContainer_",

    ctor(props, children) {

        this._super({
            col: props.col,
            anchorPoint: cc.p(0.5, 0.5),
            name: `${props.name || ''}_offset_container`,
            width: 0,
            height: 0,
            padding: 0,
            left: `${props.padding} + (100% - ${props.padding} * 2) * ${props.origin.x}`,
            right: undefined,
            bottom: `${props.padding} + (100% - ${props.padding} * 2) * ${props.origin.y}`,
            top: undefined,
            origin: undefined,
            autoWidth: false,
            isWidthDependent: true,
            isHeightDependent: true,
            isHorPosDependent: true,
            isVertPosDependent: true,
            drawBox: false
        }, children);
    },

    /* overriden */
    getDimensions() {
        /* hm??? */
        const parent = this._parent._parent;

        let result = parent.getBounds();
        result.x = result.x || 0;
        result.y = result.y || 0;
        result.x = -parent._params.origin.x * result.width;
        result.y = -parent._params.origin.y * result.height;
        return result;
    },

    /* overriden */
    signalOffsetParentResizedWidth(oldOrigin, newOrigin) {
        for (let c of this.getChildren()) {
            c.signalOffsetParentResizedWidth(oldOrigin, newOrigin);
        }
    },

    /* overriden */
    signalOffsetParentResizedHeight(oldOrigin, newOrigin) {
        for (let c of this.getChildren()) {
            c.signalOffsetParentResizedHeight(oldOrigin, newOrigin);
        }
    },
});

export const Lay = Box.extend({
    _className: "_Lay_",

    ctor(props, children) {
        this._super(_.extend(props, {
            layout: LayLayout,
        }), children);
    },

})

function isDefined(value) {
    return value !== null && value !== undefined;
}

function getChildByName(root, childName) {
    var childNode = root.getChildByName(childName);
    if (childNode) {
        return childNode;
    } else {
        var children = root.getChildren();
        for (var i = 0; i < children.length; i++) {
            var childNode = getChildByName(children[i], childName);
            if (childNode) {
                return childNode;
            }
        }
        return null;
    }
}

function parentPercent(parent, parentBounds, value, axis) {
    return parentBounds[axis] * value * 0.01;
}

function designPercent(value, axis) {
    return Config.designResolution[axis] * value * 0.01;
}

function screenPercent(value, axis) {
    return cc.visibleRect[axis] * value * 0.01;
}