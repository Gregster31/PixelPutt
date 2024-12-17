import GameEntity from "../entities/GameEntity.js";
import SoundName from "../enums/SoundName.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	engine,
	images,
	matter,
	sounds,
	world
} from "../globals.js";

const {
	Body,
	Composite,
	Constraint,
	Events,
	Mouse,
	MouseConstraint,
	Vector,
} = matter;


export default class Shot {
    constructor(level, ball) {
        this.level = level;
        this.ball = ball;
        this.wasLaunched = false;
        this.trajectoryPoints = [];

        this.isDragging = false;
        this.startPoint = null;
        this.endPoint = null;

        this.MAX_LINE_LENGTH = 80; // Maximum line length
        this.initializeMouseConstraint();
    }

    update(dt) {

    }

    render() {
        if (this.isDragging && this.startPoint && this.endPoint) {
            const dx = this.endPoint.x - this.startPoint.x;
            const dy = this.endPoint.y - this.startPoint.y;
            const lineLength = Math.sqrt(dx ** 2 + dy ** 2);
            const clampedLength = Math.min(lineLength, this.MAX_LINE_LENGTH);

            const scaleFactor = clampedLength / lineLength;
            const clampedEndPoint = {
                x: this.startPoint.x + dx * scaleFactor,
                y: this.startPoint.y + dy * scaleFactor,
            };

            let strokeColor = this.getStrokeColor(clampedLength)

            context.beginPath();
            context.moveTo(this.startPoint.x, this.startPoint.y);
            context.lineTo(clampedEndPoint.x, clampedEndPoint.y);
            context.strokeStyle = strokeColor;
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
        }
    }

    getStrokeColor(clampedLength) {
        const lengthPercentage = (clampedLength / this.MAX_LINE_LENGTH) * 100;

        if (lengthPercentage >= 90) {
            return "red";
        } else if (lengthPercentage >= 60) {
            return "orange";
        } else if (lengthPercentage >= 30) {
            return "yellow";
        } 
        
        return "green"
    }

    initializeMouseConstraint() {
        const mouse = Mouse.create(canvas);
        const mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false,
                },
            },
            collisionFilter: {
                group: 0,
                mask: 0xFFFFFFFF,
            },
        });

        // Exclude the ball from being moved by the mouse
        mouseConstraint.collisionFilter = {
            group: 0,
            mask: 0xFFFFFFFF ^ 0x0002,
        };

        Composite.add(world, mouseConstraint);

        Events.on(mouseConstraint, "mousedown", (event) => {
            const mousePosition = {
                x: event.mouse.position.x,
                y: event.mouse.position.y,
            };

            // Check if the mouse is on the ball
            const distance = this.calculateDistance(
                mousePosition.x,
                mousePosition.y,
                this.ball.body.position.x,
                this.ball.body.position.y
            );

            if (distance <= this.ball.body.circleRadius) {
                this.isDragging = true;
                this.startPoint = mousePosition;
            }
        });

        Events.on(mouseConstraint, "mousemove", (event) => {
            if (this.isDragging) {
                this.endPoint = {
                    x: event.mouse.position.x,
                    y: event.mouse.position.y,
                };
            }
        });

        Events.on(mouseConstraint, "mouseup", () => {
            if (this.isDragging && this.ball.didStop() && this.startPoint && this.endPoint) {
                this.launchBall();
            }
            this.isDragging = false;
            this.startPoint = null;
            this.endPoint = null;
        });
    }

    calculateDistance(x1, y1, x2, y2) {
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    launchBall() {
        this.level.currentStrokes += 1;
        // @ts-ignore
        const dx = this.endPoint.x - this.startPoint.x;
        // @ts-ignore
        const dy = this.endPoint.y - this.startPoint.y;
        
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const clampedMagnitude = Math.min(magnitude, this.MAX_LINE_LENGTH);
        const forceScale = -0.005;
        const force = {
            x: (dx / magnitude) * clampedMagnitude * forceScale,
            y: (dy / magnitude) * clampedMagnitude * forceScale,
        };

        Body.applyForce(this.ball.body, this.ball.body.position, force);

        this.wasLaunched = true;
        sounds.play(SoundName.Hit);
    }
}
