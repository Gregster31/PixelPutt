import { world, matter, context } from "../globals.js";
import GameEntity from "./GameEntity.js";

export default class Ground extends GameEntity {
    /**
     * Creates the ground using multiple shapes.
     */
    constructor() {
        const compoundBody = Ground.createCompoundBody();
        super(compoundBody, "transparent"); 
    }

    static createCompoundBody() {

		const rectangle = matter.Bodies.fromVertices(320, 304, [
            { x: 0, y: 288 },
            { x: 640, y: 288 },
            { x: 640, y: 320 },
            { x: 0, y: 320 },
        ]);

        const smallTrapeze = matter.Bodies.fromVertices(256, 281, [
            { x: 223, y: 288 },
            { x: 239, y: 272 },
            { x: 273, y: 272 },
            { x: 288, y: 288 },
        ]);

        const bigTrapeze = matter.Bodies.fromVertices(408, 270, [
            { x: 352, y: 288 },
            { x: 399, y: 240 },
            { x: 417, y: 240 },
            { x: 464, y: 288 },
        ]);

        const compoundBody = matter.Body.create({
            parts: [rectangle, smallTrapeze, bigTrapeze],
            isStatic: true,
            label: "ground",
        });

        return compoundBody;
    }

	    /**
     * Renders the compound body with a blue outline.
     */
		render() {
			context.save();
			context.translate(this.body.position.x, this.body.position.y);
			context.rotate(this.body.angle);
	
			this.body.parts.forEach((part, index) => {
				if (index === 0) return;
	
				context.beginPath();
				const vertices = part.vertices;
	
				context.moveTo(vertices[0].x - this.body.position.x, vertices[0].y - this.body.position.y);
	
				for (let i = 1; i < vertices.length; i++) {
					context.lineTo(vertices[i].x - this.body.position.x, vertices[i].y - this.body.position.y);
				}
				context.closePath();
	
				//! TESTING PURPOSES - GET OUTLINE IN BLUE OF THE MAP GROUND
				// Set outline style
				context.strokeStyle = "blue";
				context.lineWidth = 2;
				context.stroke();
			});
	
			context.restore();
		}
}
