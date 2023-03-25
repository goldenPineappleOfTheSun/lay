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
			<Lay bottom={500} name={'flying all sides'} assert={'{"t":{"width":110, "height":110, "left":-10, "bottom":-10}}'}>
				<Box drawBox={true} name={'Dog'} width={500} height={500}>
					<Box drawBox={true} name={'t'} width={'20%'} height={'20%'} left={'12%'} bottom={'5%'}></Box>
				</Box>
			</Lay>

		</Container>
	},

	otherAsserts: function() {
		return <Container>
		
			<Lay name={'static size'} assert={'{"Dog": {"width":41, "height":47}}'}>
				<Box name={'Dog'} drawBox={true} width={41} height={47}>
				</Box>
			</Lay>

			<Lay name={'static size'} assert={'{"Dog": {"width":41, "height":47}}'}>
				<Box name={'Dog'} drawBox={true} width={41} height={47}>
				</Box>
			</Lay>

			<Lay name={'auto size'} assert={'{"Dog": {"width":113, "height":127}}'}>
				<Box name={'Dog'} drawBox={true} left={200} width={'auto'} height={'auto'}>
					<Box name={'Cat'} width={113} height={127}></Box>
				</Box>
			</Lay>

			<Lay name={'flying all sides'} assert={'{"t": {"left":250, "bottom":340}, "t2": {"left":250, "bottom":340}, "r": {"left":440, "bottom":150}, "r2": {"left":440, "bottom":150}, "b": {"left":250, "bottom":-40}, "b2": {"left":250, "bottom":-40}, "l": {"left":60, "bottom":150}, "l2": {"left":60, "bottom":150}}'}>
				<Box name={'Dog'} drawBox={true} top={-400} width={500} height={500}>
					<Box drawBox={true} name={'t'} width={'20%'} height={'20%'} left={'50%'} top={'12%'}></Box>
					<Box drawBox={true} name={'r'} width={'20%'} height={'20%'} right={'12%'} top={'50%'}></Box>
					<Box drawBox={true} name={'b'} width={'20%'} height={'20%'} right={'50%'} bottom={'12%'}></Box>
					<Box drawBox={true} name={'l'} width={'20%'} height={'20%'} left={'12%'} top={'50%'}></Box>
					<Box drawBox={true} name={'t2'} width={'10%'} height={'10%'} left={'50%'} top={'12%'} anchorPoint={cc.p(0.5,0.5+1)}></Box>
					<Box drawBox={true} name={'r2'} width={'10%'} height={'10%'} right={'12%'} top={'50%'} anchorPoint={cc.p(0.5+1,0.5)}></Box>
					<Box drawBox={true} name={'b2'} width={'10%'} height={'10%'} right={'50%'} bottom={'12%'} anchorPoint={cc.p(0.5,0.5-1)}></Box>
					<Box drawBox={true} name={'l2'} width={'10%'} height={'10%'} left={'12%'} top={'50%'} anchorPoint={cc.p(0.5-1,0.5)}></Box>
				</Box>
			</Lay>

			<Lay name={'width and height are independent'} assert={'{"Cat": {"width":400, "height":250}}'}>
				<Box name={'Dog'} drawBox={true} width={500} height={500}>
					<Box drawBox={true} name={'Cat'} width={'auto'} height={'50%'}>
						<Box drawBox={true} name={'Humster'} width={400} height={50}></Box>
					</Box>
				</Box>
			</Lay>

			<Lay bottom={500} name={'width and height are independent'} >
				<Box name={'Dog'} drawBox={true} width={500} height={500}>
					<Box drawBox={true} name={'Cat'} width={'auto'} height={'50%'}>
						<Box drawBox={true} name={'Humster'} width={400} height={50}></Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'width and height are independent 2'} assert={'{"Cat": {"width":250, "height":400}}'}>
				<Box name={'Dog'} drawBox={true} width={500} height={500}>
					<Box drawBox={true} name={'Cat'} width={'50%'} height={'auto'}>
						<Box drawBox={true} name={'Humster'} width={50} height={400}></Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of statics'} assert={'{"a": {"left":0, "bottom":103}, "b": {"left":103, "bottom":103}, "c": {"left":103, "bottom":0}}'}>
				<Box drawBox={true} name={'Doge'} width={100} height={100}>
					<Box drawBox={true} name={'a'} width={100} height={100} bottom={103}>
						<Box drawBox={true} name={'b'} width={100} height={100} left={103}>
							<Box drawBox={true} name={'c'} width={100} height={100} top={103}></Box>
						</Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of autos'} assert={'{"Whale": {"width":120, "height":120}, "Fish": {"width":120, "height":120}}'}>
				<Box drawBox={true} name={'Whale'} width={'auto'} height={'auto'}>
					<Box drawBox={true} name={'Dolphin'} width={'auto'} height={'auto'}>
						<Box drawBox={true} name={'Fish'} width={'auto'} height={'auto'}>
							<Box name={'Plankton1'} drawBox={true} width={20} height={20}></Box>
							<Box name={'Plankton2'} drawBox={true} width={20} height={20} left={100} bottom={100}></Box>
						</Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of flyings'} assert={'{"Front": {"left":350, "bottom":150}, "Front 2": {"left":190, "bottom":170}, "Front 3": {"left":50, "bottom":190}}'}>
				<Box drawBox={true} name={'Starship'} width={500} height={500}>
					<Box drawBox={true} name={'Front'} width={150} height={200} right={'0'} top={'150'}>
						<Box drawBox={true} name={'Front 2'} width={130} height={160} right={'180'} top={-20}>
							<Box drawBox={true} name={'Front 3'} width={110} height={120} right={'160'} top={-20}></Box>
						</Box>
					</Box>
				</Box>
			</Lay>
			
			<Lay name={'dock left bottom'} assert={'{"a":{"left":0, "bottom":0}, "d":{"left":60, "bottom":60}}'}>
				<Box name={'Doge'} drawBox={true} width={300} height={300} hdock={'left'}>
					<Box name={'a'} drawBox={true} left={0} bottom={0} width={50} height={50}></Box>
					<Box name={'b'} drawBox={true} left={0} bottom={60} width={50} height={50}></Box>
					<Box name={'c'} drawBox={true} left={60} bottom={0} width={50} height={50}></Box>
					<Box name={'d'} drawBox={true} left={60} bottom={60} width={50} height={50}></Box>
				</Box>
			</Lay>

			<Lay name={'dock right bottom'} assert={'{"a":{"left":300, "bottom":0}, "d":{"left":240, "bottom":60}}'}>
				<Box name={'Doge'} drawBox={true} width={300} height={300} hdock={'right'}>
					<Box name={'a'} drawBox={true} right={0} bottom={0} width={50} height={50} anchorPoint={cc.p(1, 0)}></Box>
					<Box name={'b'} drawBox={true} right={0} bottom={60} width={50} height={50} anchorPoint={cc.p(1, 0)}></Box>
					<Box name={'c'} drawBox={true} right={60} bottom={0} width={50} height={50} anchorPoint={cc.p(1, 0)}></Box>
					<Box name={'d'} drawBox={true} right={60} bottom={60} width={50} height={50} anchorPoint={cc.p(1, 0)}></Box>
				</Box>
			</Lay>
			
			<Lay name={'dock top left'} assert={'{"a":{"left":0, "bottom":300}, "d":{"left":60, "bottom":240}}'}>
				<Box name={'Doge'} drawBox={true} width={300} height={300} vdock={'top'}>
					<Box name={'a'} drawBox={true} left={0} top={0} width={50} height={50} anchorPoint={cc.p(0, 1)}></Box>
					<Box name={'b'} drawBox={true} left={0} top={60} width={50} height={50} anchorPoint={cc.p(0, 1)}></Box>
					<Box name={'c'} drawBox={true} left={60} top={0} width={50} height={50} anchorPoint={cc.p(0, 1)}></Box>
					<Box name={'d'} drawBox={true} left={60} top={60} width={50} height={50} anchorPoint={cc.p(0, 1)}></Box>
				</Box>
			</Lay>
			
			<Lay name={'dock top right'} assert={'{"a":{"left":300, "bottom":300}, "d":{"left":240, "bottom":240}}'}>
				<Box name={'Doge'} drawBox={true} width={300} height={300} hdock={'right'} vdock={'top'}>
					<Box name={'a'} drawBox={true} right={0} top={0} width={50} height={50}></Box>
					<Box name={'b'} drawBox={true} right={0} top={60} width={50} height={50}></Box>
					<Box name={'c'} drawBox={true} right={60} top={0} width={50} height={50}></Box>
					<Box name={'d'} drawBox={true} right={60} top={60} width={50} height={50}></Box>
				</Box>
			</Lay>

			<Lay name={'if no anchor point specified parent will set it depending on owns dock'} assert={'{"measure":{"left":0, "bottom":250}}'}>
				<Box name={'Doge'} drawBox={true} width={300} height={300} hdock={'left'} vdock={'top'}>
					<Box name={'docked'} width={50} height={50}>
						<Box name={'measure'} drawBox={true} width={50} height={25}></Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'if no anchor point specified parent will set it depending on owns dock'} assert={'{"measure":{"left":250, "bottom":0}}'}>
				<Box name={'Doge'} drawBox={true} width={300} height={300} hdock={'right'} vdock={'bottom'}>
					<Box name={'docked'} width={50} height={50}>
						<Box name={'measure'} drawBox={true} width={50} height={25}></Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'bottom left dock stretches only up and right'} assert={'{"Doge":{"left":100, "bottom":0, "width":157, "height":157}}'}>
				<Box name={'Doge'} drawBox={true} left={100} width={'auto'} height={'auto'} minWidth={50} minHeight={50} >
					<Box name={'a'} drawBox={true} left={-57} bottom={-57} width={100} height={100}></Box>
					<Box name={'b'} drawBox={true} left={57} bottom={57} width={100} height={100}></Box>
				</Box>
			</Lay>

			<Box name={'auto min width min height'} assert={'{"Cat": {"width":116, "height":123}}'}>
				<Box drawBox={true} name={'Cat'} width={'auto'} height={'auto'} minWidth={116} minHeight={123}></Box>
			</Box>
			
			<Box name={'dock not overwrites specified anchorpoint'} assert='{"measure": {"left":-50, "bottom":-50}}'>
				<Box drawBox={true} name={'Cat'} width={500} height={500} hdock={'right'} vdock={'top'}>
					<Box drawBox={true} name={'Mouse'} width={100} height={100} anchorPoint={cc.p(0.5, 0.5)}>
						<Box drawBox={true} name={'measure'} width={100} height={50}></Box>
					</Box>
				</Box>
			</Box>
			
			<Lay name={'flying auto'} assert='{"Auto": {"left": 250, "bottom": 250, "width":111, "height":112}}'>
				<Box drawBox={true} name={'Bus'} width={500} height={500}>
					<Box drawBox={true} name={'Auto'} height={'auto'} width={'auto'} left={'50%'} bottom={'50%'} anchorPoint={cc.p(0.5, 0.5)}>
						<Box drawBox={true} name={'Bike'} width={111} height={112}></Box>
					</Box>
				</Box>
			</Lay>

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
