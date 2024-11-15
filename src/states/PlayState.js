import State from '../../lib/State.js';
import Debug from '../../lib/Debug.js';
import Map from '../services/Map.js';
import Input from '../../lib/Input.js';
import {
	canvas,
	CANVAS_WIDTH,
	context,
	engine,
	input,
	matter,
	world,
} from '../globals.js';
import Ball from '../entities/Ball.js';
import Ground from '../entities/Ground.js'

const { Composite, Engine, Mouse, MouseConstraint } = matter;

export default class PlayState extends State {
	constructor(mapDefinition) {
		super();

		this.map = new Map(mapDefinition);

		// Create Debug instance
		this.debug = new Debug();

		// Watch player properties
		this.debug.watch('Map', {
			width: () => this.map.width,
			height: () => this.map.height,
		});

		this.ball = null;
		this.ground = new Ground();
	}

	enter() {
		this.ball = new Ball(100 - Ball.RADIUS, 200); //new Ball(CANVAS_WIDTH / 2 - Ball.RADIUS, 0, 'red') IF YOU WANT TO CHANGE BALL COLOR
		this.ground = new Ground();

		/**
		 * To implement mouse interaction, Matter provides a dedicated mechanism
		 * to apply a Constraint to the mouse location. Mouse constraints are used
		 * for allowing user interaction, providing the ability to move bodies via
		 * the mouse or touch.
		 *
		 * @see https://brm.io/matter-js/docs/classes/MouseConstraint.html
		 */
		Composite.add(
			world,
			MouseConstraint.create(engine, {
				mouse: Mouse.create(canvas),
			})
		);
	}

	update(dt) {
		/**
		 * Update the Matter world one step/frame. By calling it here,
		 * we can be sure that the Matter world will be updated at the
		 * same rate as our canvas animation.
		 *
		 * @see https://brm.io/matter-js/docs/classes/Engine.html#method_update
		 */
		Engine.update(engine);

		if (input.isKeyPressed(Input.KEYS.SPACE)) {
			this.ball?.golfIt();
		}

		this.ball?.update();
		this.debug.update();
	}

	render() {
		this.ball?.render();
		this.map.render();
		this.ground.render();
	}
}
