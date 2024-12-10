import { matter } from "../globals.js";
import Triangle from "./Triangle.js";

export default class Spike extends Triangle {
    /**
     * Creates a spike with a triangular shape.
     *
     * @param {number} x - X-coordinate of the spike's position.
     * @param {number} y - Y-coordinate of the spike's position.
     * @param {string} colour - Fill colour for the spike (default is red).
     * @param {object} options - Matter.js body options.
     */
    constructor(x, y, colour = "red", options = { isStatic: true }) {
        const spikeVertices = [
            { x: 0, y: 0 },
            { x: -10, y: 20 },
            { x: 10, y: 20 },  
        ];
        super(x, y, spikeVertices, colour, options);
    }
}
