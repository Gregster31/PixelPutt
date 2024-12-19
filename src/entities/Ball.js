import { getRandomNegativeNumber, getRandomPositiveInteger, getRandomPositiveNumber } from "../../lib/Random.js";
import { context, matter } from "../globals.js";
import Circle from "./Circle.js";
import GameEntity from "./GameEntity.js";

export default class Ball extends Circle {
    static SPRITE_MEASUREMENTS = {
        0: { x: 316, y: 1148, width: 47, height: 47 }, //small white
        1: { x: 1467, y: 1238, width: 81, height: 80 }, //white
        2: { x: 1467, y: 1322, width: 81, height: 80 }, //red
        3: { x: 1384, y: 1342, width: 81, height: 80 }, //blue
        4: { x: 1617, y: 1300, width: 81, height: 80 } //green
    };
	static MAX_X_FORCE = 0.2;
	static MIN_X_FORCE = 0.1;
	static MIN_Y_FORCE = -0.07;
	static MAX_Y_FORCE = -0.2;

	static RADIUS = 5; // To change the golf ball size

	constructor(x, y, color = 1, parameters = {}) {
		super(x, y, Ball.RADIUS, color, {
			label: 'ball',
			density: 0.1,
			restitution: 0.8,
			collisionFilter: {
				group: -1,
			},
		});

		this.initialSpawn = {x, y}
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
			x: getRandomPositiveNumber(Ball.MIN_X_FORCE, Ball.MAX_X_FORCE),
			y: getRandomNegativeNumber(Ball.MIN_Y_FORCE, Ball.MAX_Y_FORCE),
		});    
    }

	isOutOfCanvas() {
		const { x, y } = this.body.position;
	
		return (
			x + Ball.RADIUS < 0 ||
			x - Ball.RADIUS > context.canvas.width ||
			y + Ball.RADIUS < 0 ||
			y - Ball.RADIUS > context.canvas.height 
		);
	}
	
}
