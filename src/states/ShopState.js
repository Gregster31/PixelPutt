import GameStateName from '../enums/GameStateName.js'; 
import {
	// @ts-ignore
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	input,
	engine,
	matter,
	sounds,
	stateMachine,
	// @ts-ignore
	timer,
	// @ts-ignore
	world,
    images,
} from '../globals.js';
import State from '../../lib/State.js';
import { roundedRectangle } from '../../lib/Drawing.js';
import Input from '../../lib/Input.js';
import Ball from '../entities/Ball.js';
import SoundName from '../enums/SoundName.js';
import LevelMaker from '../services/LevelMaker.js';
import { getRandomPositiveInteger } from '../../lib/Random.js';
import ImageName from '../enums/ImageName.js';
import Sprite from '../../lib/Sprite.js';
// @ts-ignore
const { Composite, Engine, Mouse, MouseConstraint } = matter;


/**
 * CODE TAKEN FROM MATCH3 ASSIGNMENT FROM VIKRAM SINGH
 * Represents the state the game is in when we've just started.
 * Displays "Match-3" in large text, as well as a menu to "Start" or "Quit".
 */
export default class ShopState extends State {
    static whiteBallArea = { x: 180, y: 60, width: 90, height: 90 };
    static redBallArea = { x: 350, y: 60, width: 90, height: 90 };
    static blueBallArea = { x: 180, y: 200, width: 90, height: 90 };
    static greenBallArea = { x: 350, y: 200, width: 90, height: 90 };
    
	constructor() {
		super();

		// Start the music the very first time showing this state.
		sounds.play(SoundName.Music);
	}

	enter() {
		this.level = LevelMaker.createLevel(0);
	}

	exit() {
		sounds.pause(SoundName.);
	}

	update(dt) {
		Engine.update(engine);
		// @ts-ignore
		this.level.update(dt);
		// @ts-ignore
		if(this.level.ball.didStop()) {
			// @ts-ignore
			this.level.ball.golfIt()
		}
		// @ts-ignore
		if(this.level.ball.isOutOfCanvas()) {
			// @ts-ignore
			this.level.ball = new Ball(100 - Ball.RADIUS, 250, getRandomPositiveInteger(1,4))
		}
		
		this.userClick()
	}

	userClick() {
		if (input.isMouseButtonPressed(Input.MOUSE.LEFT)) {
			const mousePos = input.getMousePosition();
			sounds.play(SoundName.Bag);

			if (this.isMouseInsideArea(mousePos, ShopState.whiteBallArea)) {
				stateMachine.change(GameStateName.TitleScreen, {ballColor: 1});
			} 
			else if (this.isMouseInsideArea(mousePos, ShopState.redBallArea)) {
				stateMachine.change(GameStateName.TitleScreen, {ballColor: 2});
			} 
			else if (this.isMouseInsideArea(mousePos, ShopState.blueBallArea)) {
				stateMachine.change(GameStateName.TitleScreen, {ballColor: 3});
			}
			else if (this.isMouseInsideArea(mousePos, ShopState.greenBallArea)) {
				stateMachine.change(GameStateName.TitleScreen, {ballColor: 4});
			}
		}
	}

    drawBallChoice() {
        context.fillStyle = 'rgb(255, 255, 255, 0.5)';
        
        // White Ball Area
        roundedRectangle(context, ShopState.whiteBallArea.x, ShopState.whiteBallArea.y, ShopState.whiteBallArea.width, ShopState.whiteBallArea.height, 5, true, false);
        this.drawBallSprite(1, ShopState.whiteBallArea); // White ball

        // Red Ball Area
        roundedRectangle(context, ShopState.redBallArea.x, ShopState.redBallArea.y, ShopState.redBallArea.width, ShopState.redBallArea.height, 5, true, false);
        this.drawBallSprite(2, ShopState.redBallArea); // Red ball

        // Blue Ball Area
        roundedRectangle(context, ShopState.blueBallArea.x, ShopState.blueBallArea.y, ShopState.blueBallArea.width, ShopState.blueBallArea.height, 5, true, false);
        this.drawBallSprite(3, ShopState.blueBallArea); // Blue ball

        // Green Ball Area
        roundedRectangle(context, ShopState.greenBallArea.x, ShopState.greenBallArea.y, ShopState.greenBallArea.width, ShopState.greenBallArea.height, 5, true, false);
        this.drawBallSprite(4, ShopState.greenBallArea); // Green ball
    }

    drawBallSprite(ballType, area) {
        const ballSprite = Ball.SPRITE_MEASUREMENTS[ballType];

        const spriteX = area.x + (area.width - ballSprite.width) / 2 + 20;
        const spriteY = area.y + (area.height - ballSprite.height) / 2 + 20;

        const sprite = new Sprite(
            images.get(ImageName.Sprites),
            ballSprite.x,
            ballSprite.y,
            ballSprite.width, 
            ballSprite.height 
        );

        let scale = 0.5
        context.save();

        context.scale(scale, scale);

        sprite.render(spriteX / scale, spriteY / scale);

        context.restore();
    }


	
	isMouseInsideArea(mousePos, area) {
		return (
			mousePos.x >= area.x &&
			mousePos.x <= area.x + area.width &&
			mousePos.y >= area.y &&
			mousePos.y <= area.y + area.height
		);
	}

	render() {
		// @ts-ignore
		this.level.render();
		this.drawDarkBackground();
        this.drawBallChoice();
	}

	/**
	 * Keep the background and tiles a little darker to emphasize foreground.
	 */
	drawDarkBackground() {
		context.fillStyle = 'rgb(0, 0, 0, 0.5)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}
}
