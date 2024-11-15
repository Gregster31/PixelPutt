import Rectangle from "./Rectangle.js";
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
} from "../globals.js";

export default class Ground extends Rectangle {
	static MEASUREMENTS = {
		x: -CANVAS_WIDTH / 2,
		y: CANVAS_HEIGHT - 32,
		width: CANVAS_WIDTH * 2,
		height: 20
	};

	/**
	 * The ground is a large Matter static body
	 * where everything in the world sits upon.
	 */
	constructor() {
		super(
			Ground.MEASUREMENTS.x,
			Ground.MEASUREMENTS.y,
			Ground.MEASUREMENTS.width,
			Ground.MEASUREMENTS.height,
			'transparent',
			{
				isStatic: true
			}
		);
	}
}
