import { world, matter, context, CANVAS_WIDTH, CANVAS_HEIGHT } from "../globals.js";
import GameEntity from "./GameEntity.js";

export default class Ground extends GameEntity {
    /**
     * Creates the ground using multiple matter shapes.
     */
    constructor(levelNumber) {
        const compoundBody = Ground.createCompoundBody(levelNumber);
        super(compoundBody, "transparent"); 
    }

    static createCompoundBody(levelNumber) {
        let compoundBody = null;

        //Borders of canvas
        const borderLeft = matter.Bodies.rectangle(8, 100, 16, CANVAS_WIDTH);
        const borderUp = matter.Bodies.rectangle(320, 6, CANVAS_WIDTH, 16);
        const borderRight = matter.Bodies.rectangle(633, 100, 16, CANVAS_WIDTH);
        const borderDown = matter.Bodies.rectangle(320, 390, CANVAS_WIDTH, 16);

        switch(levelNumber) {
            case 0:
                const ground0 = matter.Bodies.fromVertices(320, 370, [
                    { x: 0, y: 288 },
                    { x: 610, y: 288 },
                    { x: 610, y: 320 },
                    { x: 0, y: 320 },
                ]);
        
                const bigTrapeze = matter.Bodies.fromVertices(313, 345, [
                    { x: 183, y: 380 },
                    { x: 255, y: 308 },
                    { x: 366, y: 308 },
                    { x: 438, y: 380 },
                ]);
        
                compoundBody = matter.Body.create({
                    parts: [ground0, bigTrapeze],
                    isStatic: true,
                    label: "ground",
                });
                break;
            
            case 1:
                //top rectangle
                const topRectangle = matter.Bodies.fromVertices(228, 192, [
                    { x: 10, y: 175 },
                    { x: 448, y:175 },
                    { x: 448, y: 207 },
                    { x: 10, y: 207 },
                ]);
        
                //bottomrectangle
                const bottomRectangle = matter.Bodies.fromVertices(320, 368, [
                    { x: 10, y: 352 },
                    { x: 624, y: 352 },
                    { x: 624, y: 384 },
                    { x: 10, y: 384 },
                ]);
        
                //top trapeze
                const topTrapeze = matter.Bodies.fromVertices(217, 177, [
                    { x: 135, y: 200 },
                    { x: 190, y: 144 },
                    { x: 240, y: 144 },
                    { x: 295, y: 200 },
                ]);
                
                //bottomtrapeze
                const bottomTrapeze = matter.Bodies.fromVertices(312, 342, [
                    { x: 190, y: 370 },
                    { x: 255, y: 304 },
                    { x: 368, y: 304 },
                    { x: 432, y: 370 },
                ]);
        
                //bottom triangle
                const bottomTriangle = matter.Bodies.fromVertices(601,344, [
                    { x: 540, y: 385 },
                    { x: 637, y: 288 },
                    { x: 637, y: 385 },
                ]);

                compoundBody = matter.Body.create({
                    parts: [topRectangle, bottomRectangle, topTrapeze, bottomTrapeze, bottomTriangle,
                        borderLeft, borderUp, borderDown, borderRight],
                    isStatic: true,
                    label: "ground",
                });
                break;
            
            case 2:
                const ground2 = matter.Bodies.rectangle(320, 373, 620, 70, "transparent", {
                    isStatic: true,
                    frictionStatic: 1,
                    friction: 1,
                });

                // Tower coodinates
                const towerData = [
                    { x: 135, y: 314, width: 48, height: 48 },
                    { x: 232, y: 266, width: 48, height: 80 },
                    { x: 328, y: 250, width: 48, height: 112 },
                    { x: 424, y: 226, width: 48, height: 160 },
                    { x: 560, y: 218, width: 128, height: 240 },
                ];

                // SubTower coodinates
                const subTowerData = [
                    { x: 280, y: 296, width: 48, height: 20 },
                    { x: 376, y: 296, width: 48, height: 20 },
                    { x: 473, y: 296, width: 48, height: 20 },
                ];

                const towers = towerData.map(tower => {
                    return matter.Bodies.rectangle(tower.x, tower.y, tower.width, tower.height, "transparent", {
                        isStatic: true,
                        frictionStatic: 1,
                        friction: 1,
                    });
                });

                const subTowers = subTowerData.map(subTower => {
                    return matter.Bodies.rectangle(subTower.x, subTower.y, subTower.width, subTower.height, "transparent", {
                        isStatic: true,
                        frictionStatic: 1,
                        friction: 1,
                    });
                });

                compoundBody = matter.Body.create({
                    parts: [ground2, ...towers, ...subTowers, 
                        borderLeft, borderUp, borderDown, borderRight],
                    isStatic: true,
                    label: "ground",
                });

                break;

            case 3:
                const baseObjects = [
                    { name: "ground3", x: 320, y: 373, width: 640, height: 70 },
                    { name: "plateform", x: 590, y: 201, width: 90, height: 48 },
                    { name: "mordor", x: 120, y: 245, width: 48, height: 200 },
                ];

                const squareData = [
                    // Top squares
                    { x: 104, y: 88 }, { x: 135, y: 88 },
                    { x: 151, y: 104 }, { x: 88, y: 104 },
                    { x: 72, y: 120 }, { x: 88, y: 136 },
                    { x: 167, y: 120 }, { x: 151, y: 136 },
                    // Bottom left squares
                    { x: 88, y: 312 }, { x: 88, y: 328 },
                    { x: 72, y: 328 },
                ];

                const baseBodies = baseObjects.map(obj => 
                    matter.Bodies.rectangle(obj.x, obj.y, obj.width, obj.height, "transparent", {
                        isStatic: true,
                    })
                );

                const squares = squareData.map(square => {
                    return matter.Bodies.rectangle(square.x, square.y, 16, 16, "transparent", {
                        isStatic: true,
                        frictionStatic: 1,
                        friction: 1,
                    });
                });

                // Have to make them bigger or else player can go between both forms
                const leftBottom = matter.Bodies.rectangle(145, 325, 30, 40, "transparent", {
                    isStatic: true,
                });

                const leftTop = matter.Bodies.rectangle(160, 340, 30, 40, "transparent", {
                    isStatic: true,
                });

                compoundBody = matter.Body.create({
                    parts: [
                        ...baseBodies,
                        ...squares, leftBottom, leftTop, 
                        borderLeft, borderUp, borderDown, borderRight
                    ],
                    isStatic: true,
                    label: "ground",
                });
                break;

            case 4:
                const baseObjectsUnlocked = [
                    { name: "ground3u", x: 320, y: 373, width: 640, height: 70 },
                    { name: "plateformu", x: 590, y: 201, width: 90, height: 48 },
                    { name: "mordoru", x: 120, y: 216, width: 48, height: 143 },
                ];

                const squareDataU = [
                    { x: 104, y: 88 }, { x: 135, y: 88 },
                    { x: 151, y: 104 }, { x: 88, y: 104 },
                    { x: 72, y: 120 }, { x: 88, y: 136 },
                    { x: 167, y: 120 }, { x: 151, y: 136 }
                ];

                const baseBodiesUnlocked = baseObjectsUnlocked.map(obj => 
                    matter.Bodies.rectangle(obj.x, obj.y, obj.width, obj.height, "transparent", {
                        isStatic: true,
                        frictionStatic: 1,
                        friction: 1,
                    })
                );

                const squareBodiesU = squareDataU.map(square => 
                    matter.Bodies.rectangle(square.x, square.y, 16, 16, "transparent", {
                        isStatic: true,
                        frictionStatic: 1,
                        friction: 1,
                    })
                );

                compoundBody = matter.Body.create({
                    parts: [
                        ...baseBodiesUnlocked, 
                        ...squareBodiesU, 
                        borderLeft, borderUp, borderDown, borderRight 
                    ],
                    isStatic: true,
                    label: "ground",
                });
                break;        
            }

        return compoundBody;
    }

    render() {
    }
}
