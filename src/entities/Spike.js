import Sprite from "../../lib/Sprite.js";
import ImageName from "../enums/ImageName.js";
import { context, images, matter } from "../globals.js";
import Triangle from "./Triangle.js";

export default class Spike extends Triangle {
    static SPRITE_MEASUREMENTS = {
        spikeUp: { x: 0, y: 0, width: 16, height: 16 }, // Looking Up
        spikeRight: { x: 16, y: 0, width: 16, height: 16 }, // Looking Right
        spikeDown: { x: 32, y: 0, width: 16, height: 16 }, // Looking Down
        spikeLeft: { x: 48, y: 0, width: 16, height: 16 }, // Looking Left
    };

    /**
     * Creates a spike with a triangular shape.
     *
     * @param {number} x - X-coordinate of the spike's position.
     * @param {number} y - Y-coordinate of the spike's position.
     * @param {string} direction - The direction the spike is facing (up, down, left, right).
     * @param {string} colour - Fill colour for the spike (default is transparent).
     * @param {object} options - Matter.js body options.
     */
    constructor(x, y, direction = "up", colour = "transparent", options = { isStatic: true }) {
        const spikeVertices = Spike.getSpikeVertices(direction);
        super(x, y, spikeVertices, colour, options);

        this.x = x;
        this.y = y;
        this.direction = direction;
        this.sprites = Spike.generateSpikeSprites();

        this.width = 16
        this.height = 16

        this.renderOffset = {
            x: -this.width / 2,
            y: -this.height / 2,
        };
    }

    static getSpikeVertices(direction) {
        switch (direction) {
            case "up":
                return [
                    { x: 0, y: -8 },    
                    { x: -8, y: 8 },    
                    { x: 8, y: 8 },     
                ];
            case "down":
                return [
                    { x: 0, y: 8 },     
                    { x: -8, y: -8 },   
                    { x: 8, y: -8 },    
                ];
            case "left":
                return [
                    { x: -8, y: 0 },   
                    { x: 8, y: -8 },    
                    { x: 8, y: 8 },     
                ];
            case "right":
                return [
                    { x: 8, y: 0 },  
                    { x: -8, y: -8 },   
                    { x: -8, y: 8 },    
                ];
            default:
                throw new Error(`Invalid spike direction: ${direction}`);
        }
    }

    render() {
        if (this.sprites && this.sprites.length > 0) {
            const spriteIndex = ["up", "right", "down", "left"].indexOf(this.direction);
            this.sprites[spriteIndex]?.render(
                Math.floor(this.body.position.x + this.renderOffset.x),
                Math.floor(this.body.position.y + this.renderOffset.y)
            );
        }

        //! FOR DEBUGGING PUPOSES
        context.strokeStyle = "blue";
        context.lineWidth = 2;

        const { vertices } = this.body;

        context.beginPath();
        context.moveTo(vertices[0].x, vertices[0].y);

        for (let i = 1; i < vertices.length; i++) {
            context.lineTo(vertices[i].x, vertices[i].y);
        }

        context.closePath();
        context.stroke();
    }

    static generateSpikeSprites() {
        return [
            new Sprite(
                images.get(ImageName.Spike),
                Spike.SPRITE_MEASUREMENTS["spikeUp"].x,
                Spike.SPRITE_MEASUREMENTS["spikeUp"].y,
                Spike.SPRITE_MEASUREMENTS["spikeUp"].width,
                Spike.SPRITE_MEASUREMENTS["spikeUp"].height
            ),
            new Sprite(
                images.get(ImageName.Spike),
                Spike.SPRITE_MEASUREMENTS["spikeRight"].x,
                Spike.SPRITE_MEASUREMENTS["spikeRight"].y,
                Spike.SPRITE_MEASUREMENTS["spikeRight"].width,
                Spike.SPRITE_MEASUREMENTS["spikeRight"].height
            ),
            new Sprite(
                images.get(ImageName.Spike),
                Spike.SPRITE_MEASUREMENTS["spikeDown"].x,
                Spike.SPRITE_MEASUREMENTS["spikeDown"].y,
                Spike.SPRITE_MEASUREMENTS["spikeDown"].width,
                Spike.SPRITE_MEASUREMENTS["spikeDown"].height
            ),
            new Sprite(
                images.get(ImageName.Spike),
                Spike.SPRITE_MEASUREMENTS["spikeLeft"].x,
                Spike.SPRITE_MEASUREMENTS["spikeLeft"].y,
                Spike.SPRITE_MEASUREMENTS["spikeLeft"].width,
                Spike.SPRITE_MEASUREMENTS["spikeLeft"].height
            )
        ];
    }
}
