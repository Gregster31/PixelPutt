import State from '../../lib/State.js';
import Debug from '../../lib/Debug.js';
import Map from '../services/Map.js';
import Input from '../../lib/Input.js';
import {
	canvas,
	CANVAS_WIDTH,
	context,
	engine,
	input,
	matter,
	sounds,
	stateMachine,
	world,
} from '../globals.js';
import Ball from '../entities/Ball.js';
import Ground from '../entities/Ground.js'
import SoundName from '../enums/SoundName.js';
import LevelMaker from '../services/LevelMaker.js';
import GameStateName from '../enums/GameStateName.js';

const { Composite, Engine, Mouse, MouseConstraint } = matter;

export default class PlayState extends State {
	constructor() {
		super();
	}

	enter(parameters = {}) {
		sounds.play(SoundName.Music);
		this.level = LevelMaker.createLevel(parameters.level);

		// //! TO CHANGE TESTING PURPOSES
		// /**
		//  * To implement mouse interaction, Matter provides a dedicated mechanism
		//  * to apply a Constraint to the mouse location. Mouse constraints are used
		//  * for allowing user interaction, providing the ability to move bodies via
		//  * the mouse or touch.
		//  *
		//  * @see https://brm.io/matter-js/docs/classes/MouseConstraint.html
		//  */
		// Composite.add(
		// 	world,
		// 	MouseConstraint.create(engine, {
		// 		mouse: Mouse.create(canvas),
		// 	})
		// );
	}

	update(dt) {
		/**
		 * Update the Matter world one step/frame. By calling it here,
		 * we can be sure that the Matter world will be updated at the
		 * same rate as our canvas animation.
		 *
		 * @see https://brm.io/matter-js/docs/classes/Engine.html#method_update
		 */
		Engine.update(engine);

		this.level?.update(dt);
		this.checkWinOrLose();
	}

	render() {
		this.level?.render();
	}

	checkWinOrLose() {
		if (this.level?.didWin()) {
			stateMachine.change(GameStateName.Victory, {
				background: this.level.background,
				level: this.level.number,
			});
		} else if (this.level?.didLose()) {
			stateMachine.change(GameStateName.GameOver, {
				background: this.level.background,
			});
		}
	}
}
