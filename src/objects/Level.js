import Background from "./Background.js";
import Ground from "../entities/Ground.js";
import {
	context,
	matter,
	world
} from "../globals.js";
import Ball from "../entities/Ball.js";
import Shot from "./Shot.js";

export default class Level {
	/**
	 * The Level contains all the pieces to play the game.
	 *
	 * @param {number} number The current level's number.
	 * @param {Ball} ball
	 */
	constructor(number, ball, maxStrokes, flag) {
		this.flag = flag;
		this.number = number;
		this.ball = ball;
		this.maxStrokes = maxStrokes
		this.currentStrokes = 0
		this.shot = new Shot(this, ball);
		this.ground = new Ground(); // the matter body with the vertices
		this.background = new Background(); // THe png at the back
	}

	update(dt) {
		this.ball.update(dt)
		this.shot.update(dt);
		this.flag.update(dt);
	}

	render() {
		this.background.render();
		this.ground.render();
		this.ball.render();
		this.shot.render();
		this.flag.render();

		//! For debugging
		this.renderStatistics()
	}

	renderStatistics() {
		context.fillStyle = 'navy';
		context.font = '30 PixelPut';
		context.fillText(`Level: ${this.number}`, 20, 40);
		context.fillText(`Strokes: ${this.currentStrokes}`, 20, 50);
	}

	didWin() {
		// Ball entered the hole
		const flagLeft = this.flag.x;
		const flagRight = this.flag.x + 41;
	
		return (
			this.ball.body.position.x >= flagLeft &&
			this.ball.body.position.x <= flagRight
		);
	}
	
	didLose() {
		// Obtain the max amount of strokes
		return this.currentStrokes > this.maxStrokes
	}
}
