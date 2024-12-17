import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	sounds,
	stateMachine,
	timer,
} from '../globals.js';
import State from '../../lib/State.js';
import Easing from '../../lib/Easing.js';
import SoundName from '../enums/SoundName.js';
import GameStateName from '../enums/GameStateName.js';


/**
 * Represents the state the game is in right before we start playing.
 * It will fade in, display a drop-down "Level X" message, then transition
 * to the PlayState, where the player can start playing the game.
 */
export default class LevelTransitionState extends State {
	constructor() {
		super();
		// Start the transition alpha at full so we fade in.
		this.transitionAlpha = 1;

		this.levelLabelHeight = 75;

		// Start the level label off-screen.
		this.levelLabelY = -this.levelLabelHeight;

		this.levelLableTextX = 0;
	}

	async enter(parameters) {
		this.transitionAlpha = 1;
		this.scene = parameters.scene;
		this.level = parameters.level;
		this.levelLabelY = -this.levelLabelHeight;
		this.levelLableTextX = 0;

		// sounds.play(SoundName.Music3);

		/**
		 * Animate the white screen fade-in, then animate a drop-down with the level text.
		 */

		// First, over a period of 1 second, transition the alpha to 0.
		await timer.tweenAsync(this, { transitionAlpha: 0 }, 1);

		// Once that's finished, start a transition of the text label to the center of the screen over 0.25 seconds.
		timer.tweenAsync(
			this,
			{ levelLabelY: CANVAS_HEIGHT / 2 - this.levelLabelHeight / 2 },
			0.5,
			Easing.easeOutQuad
		);
		await timer.tweenAsync(
			this,
			{ levelLableTextX: CANVAS_WIDTH / 2 + 5 },
			0.5,
			Easing.easeOutQuad
		);

		// After that, pause for a beat to let the player read the text.
		await timer.wait(1.25);

		// Then, animate the label going down past the bottom edge.
		timer.tweenAsync(
			this,
			{ levelLabelY: CANVAS_HEIGHT + this.levelLabelHeight },
			0.5,
			Easing.easeInQuad
		);
		await timer.tweenAsync(
			this,
			{ levelLableTextX: CANVAS_WIDTH },
			0.5,
			Easing.easeInQuad
		);

		// Once that's complete, we're ready to play!
		stateMachine.change(GameStateName.Play, {
		});
	}

	update(dt) {
		this.scene.update(dt);
		timer.update(dt);
	}

	render() {
		this.scene.render();
		this.renderLevelLabel();
		this.renderTransitionForeground();
	}

	renderLevelLabel() {
		context.save();
		context.fillStyle = 'rgb(95, 205, 228, 0.8)';
		context.fillRect(
			0,
			this.levelLabelY,
			CANVAS_WIDTH,
			this.levelLabelHeight
		);
		context.fillStyle = 'rgb(255, 255, 255, 1)';
		context.font = '30px Retro';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.fillText(
			`Level ${this.level}`,
			this.levelLableTextX,
			this.levelLabelY + this.levelLabelHeight / 2 + 5
		);
	}

	renderTransitionForeground() {
		context.fillStyle = `rgb(255, 255, 255, ${this.transitionAlpha})`;
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
		context.restore();
	}
}
