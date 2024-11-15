import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import {
	context,
	images,
	matter,
	world,
} from "../globals.js";

const {
	Composite,
} = matter;

export default class GameEntity {
	/**
	 * The base class that all entities in the game should extend.
	 *
	 * @param {object} body A Matter.js body.
	 */
	constructor(body, colour) {
		this.body = body;
		this.colour = colour;
		
		this.sprites = [];
		this.currentFrame = 0;
		this.renderOffset = { x: 0, y: 0 };

		Composite.add(world, body);
	}

	update(dt) {

	}

	render(renderDebug) {
		context.save();
		context.translate(this.body.position.x, this.body.position.y);
		context.rotate(this.body.angle);
		this.sprites[this.currentFrame].render(this.renderOffset.x, this.renderOffset.y);

		context.restore();
	}
	
	/**
	 * Constructs an array of sprites given an array
	 * of measurements (x, y, width, height).
	 *
	 * @param {array} measurements
	 * @returns An array of Sprite objects.
	 */
	static generateSprites(measurements) {
		/**
		 * The map() method creates a new array populated with the results
		 * of calling a provided function on every element in the calling array.
		 *
		 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
		 */
		return measurements.map(measurement =>
			new Sprite(
				images.get(ImageName.Sprites),
				measurement.x,
				measurement.y,
				measurement.width,
				measurement.height
			)
		);
	}
}
