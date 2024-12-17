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
		if(this.number == 2) {
			this.checkSandTile()
		} else if(this.number == 3) {
			this.unlock()
		}
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

		if(this.number != 0) this.renderStatistics();
	}

	renderStatistics() {	
		context.fillStyle = 'black'; 
		context.font = '15px Retro';
		context.textAlign = 'left'; 
		context.textBaseline = 'top'; 
	
		context.fillText(`Level: ${this.number}`, 20, 20);
		context.fillText(`Strokes: ${this.currentStrokes}`, 20, 45);
		context.fillText(`Par: ${this.maxStrokes}`, 20, 70);
	
		context.shadowColor = 'transparent';
	}
	

	didWin() {
		const flags = this.entities.filter(entity => entity.constructor.name === "Flag");
		
		if (flags.length === 0) return false;
	
		// Check if the ball is within the bounds of any flag
		return flags.some(flag => {
			let flagRight = 0
			let flagLeft = 0
			let flagTop = 0
			let flagBottom = 0

			if(flag.secret) {
				flagRight = flag.x - 10;
				flagLeft = flag.x - 25;
				flagTop = flag.y - 20;
				flagBottom = flag.y - 40;

			} else {
				flagRight = flag.x - 10;
				flagLeft = flag.x - 20;
				flagTop = flag.y;
				flagBottom = flag.y - 15;
			}
	
			return (
				this.ball.body.position.x >= flagLeft &&
				this.ball.body.position.x <= flagRight &&
				this.ball.body.position.y <= flagTop &&
				this.ball.body.position.y >= flagBottom
			);
		});
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

	unlock() {
		this.entities.forEach(entity => {
			if (entity.constructor.name === "KeyBlock") {
				// Check for collision using Matter.js's Collision module
				const collision = matter.SAT.collides(this.ball.body, entity.body);
				if (collision) {
					// console.log("collision")
					this.onBallUnlockBlockCollision();
				}
			}
		});
	}

	onBallUnlockBlockCollision() {
		matter.Composite.allBodies(world).forEach(body => {
			if (body.label === 'ground') {
				matter.World.remove(world, body);
			}
		});
	
		this.ground = new Ground(4);
		this.background = new Background(4);
	}
	
	

	checkSandTile() {
		const sandLeft = 110; 
		const sandRight = 490; 
		const sandTop = 130;  
		const sandBottom = 300; 
	
		const ballX = this.ball.body.position.x;
		const ballY = this.ball.body.position.y;
	
		if (
			ballX >= sandLeft &&
			ballX <= sandRight &&
			ballY >= sandTop &&
			ballY <= sandBottom
		) {
			this.ball.body.restitution = 0.1;
			this.ball.body.friction = 1;
		} else {
			this.ball.body.restitution = 0.8;
			this.ball.body.friction = 0.5;
		}
	}
	
	
	/**
	 * Handles what happens when the ball collides with a spike.
	 */
	onBallSpikeCollision() {
		// Resets the ball position to the beginning
		matter.Body.setPosition(this.ball.body, this.ball.initialSpawn);
		matter.Body.setVelocity(this.ball.body, { x: 0, y: 0 });
	}
	
}
