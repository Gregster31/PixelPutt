import Ground from "../entities/Ground.js";
import Level from "../objects/Level.js";
import { CANVAS_HEIGHT } from "../globals.js";
import Ball from "../entities/Ball.js";
import Flag from "../objects/Flag.js";
import Block from "../entities/Block.js";

/**
 * Encapsulates all logic to create a level
 * that contains pigs, blocks, and birds.
 */
export default class LevelMaker {
	static START_X = 1500;

	static createLevel(level = 1) {
		switch (level) {
			case 1:
				return LevelMaker.levelOne();
			case 2:
				return LevelMaker.levelTwo();
			default:
				return LevelMaker.levelThree();
		}
	}

	static levelOne() {
		const entities = [
			new Block(200, 293),
			new Block(250, 293),
			new Flag(580, 293)
		]
		return new Level(1, new Ball(100 - Ball.RADIUS, 200, 'white'), 3, entities); //! To change number of strokes
	}

	static levelTwo() {
		const entities = [
			new Block(200, 293),
			new Block(250, 293),
			new Flag(580, 293)
		]

		return new Level(2, new Ball(100 - Ball.RADIUS, 200, 'red'), 10, entities);
	}

	static levelThree() {
		const entities = [
			new Block(200, 293),
			new Block(250, 293),
			new Flag(580, 293)
		]
		
		return new Level(3, new Ball(100 - Ball.RADIUS, 200, 'blue'), 10, entities);

		// return new Level(3, new Fortress(blocks, ball)); //! example of what i want to do when passing blocks
	}
}
