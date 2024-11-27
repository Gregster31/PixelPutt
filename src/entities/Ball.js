import { context, matter } from "../globals.js";
import Circle from "./Circle.js";
import GameEntity from "./GameEntity.js";

export default class Ball extends Circle {
    static SPRITE_MEASUREMENTS = {
        smallWhite: { x: 316, y: 1148, width: 47, height: 47 },
        white: { x: 1467, y: 1238, width: 81, height: 80 },
        red: { x: 1467, y: 1322, width: 81, height: 80 },
        blue: { x: 1384, y: 1342, width: 81, height: 80 },
        green: { x: 1617, y: 1300, width: 81, height: 80 }
    };

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
		super(x, y, Ball.RADIUS, color, {
			label: 'ball',
			density: 0.1,
			restitution: 0.8,
			collisionFilter: {
				group: -1,
			},
		});

        this.currentColorBallSprite = Ball.SPRITE_MEASUREMENTS[color];
        this.sprites = GameEntity.generateSprites([this.currentColorBallSprite]);
        this.renderOffset = { x: -this.currentColorBallSprite.width / 2, y: -this.currentColorBallSprite.height / 2 };
	}

    render() {
        context.save();
        context.translate(this.body.position.x, this.body.position.y);
        context.rotate(this.body.angle);

        const scaleFactor = (Ball.RADIUS * 2) / this.currentColorBallSprite.width;
        context.scale(scaleFactor, scaleFactor); 

        this.sprites[this.currentFrame].render(this.renderOffset.x, this.renderOffset.y);

        context.restore();
    }

    golfIt() {
		matter.Body.applyForce(this.body, this.body.position, {
			x: 0.2,
			y: -0.2,
		});    
    }
}
