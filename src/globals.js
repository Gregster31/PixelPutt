import Fonts from '../lib/Fonts.js';
import Images from '../lib/Images.js';
import Input from '../lib/Input.js';
import Sounds from '../lib/Sounds.js';
import StateMachine from '../lib/StateMachine.js';
import Timer from '../lib/Timer.js';

export const canvas = document.createElement('canvas');
export const context =
	canvas.getContext('2d') || new CanvasRenderingContext2D();
const assetDefinition = await fetch('./config/assets.json').then((response) =>
	response.json()
);

// Replace these values according to how big you want your canvas.
export const TILE_SIZE = 16;
export const CANVAS_WIDTH = TILE_SIZE * 40;
export const CANVAS_HEIGHT = TILE_SIZE * 20;

const resizeCanvas = () => {
	const scaleX = window.innerWidth / CANVAS_WIDTH;
	const scaleY = window.innerHeight / CANVAS_HEIGHT;
	const scale = Math.min(scaleX, scaleY); // Maintain aspect ratio

	canvas.style.width = `${CANVAS_WIDTH * scale}px`;
	canvas.style.height = `${CANVAS_HEIGHT * scale}px`;
};

// Listen for canvas resize events
window.addEventListener('resize', resizeCanvas);

resizeCanvas(); // Call once to scale initially

export const keys = {};
export const input = new Input(canvas);
export const images = new Images(context);
export const fonts = new Fonts();
export const stateMachine = new StateMachine();
export const timer = new Timer();
export const sounds = new Sounds();


/**
 * The physics engine we're going to use for this game.
 * We're not importing it anywhere because it is declared globally in index.html.
 *
 * @see https://brm.io/matter-js
 */
// @ts-ignore
export const matter = Matter;

/**
 * The Matter.Engine module contains methods for creating and manipulating engines.
 * An engine is a controller that manages updating the simulation of the world.
 *
 * @see https://brm.io/matter-js/docs/classes/Engine.html
 */
export const engine = matter.Engine.create();

/**
 * The root Matter.Composite instance that will contain all bodies,
 * constraints and other composites to be simulated by this engine.
 *
 * @see https://brm.io/matter-js/docs/classes/Engine.html#property_world
 */
export const world = engine.world;

// Load all the assets from their definitions.
sounds.load(assetDefinition.sounds);
images.load(assetDefinition.images);
fonts.load(assetDefinition.fonts);
