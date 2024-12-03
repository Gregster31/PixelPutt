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
	constructor(number, ball) {
		this.number = number;
		this.ball = ball;
		this.shot = new Shot(ball);
		this.ground = new Ground(); // the matter body with the vertices
		this.background = new Background(); // THe png at the back
	}

	update(dt) {
		this.ball.update(dt)
		this.shot.update(dt);
	}

	render() {
		this.background.render();
		this.ground.render();
		this.ball.render();
		this.shot.render();
	}

	renderStatistics() {
		context.fillStyle = 'navy';
		context.font = '60px PixelPut';
		context.fillText(`Level: ${this.number}`, 50, 100);
	}

	didWin() {
		// Ball entered the hole
	}

	didLose() {
		// Obtain the max amount of strokes
	}
}
