import GameEntity from "./GameEntity.js";
import { context, matter } from "../globals.js";

export default class Triangle extends GameEntity {
    /**
     * A GameEntity that has a Matter triangle as its body.
     * The origin for rendering will be adjusted based on the vertices.
     *
     * @param {number} x - X-coordinate for the triangle's position.
     * @param {number} y - Y-coordinate for the triangle's position.
     * @param {object} vertices - Array of vertex objects defining the triangle.
     * @param {string} colour - Fill colour for the triangle.
     * @param {object} options - Matter.js body options.
     */
    constructor(x, y, vertices, colour = "transparent", options) {
        const adjustedVertices = vertices.map(vertex => ({
            x: vertex.x + x,
            y: vertex.y + y
        }));

        const body = matter.Bodies.fromVertices(x, y, adjustedVertices, options);
        super(body, colour);

        this.vertices = adjustedVertices; 
        this.renderOffset = { x: 0, y: 0 }; 
    }

    render() {
        context.save();
        context.translate(this.body.position.x, this.body.position.y);
        context.rotate(this.body.angle);

        context.beginPath();
        const vertices = this.body.vertices;
        context.moveTo(vertices[0].x - this.body.position.x, vertices[0].y - this.body.position.y);
        for (let i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i].x - this.body.position.x, vertices[i].y - this.body.position.y);
        }
        context.closePath();

        context.fillStyle = this.colour;
        context.fill();

        context.restore();
    }
}
