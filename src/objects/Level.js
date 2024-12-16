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
	 * @param {number} maxStrokes Maximum allowed strokes
	 * @param {Array} entities An array of entities to be added to the level
	 */
	constructor(number, ball, maxStrokes, entities = []) {
		this.number = number;
		this.ball = ball;
		this.maxStrokes = maxStrokes;
		this.currentStrokes = 0;
		this.shot = new Shot(this, ball);
		this.ground = new Ground(number);
		this.background = new Background(number);
		this.entities = entities;
	}

	update(dt) {
		this.checkBallSpikeCollision()
		this.ball.update(dt);
		this.shot.update(dt);
		this.entities.forEach(entity => entity.update(dt));
	}

	render() {
		this.background.render();
		this.ground.render();
		this.ball.render();
		this.shot.render();
		this.entities.forEach(entity => entity.render());

		this.renderStatistics(); // Render debugging statistics
	}

	renderStatistics() {
		context.fillStyle = 'navy';
		context.font = '30 PixelPut';
		context.fillText(`Level: ${this.number}`, 20, 40);
		context.fillText(`Strokes: ${this.currentStrokes}`, 20, 50);
	}

	didWin() {
		const flag = this.entities.find(entity => entity.constructor.name === "Flag");	
		const flagLeft = flag.x;
		const flagRight = flag.x + 20;
		const flagTop = flag.y;
		const flagBottom = flag.y - 20;
	
		    // Set outline style
			context.strokeStyle = "blue";
			context.lineWidth = 2;
		
			// Draw the rectangle outline
			context.strokeRect(flagLeft, flagTop, flagRight - flagLeft, flagBottom - flagTop);
		// Check if the ball is within the flag's bounds
		return (
			this.ball.body.position.x >= flagLeft &&
			this.ball.body.position.x <= flagRight &&
			this.ball.body.position.y <= flagTop &&
			this.ball.body.position.y >= flagBottom
		);
	}

	didLose() {
		// Check if the player has exceeded the maximum allowed strokes
		return this.currentStrokes > this.maxStrokes;
	}

	checkBallSpikeCollision() {
		this.entities.forEach(entity => {
			if (entity.constructor.name === "Spike") {
				// Check for collision using Matter.js's Collision module
				const collision = matter.SAT.collides(this.ball.body, entity.body);
				if (collision) {
					// console.log("collision")
					this.onBallSpikeCollision();
				}
			}
		});
	}
	
	/**
	 * Handles what happens when the ball collides with a spike.
	 */
	onBallSpikeCollision() {
		// Resets the ball position to the beginning
		matter.Body.setPosition(this.ball.body, { x: 100 - Ball.RADIUS, y: 50 });
		matter.Body.setVelocity(this.ball.body, { x: 0, y: 0 });
	}
	
}
