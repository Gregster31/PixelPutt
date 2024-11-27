import Ground from "../entities/Ground.js";
import Level from "../objects/Level.js";
import { CANVAS_HEIGHT } from "../globals.js";
import Ball from "../entities/Ball.js";

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
		return new Level(1, new Ball(100 - Ball.RADIUS, 200, 'white'));
	}

	static levelTwo() {
		return new Level(2, new Ball(100 - Ball.RADIUS, 200, 'red'));
	}

	static levelThree() {
		//! Add obstacles similar to blocks in angry birds
		// const blocks = [
		// 	new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height, Size.Medium),
		// 	new GlassBlock(LevelMaker.START_X + GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.GRASS.height - GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].height, Size.Medium),
		// 	// new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height, Size.Medium),
		// 	new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height * 2, Size.Large, Block.ANGLE_HORIZONTAL),
		// 	new GlassBlock(LevelMaker.START_X + GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.GRASS.height - GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].height * 2, Size.Medium),
		// 	// new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 0.25, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height * 2, Size.Medium),
		// 	new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 4.75, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height * 2, Size.Medium),
		// 	new GlassBlock(LevelMaker.START_X + GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.GRASS.height - GlassBlock.SPRITE_MEASUREMENTS[Size.Medium].height * 3, Size.Large, GlassBlock.ANGLE_HORIZONTAL),
		// 	// new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 2.5, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height * 3, Size.Large, Block.ANGLE_HORIZONTAL),
		// 	new Block(LevelMaker.START_X - 100, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height, Size.Large, Block.ANGLE_RIGHT_DIAGONAL),
		// 	new Block(LevelMaker.START_X + Block.SPRITE_MEASUREMENTS[Size.Medium].width * 8, CANVAS_HEIGHT - Ground.GRASS.height - Block.SPRITE_MEASUREMENTS[Size.Medium].height, Size.Large, Block.ANGLE_LEFT_DIAGONAL),
		// ];

		return new Level(2, new Ball(100 - Ball.RADIUS, 200, 'blue'));

		// return new Level(3, new Fortress(blocks, ball)); //! example of what i want to do when passing blocks
	}
}
