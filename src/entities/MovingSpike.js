import Spike from "./Spike.js";
import { timer } from "../globals.js";
import Easing from "../../lib/Easing.js";

export default class MovingSpike extends Spike {
    constructor(x, y, direction = "up", colour = "transparent", options = {}) {
        super(x, y, direction, colour, options);
        this.startX = x;
        this.startY = y; 
        this.endX = x + 100;
        this.movingBack = false;

        this.startTween();
    }

    startTween() {
        const duration = 2; 
        timer.tween(
            this.body.position, 
            { x: this.movingBack ? this.startX : this.endX }, 
            duration,
            Easing.linear,
            () => {
                this.movingBack = !this.movingBack; 
                this.startTween(); 
            }
        );
    }

    update(dt) {
        timer.update(dt); 
        this.body.position.y = this.startY; 
    }

    render() {
        super.render();
    }
}
