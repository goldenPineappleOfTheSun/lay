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
        /*
                                               width      pos         height
        width auto  left 20     height auto    auto       static      auto
        width 20    left 20     height auto    static     static      auto
        width 20%   left 20     height auto    dependent  static      auto
        width auto  left 20%    height auto    auto       dependent   auto
        width 20    left 20%    height auto    static     dependent   auto
        width 20%   left 20%    height auto    dependent  dependent   auto

        */

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
        if (isDefined(props.hdock) && props.hdock !== 'left' && props.hdock !== 'right') {
            cc.error('возможные значения для hdock: "left" или "right"');
            props.hdock = null;
        }
        if (isDefined(props.vdock) && props.vdock !== 'bottom' && props.vdock !== 'top') {
            cc.error('возможные значения для vdock: "bottom" или "top"');
            props.vdock = null;
        }

        if (!isDefined(props.left) && !isDefined(props.right)) {
            props.left = 0;
        }
        if (!isDefined(props.bottom) && !isDefined(props.top)) {
            props.bottom = 0;
        }

        this._super(_.extend(props, {
            layout: props.layout === LayLayout ? LayLayout : NoLayout,
            hdock: props.hdock || 'left',
            vdock: props.vdock || 'top',
            autoWidth: widthType === 'auto',
            autoHeight: heightType === 'auto',
            isWidthDependent: widthType === 'dependent',
            isHeightDependent: heightType === 'dependent',
            isHorPosDependent: leftType === 'dependent' || rightType === 'dependent',
            isVertPosDependent: bottomType === 'dependent' || topType === 'dependent',
            width: props.width === 'auto' ? (props.minWidth ? props.minWidth : 0) : props.width,
            height: props.height === 'auto' ? (props.minHeight ? props.minHeight : 0) : props.height,
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

    /* update layout */
    layout(parent) {
        /*
        сначала считаются собственные координаты (если позиции блока приземлены),
        причём учитывается ориджин родителя. Например, при ориджене у родителя top, 
        текущий блок должен поднятся вверх на высоту родителя
        затем вызываем лейаут у детей, чтобы они узнали свои размеры
        на этом же шаге дети вызывают signalUpdateSize у этого блока (если он авто)
        далее обновляем летающих (зависимы от текущего блока) детей
        и в конце концов вызываем signalUpdateSize, чтобы он мог оценить
        новые размеры этого блока и растянутся (если он авто)
        */

        const bounds = this.getBounds();

        /* own static position (offsets) */
        this.updateStaticPosition();

        /* update children static positions */
        /*for (let child of this.getChildren()) {
            child._className === "_Box_" && child.updateStaticPositions(this);
        }*/

        /* update children */
        for (let child of this.getChildren()) {
            if (child._className === "_Box_") {
                child.layout(this);
                //child.updateAnchorPointAccordingToDock(this._params.hdock, this._params.vdock);
            }
        }

        /* update dependent children */
        for (let child of this.getChildren()) {
            if (child._className === "_Box_") {
                child.signalUpdateDependent(this, bounds);
                //child.correctionForDock(this._params.hdock, this._params.vdock, bounds.width, bounds.height);
            }
        }

        /* update autosize parent */
        if (isDefined(parent)) {
            parent.signalUpdateSize(this);
        }

        if (this._params.assert) {
            this._assert(this._params.assert);
        }
    },

    /* возвращает свои размеры и положение. Хорошее место для оптимизаций */
    getBounds() {
        let result = this.getBoundingBox();
        result.x = result.x || 0;
        result.y = result.y || 0;
        result.width = result.width || 0;
        result.height = result.height || 0;
        return result;
    },

    updateStaticPosition() {
        this.setPositionX(isDefined(this._params.left) ? this._params.left : -this._params.right)
        this.setPositionY(isDefined(this._params.top) ? -this._params.top : this._params.bottom)
    },

    updateAnchorPointAccordingToDock(hdock, vdock) {
        if (!isDefined(this._params.origin.anchorPoint)) {
            const x = (hdock === 'right') ? 1 : 0; 
            const y = (hdock === 'bottom') ? 0 : 1; 
            this._params.anchorPoint = cc.p(x, y);
            this.setAnchorPoint(this._params.anchorPoint);
        }
    },

    /*updateStaticPositions(parent) {
        const parentBounds = parent.getBounds();

        if (!this._params.isHorPosDependent) {
            const dockOffset = parent._params.hdock === 'left' ? 0 : parentBounds.width;
            if (isDefined(this._params.left)) {
                this.setPositionX(dockOffset + this._params.left);
            }
            if (isDefined(this._params.right)) {
                this.setPositionX(dockOffset - this._params.right);
            }
        }

        if (!this._params.isVertPosDependent) {
            const dockOffset = parent._params.vdock === 'bottom' ? 0 : parentBounds.height;
            if (isDefined(this._params.bottom)) {
                this.setPositionY(dockOffset + this._params.bottom);
            }
            if (isDefined(this._params.top)) {
                this.setPositionY(dockOffset - this._params.top);
            }
        }

        // даже если анкор поинт где-то установился по пути, но его не было в пропсах 
        if (!this._params.isHorPosDependent && !this._params.isVertPosDependent && !isDefined(this._params.origin.anchorPoint)) {
            this._params.anchorPoint = cc.p(
                (parent._params.hdock === 'right' ? 1 : 0), 
                (parent._params.vdock === 'top' ? 1 : 0));
        }

        this.setAnchorPoint(this._params.anchorPoint);
    },*/

    /* автоматические увеличение, вслед за детьми */
    signalUpdateSize(child) {
        child = child.getBounds();

        if (this._params.autoWidth) {
            // если док слева, значит можно увеличивать ноду вправо, не боясь, что дети уедут
            if (this._params.hdock === 'left' && child.x + child.width > this.width) {
                this._set_width(child.x + child.width);
            }

            // если док слева, значит нужно увеличивать ноду влево осторожно и с учётом детей
            if (this._params.hdock === 'right' && child.x < 0) {
                const delta = this.x - child.x;
                this._set_width(this.width + delta)
                this._set_left(child.left);
                for (let c of this.getChildren()) {
                    if (!c._params.isHorPosDependent) {
                        c._add_left(delta);
                    }
                }
            }
        }

        if (this._params.autoHeight) {
            // если док слева, значит можно увеличивать ноду вправо, не боясь, что дети уедут
            if (this._params.vdock === 'top' && child.y + child.height > this.height) {
                this._set_height(child.y + child.height);
            }

            // если док слева, значит нужно увеличивать ноду влево осторожно и с учётом детей
            if (this._params.vdock === 'top' && child.y < 0) {
                const delta = this.y - child.y;
                this._set_height(this.height + delta)
                this._set_bottom(child.bottom);
                for (let c of this.getChildren()) {
                    if (!c._params.isVertPosDependent) {
                        c._add_bottom(delta);
                    }
                }
            }
        }
    },

    correctionForDock(hdock, vdock, width, height) {
        if (!this._params.isHorPosDependent && hdock === 'right' && isDefined(width)) {
            this.setPositionX(this.x + width);
        }
        if (!this._params.isVertPosDependent && vdock === 'top' && isDefined(height)) {
            this.setPositionY(this.y + height);
        }
    },

    signalUpdateDependent(parent, bounds) {
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

    _calc(value, parent, parentBounds, axis) {
        if (typeof(value) === 'string') {
            value = value
                .replaceAll(/(\d+)%/g, (a, num) => parentPercent(parent, parentBounds, +num, axis))
                .replaceAll(/(\d+)dw%/g, (a, num) => designPercent(+num, 'width'))
                .replaceAll(/(\d+)dh%/g, (a, num) => designPercent(+num, 'height'))
                .replaceAll(/(\d+)sw%/g, (a, num) => screenPercent(+num, 'width'))
                .replaceAll(/(\d+)sh%/g, (a, num) => screenPercent(+num, 'height'));
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