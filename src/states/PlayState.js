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
		// Accumulator for fixed timestep physics
		this.physicsAccumulator = 0;
		this.fixedTimeStep = 1 / 60; // 60 fps in seconds
	}

	enter(parameters = {}) {
		matter.World.clear(world, false);
		sounds.play(SoundName.Music);
		this.level = LevelMaker.createLevel(parameters.level, parameters.ballColor);
		this.physicsAccumulator = 0; // Reset accumulator when entering state
	}

	exit() {
		// Remove all bodies from the Matter world
		matter.World.clear(world, false);

		this.level.entities = [];		
	}

	update(dt) {
		this.checkWinOrLose();
		
		// Accumulate time
		this.physicsAccumulator += dt;
		
		// Update physics in fixed timesteps
		while (this.physicsAccumulator >= this.fixedTimeStep) {
			Engine.update(engine, this.fixedTimeStep * 1000);
			this.physicsAccumulator -= this.fixedTimeStep;
		}

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