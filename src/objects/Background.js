import Sprite from '../../lib/Sprite.js';
import ImageName from '../enums/ImageName.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from '../globals.js';
import { pickRandomElement } from '../../lib/Random.js';

export default class Background {
	static WIDTH = 640;
	static HEIGHT = 320;

	/**
	 * Randomly generates a background from 2 sprites
	 * dynamically based on the width of the canvas.
	 */
	constructor() {
		this.sprites = Background.generateSprites();
		this.images = [];
		this.images.push(this.sprites[0]);
	}

	render() {
		this.images.forEach((image, index) => {
			image.render(
				index * Background.WIDTH,
				CANVAS_HEIGHT - Background.HEIGHT
			);
		});
	}

	static generateSprites() {
		return [
			new Sprite(
				images.get(ImageName.Background),
				0,
				0,
				Background.WIDTH,
				Background.HEIGHT
			),
		];
	}
}
