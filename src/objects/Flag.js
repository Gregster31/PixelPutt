import Game from "../../lib/Game.js";
import GameEntity from "../entities/GameEntity.js";
import GameStateName from "../enums/GameStateName.js";
import { context } from "../globals.js";

export default class Flag {
    static SPRITE_MEASUREMENTS = {
        flag1: { x: 1256, y: 1408, width: 41, height: 100 },
        flag2: { x: 1876, y: 770, width: 41, height: 100 },
        flag3: { x: 1434, y: 1718, width: 43, height: 100 },
        flag4: { x: 1430, y: 1860, width: 44, height: 100 },
        flag5: { x: 1468, y: 1611, width: 40, height: 100 }
    };

    static SECRET_FLAG_SCALE = 0.2;
    static FLAG_SCALE = 0.5;

    constructor(x, y, secret = false) {
        this.x = x;
        this.y = y;
        this.secret = secret

        this.sprites = GameEntity.generateSprites(Object.values(Flag.SPRITE_MEASUREMENTS));

        this.renderOffset = {
            x: -Flag.SPRITE_MEASUREMENTS.flag1.width / 2,
            y: -Flag.SPRITE_MEASUREMENTS.flag1.height / 2
        };

        this.currentFrameIndex = 0;
        this.animationTimer = 0;
        this.frameDuration = 0.2; 
    }

    update(dt) {
        this.animationTimer += dt;

        if (this.animationTimer >= this.frameDuration) {
            this.animationTimer -= this.frameDuration;
            this.currentFrameIndex = (this.currentFrameIndex + 1) % this.sprites.length;
        }
    }

    render() {
        context.save();
        context.translate(this.x, this.y);
        let scaleFactor = 0

        if(this.secret) {
            scaleFactor = Flag.SECRET_FLAG_SCALE; 
        } else {
            scaleFactor = Flag.FLAG_SCALE
        }

        context.scale(scaleFactor, scaleFactor);

        this.sprites[this.currentFrameIndex].render(this.renderOffset.x / scaleFactor, this.renderOffset.y / scaleFactor);

        context.restore();
    }
}

