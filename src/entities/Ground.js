import { world, matter, context, CANVAS_WIDTH, CANVAS_HEIGHT } from "../globals.js";
import GameEntity from "./GameEntity.js";

export default class Ground extends GameEntity {
    /**
     * Creates the ground using multiple shapes.
     */
    constructor(levelNumber) {
        const compoundBody = Ground.createCompoundBody(levelNumber);
        super(compoundBody, "transparent"); 
    }

    static createCompoundBody(levelNumber) {
        let compoundBody = null;

        //Borders
        const borderLeft = matter.Bodies.rectangle(8, 100, 16, CANVAS_WIDTH);
        const borderUp = matter.Bodies.rectangle(320, 6, CANVAS_WIDTH, 16);
        const borderRight = matter.Bodies.rectangle(633, 100, 16, CANVAS_WIDTH);
        const borderDown = matter.Bodies.rectangle(320, 390, CANVAS_WIDTH, 16);

        if(levelNumber == 0) {
            const rectangle = matter.Bodies.fromVertices(320, 370, [
                { x: 0, y: 288 },
                { x: 610, y: 288 },
                { x: 610, y: 320 },
                { x: 0, y: 320 },
            ]);
    
            const bigTrapeze = matter.Bodies.fromVertices(309, 332, [
                { x: 200, y: 360 },
                { x: 255, y: 308 },
                { x: 366, y: 308 },
                { x: 416, y: 355 },
            ]);
    
            compoundBody = matter.Body.create({
                parts: [rectangle, bigTrapeze],
                isStatic: true,
                label: "ground",
            });
        }
        else if(levelNumber == 1) {
            //top rectangle
            const topRectangle = matter.Bodies.fromVertices(230, 192, [
                { x: 15, y: 175 },
                { x: 448, y:175 },
                { x: 448, y: 207 },
                { x: 15, y: 207 },
            ]);
    
            //bottomrectangle
            const bottomRectangle = matter.Bodies.fromVertices(320, 368, [
                { x: 15, y: 352 },
                { x: 624, y: 352 },
                { x: 624, y: 384 },
                { x: 15, y: 384 },
            ]);
    
            //top trapeze
            const topTrapeze = matter.Bodies.fromVertices(215, 162, [
                { x: 159, y: 175 },
                { x: 190, y: 144 },
                { x: 240, y: 144 },
                { x: 272, y: 175 },
            ]);
            
            //bottomtrapeze
            const bottomTrapeze = matter.Bodies.fromVertices(312, 330, [
                { x: 207, y: 352 },
                { x: 255, y: 304 },
                { x: 368, y: 304 },
                { x: 416, y: 352 },
            ]);
    
            //bottom triangle
            const bottomTriangle = matter.Bodies.fromVertices(601,330, [
                { x: 568, y: 352 },
                { x: 633, y: 288 },
                { x: 633, y: 352 },
            ]);

            compoundBody = matter.Body.create({
                parts: [topRectangle, bottomRectangle, topTrapeze, bottomTrapeze, bottomTriangle,
                    borderLeft, borderUp, borderDown, borderRight],
                isStatic: true,
                label: "ground",
            });
        }
        else {
            console.log("error")
        }

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
				// context.strokeStyle = "blue";
				// context.lineWidth = 2;
				// context.stroke();
			});
	
			context.restore();
		}
}
