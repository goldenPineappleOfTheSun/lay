import {Lay, Box} from './lay'

export const VBox = Box.extend({
    _className: "_VBox_",

    ctor(props, children) {
        this._super(_.defaults(props, {indent: 0, width: 'auto'}), children);
    },

    _afterChildrenLayout(parent) {
        this._params.autoHeight = false;

        /* update children */
        let y = 0;
        for (let child of this.fetchChildren()) {
            if (child instanceof Box && !child._params.isVertPosDependent) {
                child.bottom = undefined;
                child._params.top = y;
                child.layout(this);
                y += child.getBounds().height + this._params.indent;
            }
        }

        this._params.autoHeight = true;
    }
});
