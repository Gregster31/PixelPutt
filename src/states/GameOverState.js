import State from '../../lib/State.js';
import Input from '../../lib/Input.js';
import GameStateName from '../enums/GameStateName.js';
import LevelMaker from '../services/LevelMaker.js';
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	input,
	stateMachine,
} from '../globals.js';

export default class GameOverState extends State {
	constructor() {
		super();
	}

	enter(parameters) {
		this.background = parameters.background;
	}

	update() {
		if (input.isKeyPressed(Input.KEYS.ENTER)) { // Added change level with E
			stateMachine.change(GameStateName.TitleScreen, {
				background: this.background,
				level: LevelMaker.createLevel(),
			});
		}
	}

	render() {
		this.background.render();

		context.save();
		context.font = '60px PixelPut';
		context.fillStyle = 'black';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Game Over', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 90);
		context.fillStyle = 'crimson';
		context.fillText(
			'Game Over',
			CANVAS_WIDTH / 2 + 10,
			CANVAS_HEIGHT / 2 - 80
		);
		context.fillText(
			'Press Enter to Menu',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 80
		);
		context.restore();
	}
}
