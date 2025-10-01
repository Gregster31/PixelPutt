import State from '../../lib/State.js';
import Debug from '../../lib/Debug.js';
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
	}

	exit() {
		// Remove all bodies from the Matter world
		matter.World.clear(world, false);

		this.level.entities = [];		
	}

	update(dt) {
		this.checkWinOrLose();
		
		// Fixed timestep for Matter.js - use delta time in milliseconds
		// This ensures consistent physics regardless of frame rate
		Engine.update(engine, dt * 1000);

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