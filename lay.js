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

        this._super(_.extend(props, {
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
            origin: {
                anchorPoint: props.anchorPoint,
                width: props.width,
                height: props.height,
                left: props.left,
                right: props.right,
                top: props.top,
                bottom: props.bottom
            }
        }), children);
    },

    /* update layout */
    layout(parent) {
        
        /* own static position (offsets) */
        this.updateStaticPosition();

        /* update children */
        for (let child of this.getChildren()) {
            if (child._className === "_Box_") {
                child.layout(this);
            }
        }

        /* update own autosize */
        this.updateAutosize();

        /* update dependent children */
        for (let child of this.getChildren()) {
            if (child._className === "_Box_") {
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

        let left = 0;
        let right = this.width;
        let bottom = 0;
        let top = this.height;
        const anchor = this.getAnchorPoint();

        for (let c of this.getChildren()) {
            const bounds = c.getBounds();
            left = Math.min(left, bounds.x);
            right = Math.max(right, bounds.x + bounds.width);
            bottom = Math.min(bottom, bounds.y);
            top = Math.max(top, bounds.y + bounds.height);
        }

        if (this._params.autoWidth) {
            const newWidth = right - left;
            this._add_left(left - this.width * anchor.x + newWidth * anchor.x);
            this._set_width(newWidth);

            for (let c of this.getChildren()) {
                if (!c._params.isHorPosDependent) {
                    c._add_left(-left);
                }
            }
        }

        if (this._params.autoHeight) {
            const newHeight = top - bottom;
            this._add_bottom(bottom - this.height * anchor.y + newHeight * anchor.y);
            this._set_height(newHeight);

            for (let c of this.getChildren()) {
                if (!c._params.isVertPosDependent) {
                    c._add_bottom(-bottom);
                }
            }
        }
    },

    /* автоматические увеличение, вслед за детьми */
    /*signalUpdateSize(child) {
        if (this._params.autoWidth) {
            this._signalUpdateSize(child, 'isWidthDependent', 'isHorPosDependent', 'x', 'width', '_set_left', '_add_left', '_set_width')
        }
        if (this._params.autoHeight) {
            this._signalUpdateSize(child, 'isHeightDependent', 'isVertPosDependent', 'y', 'height', '_set_bottom', '_add_bottom', '_set_height')
        }
    },*/

    signalUpdateDependent(parent) {
        const bounds = this.getBounds();

        if (!this._params.isWidthDependent && !this._params.isHeightDependent && !this._params.isHorPosDependent && !this._params.isVertPosDependent) {
            return;
        }

        if (this._params.isWidthDependent || this._params.isHorPosDependent) {
            this._signalUpdateDependentAxis(
                parent, bounds, 
                this._params.isWidthDependent, 
                this._params.isHorPosDependent, 
                'left', 'right', 'width', 
                this._set_left, this._set_right, this._set_width)
        }

        if (this._params.isHeightDependent || this._params.isVertPosDependent) {
            this._signalUpdateDependentAxis(
                parent, bounds, 
                this._params.isHeightDependent, 
                this._params.isVertPosDependent, 
                'bottom', 'top', 'height', 
                this._set_bottom, this._set_top, this._set_height)
        }
    },
/*
    _signalUpdateSize(child, isSizeDependent, isPosDependent, axisPos, axisSize, axisPosSetter, axisPosAdder, axisSizeSetter) {
        const childBounds = child.getBounds();

        const selfAnchor = this.getAnchorPoint()[axisPos];
        const childLeft = childBounds[axisPos];
        const childRight = childBounds[axisPos] + childBounds[axisSize];
        const selfLeft = 0
        const selfRight = this[axisSize];
        const left = Math.min(childLeft, selfLeft);
        const right = Math.max(childRight, selfRight);
        const newSize = right - left;
        const newPos = left + newSize * selfAnchor;

        this[axisPosAdder](newPos - (this[axisSize] * selfAnchor));
        this[axisSizeSetter](newSize);

        for (let c of this.getChildren()) {
            if (c._params[isPosDependent]) {
                continue;
            }
            if (left !== 0) {
                // moving
                c[axisPosAdder](-left);
            }
        }
    },*/

    _signalUpdateDependentAxis(parent, bounds, isSizeDependent, isPosDependent, axisDirect, axisNegative, axisSize, axisDirectSetter, axisNegativeSetter, axisSizeSetter) {
        const size = this._params.origin[axisSize]
        const direct = this._params.origin[axisDirect]
        const opposite = this._params.origin[axisNegative]

        if (isSizeDependent && isDefined(size)) {
            axisSizeSetter.call(this, this._calc(size, parent, bounds, axisSize), bounds);
        }
        
        if (isPosDependent && isDefined(direct)) {
            axisDirectSetter.call(this, this._calc(direct, parent, bounds, axisSize), bounds);
        }
        
        if (isPosDependent && isDefined(opposite)) {
            axisNegativeSetter.call(this, this._calc(opposite, parent, bounds, axisSize), bounds);
        }
    },

    _set_left(value) {
        if (!value) {
            return
        }
        this.setPositionX(value);
        this._params.left = value;
    },

    _set_right(value, parentBounds) {
        if (!value) {
            return
        }
        const bounds = this.getBounds();
        if (this._params.isHorPosDependent) {
            this._set_left(parentBounds.width - value);
        } else {
            this._set_left(-value);
        }
    },

    _set_width(value) {
        if (!value) {
            return
        }
        this.setWidth(value);
        this._params.width = value;
    },

    _set_bottom(value) {
        if (!value) {
            return
        }
        this.setPositionY(value);
        this._params.bottom = value;
    },

    _set_top(value, parentBounds) {
        if (!value) {
            return
        }
        const bounds = this.getBounds();
        if (this._params.isVertPosDependent) {
            this._set_bottom(parentBounds.height - value);
        } else {
            this._set_bottom(-value);
        }
    },

    _set_height(value) {
        if (!value) {
            return
        }
        this.setHeight(value);
        cc.log(`----${value}`)
        this._params.height = value;
    },

    _add_left(value) {
        if (!value) {
            return
        }
        this.setPositionX(this.x + value);
        this._params.left += value;
    },

    _add_width(value) {
        if (!value) {
            return
        }
        this.setWidth(this.width + value);
        this._params.width += value;
    },

    _add_bottom(value) {
        if (!value) {
            return
        }
        this.setPositionY(this.y + value);
        this._params.bottom += value;
    },

    _add_height(value) {
        if (!value) {
            return
        }
        this.setHeight(this.height + value);
        this._params.height += value;
    },


    _calc(value, parent, parentBounds, axis) {
        if (typeof(value) === 'string') {
            value = value
                .replaceAll(/(\d+(\.\d+){0,1})%/g, (a, num) => parentPercent(parent, parentBounds, +num, axis))
                .replaceAll(/(\d+(\.\d+){0,1})dw%/g, (a, num) => designPercent(+num, 'width'))
                .replaceAll(/(\d+(\.\d+){0,1})dh%/g, (a, num) => designPercent(+num, 'height'))
                .replaceAll(/(\d+(\.\d+){0,1})sw%/g, (a, num) => screenPercent(+num, 'width'))
                .replaceAll(/(\d+(\.\d+){0,1})sh%/g, (a, num) => screenPercent(+num, 'height'));
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
export const Lay = Box.extend({
    _className: "_Lay_",

    ctor(props, children) {
        this._super(_.extend(props, {
            layout: LayLayout,
        }), children);
    },

})