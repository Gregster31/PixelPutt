import Sprite from '../../lib/Sprite.js';
import ImageName from '../enums/ImageName.js';
import { CANVAS_HEIGHT, CANVAS_WIDTH, images } from '../globals.js';

export default class Background {
    static WIDTH = 640;
    static HEIGHT = 400;

    /**
     * Dynamically generates a background based on the level number.
     */
    constructor(levelNumber) {
        this.sprites = Background.generateSprites(levelNumber);
    }

    render() {
        this.sprites.forEach((sprite, index) => {
            sprite.render(
                index * Background.WIDTH,
                CANVAS_HEIGHT - Background.HEIGHT
            );
        });
    }

    /**
     * Generates background sprites based on the level number.
     */
    static generateSprites(levelNumber) {
        let backgroundImageName;

		switch (levelNumber) {
            case 1:
                backgroundImageName = ImageName.BackgroundLevel1;
                break;
            case 2:
                backgroundImageName = ImageName.BackgroundLevel2;
                break;
            case 3:
                backgroundImageName = ImageName.BackgroundLevel3;
                break;
            default:
                backgroundImageName = ImageName.BackgroundMainMenu;
                break;
        }

        return [
            new Sprite(
                images.get(backgroundImageName),
                0,
                0,
                Background.WIDTH,
                Background.HEIGHT
            )
        ];
    }
}
