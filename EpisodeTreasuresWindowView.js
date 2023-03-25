/**
 * @copyright TAPCLAP
 */

import {Container} from "../../../ui/Component";
import {Box} from '../../../lay.js'
import {
	Window2View
} from '../../../gems/views/ui/Window2View';

/**
 * @class EpisodeTreasuresWindowView
 * @classdesc Вьюшка окна сокровищницы для Web версии
 * @extends BaseWindowView
 */

export const EpisodeTreasuresWindowView = Window2View.extend({
	resources: _.defaults({
		episodeTreasuresWindowView_plist: 'sprites/landscape/episodeTreasuresWindowView.plist'
	}, Window2View.prototype.resources),

	ctor: function (model) {
		this._super(model);
		this.model = model;
		this.treasures = this.model.getTreasures();
		let count = Math.ceil(this.treasures.getTotalTreasure() / 81);
		for (let i = 0; i < count; i++) {
			this.resources['treasure' + i] = 'res/sprites/treasureimages_' + i + '.plist';
		}
	},

	getTitleText: function () {
		return application.ln.print('treasures.title');
	},

	body: function () {
		const width = 600;
		const height = 400;
		const screenWidth = cc.visibleRect.width
		const screenHeight = cc.visibleRect.height

		return <Container
			width={width}
			height={height}
		>
		<Box>
			<Box drawBox={true} width={'auto'} minWidth={100} height={'auto'}>
				<Box left={0} width={30} height={300}></Box>
				<Box bottom={50} left={200} width={30} height={30}></Box>
				<Box drawBox={true} left={'1%'} width={'50%'} height={200}></Box>
			</Box>
		</Box>
		</Container>
	},
});
