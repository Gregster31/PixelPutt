import State from '../../lib/State.js';
import Debug from '../../lib/Debug.js';
import Map from '../services/Map.js';

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
	}

	update() {
		this.debug.update();
	}

	render() {
		this.map.render();
	}
}
