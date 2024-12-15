import Ground from "../entities/Ground.js";
import Level from "../objects/Level.js";
import { CANVAS_HEIGHT } from "../globals.js";
import Ball from "../entities/Ball.js";
import Flag from "../objects/Flag.js";
import Block from "../entities/Block.js";
import Spike from "../entities/Spike.js";

/**
 * Encapsulates all logic to create a level
 * that contains pigs, blocks, and birds.
 */
export default class LevelMaker {
	static START_X = 1500;

	static createLevel(level = 0) {
		switch (level) {
			case 0:
				return LevelMaker.LevelMenu();
			case 1:
				return LevelMaker.levelOne();
			case 2:
				return LevelMaker.levelTwo();
			case 3:
				return LevelMaker.levelThree();
			default:
				return LevelMaker.levelOne();
		}
	}

	static LevelMenu() {
		const entities = [
			new Flag(580, 358),
		]
		return new Level(0, new Ball(100 - Ball.RADIUS, 200, 1), 30, entities);
	}

	static levelOne() {
		const entities = [
			new Block(200, 120),
			// new Block(250, 293),
			new Spike(350, 297),
			new Flag(100, 357)
		]
		return new Level(1, new Ball(100 - Ball.RADIUS, 50, 1), 10, entities); //! To change number of strokes
	}

	static levelTwo() {
		const entities = [
			new Block(200, 293),
			new Block(250, 293),
			new Flag(580, 293)
		]

		return new Level(2, new Ball(100 - Ball.RADIUS, 200, 1), 10, entities);
	}

	static levelThree() {
		const entities = [
			new Block(200, 293),
			new Block(250, 293),
			new Flag(580, 293)
		]
		
		return new Level(3, new Ball(100 - Ball.RADIUS, 200, 1), 10, entities);

		// return new Level(3, new Fortress(blocks, ball)); //! example of what i want to do when passing blocks
	}
}
