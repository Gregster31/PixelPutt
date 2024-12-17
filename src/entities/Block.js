import { pickRandomElement } from '../../lib/Random.js';
import Sprite from '../../lib/Sprite.js';
import BlockTypeName from '../enums/BlockTypeName.js';
import ImageName from '../enums/ImageName.js';
import SoundName from '../enums/SoundName.js';
import { context, images, matter, sounds } from '../globals.js';
import GameEntity from './GameEntity.js';
import Rectangle from './Rectangle.js';

export default class Block extends Rectangle {
	static SPRITE_MEASUREMENTS = {
		normalBlock: { x: 138, y: 66, width: 16, height: 16 },
		cloud: { x: 210, y: 191, width: 16, height: 16 },
	};

	static BLOCK_MASS = 25
	static BLOCK_SIZE = 16;

	constructor(x, y) {
		super(x, y,	Block.BLOCK_SIZE, Block.BLOCK_SIZE, "transparent", {
				label: BlockTypeName.Block,
				isStatic: false,
				frictionStatic: 1,
				friction: 1,
			}
		);

		matter.Body.setMass(this.body, Block.BLOCK_MASS);

		this.x = x;
		this.y = y
		this.sprites = Block.generateBlockSprites();

		this.renderOffset = {
			x: -(this.width / 2),
			y: -(this.height / 2),
		};	
	}

	render() {
		if (this.sprites && this.sprites.length > 0) {
			this.sprites[0].render(
				Math.floor(this.body.position.x + this.renderOffset.x),
				Math.floor(this.body.position.y + this.renderOffset.y)
			);
		}
	}

	static generateBlockSprites() {
		return [
			new Sprite(
				images.get(ImageName.Blocks),
				Block.SPRITE_MEASUREMENTS["normalBlock"].x,
				Block.SPRITE_MEASUREMENTS["normalBlock"].y,
				Block.SPRITE_MEASUREMENTS["normalBlock"].width,
				Block.SPRITE_MEASUREMENTS["normalBlock"].height
			),
		];
	}
}
