import GameEntity from "../entities/GameEntity.js";
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	engine,
	images,
	matter,
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

        this.initializeMouseConstraint();
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
        });

        Composite.add(world, mouseConstraint);

        Events.on(mouseConstraint, "mousedown", (event) => {
            this.isDragging = true;
            this.startPoint = {
                x: event.mouse.position.x,
                y: event.mouse.position.y,
            };
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

    launchBall() {
		this.level.currentStrokes += 1

        // @ts-ignore
        const dx = this.endPoint.x - this.startPoint.x;
        // @ts-ignore
        const dy = this.endPoint.y - this.startPoint.y;
        const magnitude = Math.sqrt(dx * dx + dy * dy);
        const forceScale = -0.005;
        const force = {
            x: (dx / magnitude) * magnitude * forceScale,
            y: (dy / magnitude) * magnitude * forceScale,
        };

        Body.applyForce(this.ball.body, this.ball.body.position, force);

        this.wasLaunched = true;
    }

    update(dt) {

	}

    render() {
        if (this.isDragging && this.startPoint && this.endPoint) {
            context.beginPath();
            context.moveTo(this.startPoint.x, this.startPoint.y);
            context.lineTo(this.endPoint.x, this.endPoint.y);
			if(this.ball.didStop()) {
            	context.strokeStyle = "black";
			} else {
				context.strokeStyle = "red";
			}
            context.lineWidth = 2;
            context.stroke();
            context.closePath();
        }
    }
}