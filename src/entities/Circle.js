import GameEntity from "./GameEntity.js";
import {
	CANVAS_WIDTH,
	context,
	matter
} from "../globals.js";

export default class Circle extends GameEntity {
	static ANGULAR_SPEED_MINIMUM = 0.00001;
	static SPEED_MINIMUM = 0.3;
	
	/**
	 * A GameEntity that has a Matter circle as its body.
	 * Both Canvas and Matter use the center of their circles
	 * for the origin so we don't have to worry about offsetting.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Bodies.html#method_circle
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {number} radius
	 * @param {object} options
	 */
	constructor(x, y, radius, colour, options) {
		super(matter.Bodies.circle(x, y, radius, options), colour);

		this.radius = radius;
	}

	update(dt) {
		super.update(dt);
	}

	render() {
		super.render()
	}

	didStop() {
		return this.body.angularSpeed < Circle.ANGULAR_SPEED_MINIMUM && this.body.speed < Circle.SPEED_MINIMUM;
	}
}
