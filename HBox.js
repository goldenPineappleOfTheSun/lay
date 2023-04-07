import {Lay, Box} from './lay'

export const HBox = Box.extend({
    _className: "_HBox_",

    ctor(props, children) {
        this._super(_.defaults(props, {indent: 0, height: 'auto'}), children);
    },

    _afterChildrenLayout(parent) {
        this._params.autoWidth = false;

        /* update children */
        let x = 0;
        for (let child of this.fetchChildren()) {
            if (child instanceof Box && !child._params.isHorPosDependent) {
                child.right = undefined;
                child._params.left = x;
                child.layout(this);
                x += child.getBounds().width + this._params.indent;
            }
        }

        this._params.autoWidth = true;
    }
});
