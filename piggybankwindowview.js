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
		const height = 800;
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

			<Lay bottom={500} name={'auto block'} assert={'{"Doge":{"left":0, "bottom":0, "width":191, "height":331}}'}>
				<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'}>
					<Box name={'Cat'} drawBox={true} width={191} height={331}></Box>
				</Box>
			</Lay>
			
			<Lay name={'auto block min size'} assert={'{"Doge":{"left":0, "bottom":0, "width":200, "height":200}}'}>
				<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={200} minHeight={200}>
				</Box>
			</Lay>
			
			<Container bottom={400} name={'auto block stretches vertically'}>

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

				<Lay left={360} bottom={100} assert={'{"Doge":{"left":0, "bottom":150, "width":50, "height":175}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
						<Box name={'Cat'} drawBox={true} width={50} height={25} bottom={150}></Box>
					</Box>
				</Lay>

				<Lay left={420} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":50, "height":175}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
						<Box name={'Mouse'} drawBox={true} width={50} height={25} top={150}></Box>
					</Box>
				</Lay>

				<Lay left={480} bottom={100} assert={'{"Doge":{"left":0, "bottom":150, "width":50, "height":325}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25}>
						<Box name={'Cat'} drawBox={true} width={50} height={25} bottom={150}></Box>
						<Box name={'Mouse'} drawBox={true} width={50} height={25} top={150}></Box>
					</Box>
				</Lay>

			</Container>

			<Container bottom={400} name={'auto block stretches vertically even if opposite anchorPoints set'}>

				<Lay left={60} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
					</Box>
				</Lay>

				<Lay left={120} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={180} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={240} bottom={100} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={300} bottom={100}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
					</Box>
				</Lay>

				<Lay left={360} bottom={100} assert={'{"Doge":{"left":25, "bottom":0, "width":50, "height":175}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={420} bottom={100} assert={'{"Doge":{"left":25, "bottom":-150, "width":50, "height":175}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

				<Lay left={480} bottom={100} assert={'{"Doge":{"left":25, "bottom":-150, "width":50, "height":325}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} origin={cc.p(0, 0)} anchorPoint={cc.p(1, 0)} >
						<Box name={'Cat'} drawBox={true} left={50} width={50} height={25} bottom={150} anchorPoint={cc.p(1, 0)}></Box>
						<Box name={'Mouse'} drawBox={true} left={50} width={50} height={25} top={150} anchorPoint={cc.p(1, 0)}></Box>
					</Box>
				</Lay>

			</Container>

			<Container bottom={400} name={'auto block stretches horizontally even if anchorPoints centered'}>

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

				<Lay left={200} top={0} assert={'{"Doge":{"left":68, "bottom":12, "width":162, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={60} assert={'{"Doge":{"left":-82, "bottom":12, "width":187, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={120} assert={'{"Doge":{"left":-13, "bottom":12, "width":325, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse1'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

			</Container>

			<Container bottom={400} name={'auto block stretches and accounts for scale'}>

				<Lay left={200} top={-300} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-200} assert={'{"Doge":{"left":-13, "bottom":12, "width":325, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-100} assert={'{"Doge":{"left":-11, "bottom":6, "width":308, "height":37}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} scale={0.5} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} scale={0.2} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={0} assert={'{"Doge":{"left":-16, "bottom":12, "width":343, "height":100}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)}>
						<Box name={'Cat'} scale={1.5} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} scale={2} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

			</Container>

			<Container name={'auto block stretches and accounts for scale'}>

				<Lay left={200} top={-300} assert={'{"Doge":{"left":0, "bottom":0, "width":25, "height":25}}'}>
					<Box name={'Doge'} drawBox={true} width={25} height={25} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-200} assert={'{"Doge":{"left":-13, "bottom":-13, "width":325, "height":50}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={-100} assert={'{"Doge":{"left":-11, "bottom":-7, "width":308, "height":37}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)} >
						<Box name={'Cat'} scale={0.5} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} scale={0.2} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

				<Lay left={200} top={0} assert={'{"Doge":{"left":-16, "bottom":-13, "width":343, "height":100}}'}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)}>
						<Box name={'Cat'} scale={1.5} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} scale={2} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

			</Container>
			
			<Container name={'auto block. experiments with a rotations'}>

				<Lay left={200} top={-200}>
					<Box name={'Doge'} drawBox={true} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)}>
						<Box name={'Cat'} rotation={70} drawBox={true} width={25} height={100} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
						<Box name={'Mouse'} drawBox={true} width={25} height={100} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					</Box>
				</Lay>

			</Container>

			<Lay name={'auto block with padding'} left={300} top={200} assert={'{"Doge":{"left":-13, "bottom":12, "width":375, "height":100}, "Mouse":{"left":-163}}'}>
				<Box name={'Doge'} drawBox={true} padding={25} width={'auto'} height={'auto'} minWidth={25} minHeight={25} anchorPoint={cc.p(0.5, 0.5)}>
					<Box name={'Cat'} drawBox={true} width={25} height={50} left={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
					<Box name={'Mouse'} drawBox={true} width={25} height={50} right={150} anchorPoint={cc.p(0.5, 0.5)}></Box>
				</Box>
			</Lay>

			<Lay name={'dependent block'}>
				<Box name={'Doge'} drawBox={true} width={500} height={500} assert={'{"Eagle":{"left":50, "bottom":449}, "Sparrow":{"left":448, "bottom":53}}'}>
					<Box name={'Eagle'} drawBox={true} width={100} height={100} left={'50'} top={'51'} anchorPoint={cc.p(0, 1)}></Box>
					<Box name={'Sparrow'} drawBox={true} width={50} height={50} right={'52'} bottom={'53'} anchorPoint={cc.p(1, 0)}></Box>
				</Box>
			</Lay>

			<Lay name={'dependent position zero must work correctly'}>
				<Box top={150} drawBox={true}  width={100} height={100} left={100} name={'Doge'} drawBox={true} assert={'{"corner":{"left":0, "bottom":100}}'}>
					<Box name={'corner'} drawBox={true} width={50} height={50} left={'0'} top={"0%"} anchorPoint={cc.p(0, 1)}>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of statics'}>
				<Box top={150} left={100} name={'Doge'} drawBox={true} assert={'{"a":{"left":0, "bottom":0}, "b":{"left":0, "bottom":10}, "c":{"left":110, "bottom":10}, "d":{"left":110, "bottom":-100}}'}>
					<Box name={'a'} drawBox={true} width={100} height={100}>
						<Box name={'b'} drawBox={true} width={100} height={100} bottom={110} anchorPoint={cc.p(0, 0)}>
							<Box name={'c'} drawBox={true} width={100} height={100} left={110} anchorPoint={cc.p(0, 0)}>
								<Box name={'d'} drawBox={true} width={100} height={100} top={110} anchorPoint={cc.p(0, 0)}>
								</Box>
							</Box>
						</Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of autos'} assert={'{"Doge":{"width":180, "height":180}}'}>
				<Box top={150} left={100} name={'Doge'} width={'auto'} height={'auto'} padding={20} drawBox={true}>
					<Box name={'a'} width={'auto'} height={'auto'} padding={20} drawBox={true}>
						<Box name={'d'} drawBox={true} width={100} height={100}>
						</Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of dependents'} assert={'{"a":{"left":100, "bottom":-140}, "b":{"left":210, "bottom":-40}, "c":{"left":210, "bottom":-150}}'}>
				<Box top={150} left={100} name={'Doge'} width={100} height={100} drawBox={true}>
					<Box name={'a'} drawBox={true} width={100} height={100} top={'-10'} anchorPoint={cc.p(0, 0)}>
						<Box name={'b'} drawBox={true} width={100} height={100} right={'-10'}>
							<Box name={'c'} drawBox={true} width={100} height={100} bottom={'-10'}>
							</Box>
						</Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'matryoshka of dependents'} assert={'{"a":{"left":100, "bottom":-140}, "b":{"left":210, "bottom":-40}, "c":{"left":210, "bottom":-150}}'}>
				<Box top={150} left={100} name={'Doge'} width={100} height={100} drawBox={true}>
					<Box name={'a'} drawBox={true} width={100} height={100} top={'-10'} anchorPoint={cc.p(0, 0)}>
						<Box name={'b'} drawBox={true} width={100} height={100} right={'-10'}>
							<Box name={'c'} drawBox={true} width={100} height={100} bottom={'-10'}>
							</Box>
						</Box>
					</Box>
				</Box>
			</Lay>

			<Lay name={'origin center'} assert={'{"Cat":{"left":250, "bottom":-250}}'}>
				<Box name={'Doge'} width={500} height={500} drawBox={true} origin={cc.p(0.5, 0.5)}>
					<Box name={"Cat"} width={250} height={250} anchorPoint={cc.p(0.5, 0.5)} drawBox={true}></Box>
				</Box>
			</Lay>

			<Lay name={'origin center doesnt mess up dependent child size'} assert={'{"Cat":{"left":250, "bottom":-250}}'}>
				<Box name={'Doge'} width={500} height={500} drawBox={true} origin={cc.p(0.5, 0.5)}>
					<Box name={"Cat"} width={'50%'} height={'50%'} left={0} top={0} anchorPoint={cc.p(0.5, 0.5)} drawBox={true}></Box>
				</Box>
			</Lay>

			<Lay name={'origin center doesnt mess up dependent child position'} assert={'{"Cat":{"width":250, "height":250, "left":125, "bottom":-125}}'}>
				<Box name={'Doge'} width={500} height={500} drawBox={true} origin={cc.p(0.5, 0.5)}>
					<Box name={"Cat"} width={'50%'} height={'50%'} left={'25%'} top={'25%'} anchorPoint={cc.p(0, 1)} drawBox={true}></Box>
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
