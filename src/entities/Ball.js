import { context } from "../globals.js";
import Circle from "./Circle.js";
import GameEntity from "./GameEntity.js";

export default class Ball extends Circle {
	// static SPRITE_MEASUREMENTS = [{ x: 316, y: 1148, width: 47, height: 47 }]; // Small White Ball
	static SPRITE_MEASUREMENTS = [{ x: 1467, y: 1238, width: 81, height: 80 }]; // White Ball
	// static SPRITE_MEASUREMENTS = [{ x: 1467, y: 1322, width: 81, height: 80 }]; // Red Ball
	// static SPRITE_MEASUREMENTS = [{ x: 1384, y: 1342, width: 81, height: 80 }]; // Blue Ball
	// static SPRITE_MEASUREMENTS = [{ x: 1617, y: 1300, width: 81, height: 80 }]; // Green Ball
	static RADIUS = 5; // To change the golf ball size

	/**
	 * A bird that will be launched at the pig fortress. The bird is a
	 * dynamic (i.e. non-static) Matter body meaning it is affected by
	 * the world's physics. We've given the bird a high restitution value
	 * so that it is bouncy.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Body.html#property_restitution
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	constructor(x, y, color = 'white') {
		super(x, y, Ball.RADIUS, 'white', {
			label: 'ball',
			density: 0.008,
			restitution: 0.8,
			collisionFilter: {
				group: -1,
			},
		});

        // this.sprites = GameEntity.generateSprites(Ball.SPRITE_MEASUREMENTS);
		// this.renderOffset = { x: -25, y: -23 };

        this.sprites = GameEntity.generateSprites(Ball.SPRITE_MEASUREMENTS);
        this.renderOffset = { x: -Ball.SPRITE_MEASUREMENTS[0].width / 2, y: -Ball.SPRITE_MEASUREMENTS[0].height / 2 };
	}

    render() {
        context.save();
        context.translate(this.body.position.x, this.body.position.y);
        context.rotate(this.body.angle);

        const scaleFactor = (Ball.RADIUS * 2) / Ball.SPRITE_MEASUREMENTS[0].width;
        context.scale(scaleFactor, scaleFactor); 

        this.sprites[this.currentFrame].render(this.renderOffset.x, this.renderOffset.y);

        context.restore();
    }
}
