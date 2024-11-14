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

export default class VictoryState extends State {
	/**
	 * Displays a game over screen where the player
	 * can press enter to go back to the title screen.
	 */
	constructor() {
		super();
	}

	enter(parameters) {
		this.background = parameters.background;
		this.level = parameters.level;
	}

	update() {
		if (input.isKeyPressed(Input.KEYS.ENTER)) {
			stateMachine.change(GameStateName.Play, {
				background: this.background,
				level: LevelMaker.createLevel(this.level + 1),
			});
		}
	}

	render() {
		this.background.render();

		context.save();
		context.font = '300px AngryBirds';
		context.fillStyle = 'black';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText('Victory!', CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 90);
		context.fillStyle = 'limegreen';
		context.fillText(
			'Victory!',
			CANVAS_WIDTH / 2 + 10,
			CANVAS_HEIGHT / 2 - 80
		);
		context.font = '100px AngryBirds';
		context.fillStyle = 'white';
		context.fillText(
			'Press Enter to Continue',
			CANVAS_WIDTH / 2,
			CANVAS_HEIGHT - 80
		);
		context.restore();
	}
}
