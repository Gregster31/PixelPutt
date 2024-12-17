import Ground from "../entities/Ground.js";
import Level from "../objects/Level.js";
import { CANVAS_HEIGHT } from "../globals.js";
import Ball from "../entities/Ball.js";
import Flag from "../objects/Flag.js";
import Block from "../entities/Block.js";
import Spike from "../entities/Spike.js";
import KeyBlock from "../entities/KeyBlock.js";
import MovingSpike from "../entities/MovingSpike.js";

/**
 * Encapsulates all logic to create a level
 * that contains pigs, blocks, and birds.
 */
export default class LevelMaker {
	static START_X = 1500;

	static createLevel(level = 0, ballColor = 1) {
		switch (level) {
			case 0:
				return LevelMaker.LevelMenu(ballColor);
			case 1:
				return LevelMaker.levelOne(ballColor);
			case 2:
				return LevelMaker.levelTwo(ballColor);
			case 3:
				return LevelMaker.levelThree(ballColor);
			default:
				return LevelMaker.levelOne(ballColor);
		}
	}

	static LevelMenu(ballColor) {
		const entities = [
			new Flag(580, 358),
		]
		return new Level(0, new Ball(100 - Ball.RADIUS, 200, ballColor), 30, entities);
	}

	static levelOne(ballColor) {
		const entities = [
			new Block(198, 120),
			new Block(215, 120),
			new Block(205, 104),

			// Tunnel Spikes
			new Spike(346, 297),
			new Spike(330, 297),
			new Spike(314, 297),
			new Spike(346, 215, 'down'),
			new Spike(330, 215, 'down'),
			new Spike(314, 215, 'down'),

			//Wall Spikes
			new Spike(616, 215, 'left'),
			new Spike(616, 232, 'left'),
			new Spike(616, 248, 'left'),
			
			//za killer spikes
			new Spike(435, 169),
			new Spike(24,343, 'right'),

			new Flag(100, 357)
		]
		return new Level(1, new Ball(100 - Ball.RADIUS, 130, ballColor), 10, entities);
	}

	static levelTwo(ballColor) {
		const entities = [
			new Flag(585, 101),
			new Flag(505, 368, true), // Secret flag

			// tower 0
			new Spike(167, 329),
			new Spike(183, 329),

			// tower 1
			new Spike(264, 265),
			new Spike(280, 265),
			new Spike(296, 265),

			//Tower 2
			new Spike(360, 249),
			new Spike(376, 249),
			new Spike(392, 249),

			//Tower 3
			new Spike(457, 217),
			new Spike(473, 217),
			new Spike(489, 217),
		]

		return new Level(2, new Ball(80 - Ball.RADIUS, 250, ballColor), 10, entities);
	}

	static levelThree(ballColor) {
		const entities = [
			new KeyBlock(580, 160),
			new MovingSpike(330, 329, "up", "transparent", { isStatic: false }),
			new Flag(130, 342)
		]
		
		return new Level(3, new Ball(590 - Ball.RADIUS, 260, ballColor), 10, entities);
	}
}
