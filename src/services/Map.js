import Sprite from '../../lib/Sprite.js';
import ImageName from '../enums/ImageName.js';
import Tile from './Tile.js';
import Layer from './Layer.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, context, images } from '../globals.js';

export default class Map {
	static FOREGROUND_LAYER = 0;

	constructor(mapDefinition) {
		this.width = mapDefinition.width;
		this.height = mapDefinition.height;
		this.tileSize = mapDefinition.tilewidth;
		this.tilesets = mapDefinition.tilesets;

		//! PROBLEM WITH THE SMALL PURPLE BAND IN MAP
		const sprites = Sprite.generateSpritesFromSpriteSheet(
			images.get(ImageName.Tiles),
			this.tileSize,
			this.tileSize
		);

		this.layers = mapDefinition.layers.map(
			(layerData) => new Layer(layerData, sprites)
		);

		this.foregroundLayer = this.layers[Map.FOREGROUND_LAYER];
	}

	render() {
		this.foregroundLayer.render(); 

		// Map.renderGrid();
	}

	getTileAt(layerIndex, col, row) {
		return this.layers[layerIndex].getTile(col, row);
	}

	/**
	 * Draws a grid of squares on the screen to help with debugging.
	 */
	static renderGrid() {
		context.save();
		context.strokeStyle = 'white';

		for (let y = 1; y < CANVAS_HEIGHT / Tile.SIZE; y++) {
			context.beginPath();
			context.moveTo(0, y * Tile.SIZE);
			context.lineTo(CANVAS_WIDTH, y * Tile.SIZE);
			context.closePath();
			context.stroke();

			for (let x = 1; x < CANVAS_WIDTH / Tile.SIZE; x++) {
				context.beginPath();
				context.moveTo(x * Tile.SIZE, 0);
				context.lineTo(x * Tile.SIZE, CANVAS_HEIGHT);
				context.closePath();
				context.stroke();
			}
		}

		context.restore();
	}
}
