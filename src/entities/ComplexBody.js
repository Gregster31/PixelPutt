import { context, matter } from "../globals.js";
import GameEntity from "./GameEntity.js";

export default class ComplexBody extends GameEntity {
		/**
	 * A GameEntity that has a Matter complexBody  as its body.
	 * Canvas origin is top-left, Matter origin is center.
	 * We'll work in top-left coordinates as usual but
	 * offset them when giving/retrieving to/from Matter.
	 *
	 * @see https://brm.io/matter-js/docs/classes/Bodies.html#method_fromVertices
	 *
	 * @param {number} x
	 * @param {number} y
	 * @param {Array} vertexSets
	 * @param {object} options
	 */
    constructor(x, y, vertexSets, colour, options) {
        super(matter.Bodies.fromVertices(x, y, vertexSets, options), colour);
    }

    // render() {
    //     context.save();
    //     context.translate(this.body.position.x, this.body.position.y);
    //     context.rotate(this.body.angle);

    //     context.beginPath();
    //     const vertices = this.body.vertices;
    //     context.moveTo(vertices[0].x - this.body.position.x, vertices[0].y - this.body.position.y);

    //     for (let i = 1; i < vertices.length; i++) {
    //         context.lineTo(vertices[i].x - this.body.position.x, vertices[i].y - this.body.position.y);
    //     }
    //     context.closePath();
    //     context.fillStyle = this.colour;
    //     context.fill();

    //     context.restore();
    // }
    render() {
        // Draw the vertices outline
        const vertices = this.body.vertices;
    
        context.beginPath();
        context.moveTo(vertices[0].x, vertices[0].y);
    
        for (let i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i].x, vertices[i].y);
        }
    
        context.closePath();
        context.strokeStyle = "blue";
        context.stroke();
    }
    
}
