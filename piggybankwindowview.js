/*
 * @Copyright OrangeApps
 */

import {Window2View} from "../../../gems/views/ui/Window2View";
import {ContainLayout, FitLayout} from "../../../ui/layouts/FitLayout";
import {AlignAP} from "../../../ui/AlignAP";
import {RichText} from "../../../ui/RichText";
import {colors} from "../../../gems/views/colors";
import {LinearProgressBar} from "../../../gems/snipets/linearprogressbar";
import {Sprite} from "../../../ui/Sprite";
import {ColorButtonScheme, IconButton} from "../../../gems/snipets/buttons";
import {Label} from "../../../ui/Label";
import {Button, Hoverable, ScaleHoverAction} from "../../../ui";
import {RectColor} from "../../../ui/RectColor";

import {Container} from '../../../ui/Component'
import {Lay, Box} from '../../../lay'

export const PiggybankWindowView = Window2View.extend({
	resources: _.defaults({
		timeactionwindow_plist: 'sprites/timeaction.plist',
		icons_plist: 'sprites/icons.plist',
		piggybankwindow_plist: 'sprites/piggybankwindow.plist',
		piggybankportraitwindow_plist: 'sprites/portrait/piggybankwindow.plist'
	}, Window2View.prototype.resources),

	verticalMargin: 80,
	horizontalMargin: 20,

	getTitleText: function () {
		return application.ln.print('piggybankWindow.title');
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

		</Container>
	},

	otherAsserts: function() {
		return <Container>

			<Lay name={'static block'} assert={'{"Doge":{"left":17, "bottom":-22, "width":301, "height":302}}'}>
				<Box name={'Doge'} drawBox={true} width={301} height={302} left={17} top={22}>
				</Box>
			</Lay>

			<Lay bottom={500} name={'auto block'} assert={'{"Doge":{"left":0, "bottom":-331, "width":191, "height":331}}'}>
				<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'}>
					<Box name={'Cat'} drawBox={true} width={191} height={331}></Box>
				</Box>
			</Lay>
			
			<Lay name={'auto block min size'} assert={'{"Doge":{"left":0, "bottom":0, "width":200, "height":200}}'}>
				<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={200} minHeight={200}>
				</Box>
			</Lay>

			
			<Container name={'auto block stretches vertically'}>

				<Lay left={60} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25}>
					</Box>
				</Lay>

				<Lay left={120} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} >
						<Box name={'Cat'} drawBox={true} width={50} height={25} bottom={150} ></Box>
					</Box>
				</Lay>

				<Lay left={180} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} >
						<Box name={'Mouse'} drawBox={true} width={50} height={25} top={150}></Box>
					</Box>
				</Lay>

				<Lay left={240} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25}>
						<Box name={'Cat'} drawBox={true} width={50} height={25} bottom={150}></Box>
						<Box name={'Mouse'} drawBox={true} width={50} height={25} top={150}></Box>
					</Box>
				</Lay>

				<Lay left={300} bottom={100}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
					</Box>
				</Lay>

				<Lay left={360} bottom={100} assert={'{"Doge":{"left":0, "bottom":125, "width":50, "height":150}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
						<Box name={'Cat'} drawBox={true} width={50} height={25} bottom={150}></Box>
					</Box>
				</Lay>

				<Lay left={420} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":50, "height":200}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
						<Box name={'Mouse'} drawBox={true} width={50} height={25} top={150}></Box>
					</Box>
				</Lay>

				<Lay left={480} bottom={100} assert={'{"Doge":{"left":0, "bottom":125, "width":50, "height":325}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
						<Box name={'Cat'} drawBox={true} width={50} height={25} bottom={150}></Box>
						<Box name={'Mouse'} drawBox={true} width={50} height={25} top={150}></Box>
					</Box>
				</Lay>

			</Container>

			<Container name={'auto block stretches vertically with opposite anchorPoints'}>

				<Lay left={60} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
					</Box>
				</Lay>

				<Lay left={120} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={180} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={240} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={300} bottom={100}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
					</Box>
				</Lay>

				<Lay left={360} bottom={100} assert={'{"Doge":{"left":25, "bottom":0, "width":50, "height":175}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={420} bottom={100} assert={'{"Doge":{"left":25, "bottom":-150, "width":50, "height":175}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={480} bottom={100} assert={'{"Doge":{"left":25, "bottom":-150, "width":50, "height":325}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

			</Container>

			<Container name={'auto block stretches horizontally with centered anchorPoints'}>

				<Lay left={200} top={-300} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
					</Box>
				</Lay>

				<Lay left={200} top={-240} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-180} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-120} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-60} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
					</Box>
				</Lay>

				<Lay left={200} top={0} assert={'{"Doge":{"left":68, "bottom":-13, "width":162, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={60} assert={'{"Doge":{"left":-82, "bottom":-13, "width":187, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={120} assert={'{"Doge":{"left":-13, "bottom":-13, "width":325, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse1'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

			</Container>

		</Container>
	},

	getDescription: function () {
		let piggyBank = this.model.get('piggyBank');

		if (this.model.isFull()) {
			return application.ln.print('piggybankWindow.description3', {
				coins: piggyBank.get('coins'),
				maxCoins: piggyBank.get('maxCoins'),
				minCoins: piggyBank.get('minCoins')
			});
		} else if (this.model.canCollect()) {
			return application.ln.print('piggybankWindow.description2', {
				coins: piggyBank.get('coins'),
				maxCoins: piggyBank.get('maxCoins'),
				minCoins: piggyBank.get('minCoins')
			});
		} else {
			return application.ln.print('piggybankWindow.description1', {
				coins: piggyBank.get('coins'),
				maxCoins: piggyBank.get('maxCoins'),
				minCoins: piggyBank.get('minCoins')
			});
		}
	},

	getButtonText: function () {
		let offer = application.offers.get('breakPiggybank');
		return application.ln.print('piggybankWindow.open') + ' ' + offer.getTextPrice()
	},

	getFitScale: function () {
		if (!Config.orientation || Config.orientation === 'portrait') {
			const wrapper = this.getById('windowContainer');

			if (wrapper) {
				const size = wrapper.getContentSize();

				let width = size.width + 2 * this.horizontalMargin;
				let height = size.height + 2 * this.verticalMargin;

				return Math.min(cc.visibleRect.height / height, cc.visibleRect.width / width);
			}
		}

		return 1;
	},

	closeButton: function () {
		return <Button
			background={'#cancelBtn.png'}
			hover={new Hoverable()}
			hoverAction={ScaleHoverAction()}
			right={10}
			top={15}
			scale={1.2}
			action={() => this.model.close()}
		/>
	}
});
