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
		matter.World.clear(world, false);
		sounds.play(SoundName.Music);
		this.level = LevelMaker.createLevel(parameters.level, parameters.ballColor);

		// //! IF YOU NEED TO CARRY BALL WITH MOUSE
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

	exit() {
		// Remove all bodies from the Matter world
		matter.World.clear(world, false);

		// @ts-ignore
		this.level.entities = [];		
	}

	update(dt) {
		this.checkWinOrLose();
		Engine.update(engine);

		this.level?.update(dt);
	}

	render() {
		this.level?.render();
	}

	checkWinOrLose() {
		if (this.level?.didWin()) {
			sounds.play(SoundName.Victory);

			stateMachine.change(GameStateName.Victory, {
				background: this.level.background,
				level: this.level.number,
				strokes: this.level.currentStrokes
			});
		} else if (this.level?.didLose()) {
			sounds.play(SoundName.Defeat);

			stateMachine.change(GameStateName.GameOver, {
				background: this.level.background,
			});
		}
	}
}
