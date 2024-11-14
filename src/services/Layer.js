import Tile from './Tile.js';

export default class Layer {
	constructor(layerDefinition, sprites) {
		this.tiles = Layer.generateTiles(layerDefinition.data, sprites);
		this.width = layerDefinition.width;
		this.height = layerDefinition.height;
	}

	render() {
		for (let y = 0; y < this.height; y++) {
			for (let x = 0; x < this.width; x++) {
				this.getTile(x, y)?.render(x, y);
			}
		}
	}

	isInBounds(x, y) {
		return x >= 0 && x < this.width && y >= 0 && y < this.height;
	}

	getTile(x, y) {
		return this.isInBounds(x, y) ? this.tiles[x + y * this.width] : null;
	}

	setTile(x, y, tile) {
		if (this.isInBounds(x, y)) {
			this.tiles[x + y * this.width] = tile;
		}
	}

	setTileId(x, y, id) {
		if (this.isInBounds(x, y)) {
			this.tiles[x + y * this.width].id = id;
		}
	}

	static generateTiles(layerData, sprites) {
		const tiles = [];

		layerData.forEach((tileId) => {
			// tileId--; // Adjust for Tiled's 1-based indexing
			const tile = tileId === 0 ? null : new Tile(tileId - 1, sprites);
			tiles.push(tile);
		});

		return tiles;
	}
}
