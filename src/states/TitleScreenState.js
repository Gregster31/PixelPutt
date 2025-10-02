import GameStateName from '../enums/GameStateName.js'; 
import {
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	input,
	engine,
	matter,
	sounds,
	stateMachine,
	timer,
} from '../globals.js';
import State from '../../lib/State.js';
import { roundedRectangle } from '../../lib/Drawing.js';
import Input from '../../lib/Input.js';
import Ball from '../entities/Ball.js';
import SoundName from '../enums/SoundName.js';
import LevelMaker from '../services/LevelMaker.js';
import { getRandomPositiveInteger } from '../../lib/Random.js';
const { Engine } = matter;


/**
 * CODE TAKEN FROM MATCH3 ASSIGNMENT FROM VIKRAM SINGH
 * Represents the state the game is in when we've just started.
 * Displays "Match-3" in large text, as well as a menu to "Start" or "Quit".
 */
export default class TitleScreenState extends State {
	static GOLD_BORDER = 3;
	static SILVER_BORDER = 5;
	static BRONZE_BORDER = 8;

	constructor() {
		super();

		// Fixed timestep accumulator for physics
		this.physicsAccumulator = 0;
		this.fixedTimeStep = 1 / 60;

		this.levelOptions = ['1', '2', '3'];

		this.colours = [
			[255, 87, 51],   // Bright Red-Orange
			[255, 140, 0],   // Dark Orange
			[255, 195, 0],   // Golden Yellow
			[255, 69, 0],    // Deep Red-Orange
			[255, 160, 122], // Light Salmon
			[255, 223, 0],   // Sun Yellow
			[173, 216, 230], // Light Blue
			[50, 205, 50],   // Lime Green
			[255, 165, 0], // Straight up just orange
		];
		
		this.titleLetters = ['P', 'I', 'X', 'E', 'L', 'P', 'U', 'T', 'T'];
		this.startColourTimer();
		this.ballColor = 1
		this.levelHighScores = [100,100,100]

		// Start the music the very first time showing this state.
		sounds.play(SoundName.Music);
	}

	enter(parameters) {
		this.level = LevelMaker.createLevel(0);
		this.physicsAccumulator = 0; // Reset accumulator

		if(parameters.ballColor != undefined) {
			this.ballColor = parameters.ballColor
		}
		if(this.levelHighScores[parameters.level - 1] > parameters.strokes) {
			this.levelHighScores[parameters.level - 1] = parameters.strokes
		}
		sounds.play(SoundName.Music);
		this.startColourTimer();
	}

	exit() {
		sounds.pause(SoundName.Music);
	}

	update(dt) {
		// Accumulate time
		this.physicsAccumulator += dt;
		
		// Update physics in fixed timesteps
		while (this.physicsAccumulator >= this.fixedTimeStep) {
			Engine.update(engine, this.fixedTimeStep * 1000);
			this.physicsAccumulator -= this.fixedTimeStep;
		}
		
		this.level.update(dt);
		if(this.level.ball.didStop()) {
			this.level.ball.golfIt()
		}

		if(this.level.ball.isOutOfCanvas()) {
			this.level.ball = new Ball(100 - Ball.RADIUS, 250, getRandomPositiveInteger(1,4))
		}
		
		timer.update(dt);
		this.clickLevel()
	}

	clickLevel() {
		if (input.isMouseButtonPressed(Input.MOUSE.LEFT)) {
			const mousePos = input.getMousePosition();
			
			const level1Area = { x: 85, y: CANVAS_HEIGHT / 2 + 30, width: 150, height: 40 };
			const level2Area = { x: 245, y: CANVAS_HEIGHT / 2 + 30, width: 150, height: 40 };
			const level3Area = { x: 405, y: CANVAS_HEIGHT / 2 + 30, width: 150, height: 40 };
			const shopArea = { x: 170, y: 320, width: 300, height: 50 };

			
			if (this.isMouseInsideArea(mousePos, level1Area)) {
				console.log("Level 1 Selected");
				stateMachine.change(GameStateName.Play, {level: 1, ballColor: this.ballColor});
			} 
			else if (this.isMouseInsideArea(mousePos, level2Area)) {
				console.log("Level 2 Selected");
				stateMachine.change(GameStateName.Play, {level: 2, ballColor: this.ballColor});
			} 
			else if (this.isMouseInsideArea(mousePos, level3Area)) {
				console.log("Level 3 Selected");
				stateMachine.change(GameStateName.Play, {level: 3, ballColor: this.ballColor});

			}
			else if (this.isMouseInsideArea(mousePos, shopArea)) {
				console.log("Shop Selected");
				stateMachine.change(GameStateName.ShopScreen);
			}

		}
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
		this.level.render();
		this.drawDarkBackground();
		this.drawTitleText();
		this.drawLevelSelection();
		this.drawShop();
		this.drawPrize();		
	}

	drawPrize() {
		if(this.levelHighScores.every(score => score <= TitleScreenState.GOLD_BORDER)) {
			context.font = '30px Retro'; 
			context.textBaseline = 'middle';
			context.textAlign = 'center';
			context.fillStyle = 'rgb(0, 0, 0)'; 
	
			const message = `Congratulations, you are\na pro golfer 🏆`;
			const xPos = CANVAS_WIDTH / 2;  
			const yPos = CANVAS_HEIGHT / 2;
	
			context.fillText(message, xPos, yPos);
		}	
	}

	drawLevelSelection() {
		const menuWidth = 150; 
		const menuHeight = 40; 
		const menuSpacing = 10; 
		const offSetY = 30;  
	
		for (let i = 0; i < this.levelOptions.length; i++) {
			const level = this.levelOptions[i];
			const x = CANVAS_WIDTH / 2 - (menuWidth * this.levelOptions.length + menuSpacing * (this.levelOptions.length - 1)) / 2 + (menuWidth + menuSpacing) * i;
			const y = CANVAS_HEIGHT / 2 + offSetY;
	
			context.fillStyle = 'rgb(255, 255, 255, 0.5)';
			roundedRectangle(
				context,
				x,
				y,
				menuWidth,
				menuHeight,
				5,
				true,
				false
			);
	
			let borderColor = 'black';
			if (this.levelHighScores[i] <= TitleScreenState.GOLD_BORDER) {
				borderColor = '#FFD700';
			} else if (this.levelHighScores[i] <= TitleScreenState.SILVER_BORDER) {
				borderColor = '#C0C0C0'; 
			} else if (this.levelHighScores[i] <= TitleScreenState.BRONZE_BORDER) {
				borderColor = '#cd7f32'; 
			}
	
			context.lineWidth = 2; 
			context.strokeStyle = borderColor;
			context.strokeRect(x, y, menuWidth, menuHeight); 
	
			context.fillStyle = 'black'; 
			context.font = '20px Retro'; 
			context.textAlign = 'center';
			context.textBaseline = 'middle';
			context.fillText(level, x + menuWidth / 2, y + menuHeight / 2);
		}
	}

	/**
	 * Keep the background and tiles a little darker to emphasize foreground.
	 */
	drawDarkBackground() {
		context.fillStyle = 'rgb(0, 0, 0, 0.5)';
		context.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	}

	/**
	 * Draw the centered MATCH-3 text with background rectangle,
	 * placed along the Y axis relative to the center.
	 */
	drawTitleText() {
		const offSet = -140;
	
		context.fillStyle = 'rgb(255, 255, 255, 0.5)';
		roundedRectangle(
			context,
			CANVAS_WIDTH / 2 - 230,
			CANVAS_HEIGHT / 2 + offSet,
			480,
			100,
			5,
			true,
			false
		);
	
		context.font = '50px Retro';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
		context.strokeStyle = 'black'; 
		context.lineWidth = 4; 
	
		for (let i = 0; i < this.titleLetters.length; i++) {
			const r = this.colours[i][0];
			const g = this.colours[i][1];
			const b = this.colours[i][2];
	
			context.fillStyle = `rgb(${r}, ${g}, ${b})`;
	
			context.strokeText(
				this.titleLetters[i][0],
				CANVAS_WIDTH / 2 + 50 * i - 185,
				CANVAS_HEIGHT / 2 + offSet + 55
			);
	
			context.fillText(
				this.titleLetters[i][0],
				CANVAS_WIDTH / 2 + 50 * i - 185,
				CANVAS_HEIGHT / 2 + offSet + 55
			);
		}
	}
	

	/**
	 * Draws "Start" and "Quit Game" text over semi-transparent rectangles.
	 */
	drawShop() {
		const offSet = { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT / 2 + 75 };
		const menuWidth = 300;
		const menuHeight = 50;
	
		context.fillStyle = 'rgb(255, 255, 255, 0.5)';
		roundedRectangle(
			context,
			offSet.x - menuWidth / 2,
			offSet.y - menuHeight / 2 + 70,
			menuWidth,
			menuHeight,
			5,
			true,
			false
		);
	
		context.font = '40px Retro';
		context.textBaseline = 'middle';
		context.textAlign = 'center';
	
		context.strokeStyle = 'black'; 
		context.lineWidth = 2; 
	
		context.fillStyle = `rgb(128, 0, 128)`; 
	
		const text = 'Shop';
		const textWidth = context.measureText(text).width;
	
		context.strokeText(
			text,
			offSet.x - textWidth / 2 + 30,
			offSet.y + 72
		);
	
		context.fillText(
			text,
			offSet.x - textWidth / 2 + 30,
			offSet.y + 72
		);
	}
	
	startColourTimer() {
		this.colourTimer = timer.addTask(() => {
			// Shift every colour to the next, looping the last to the front.
			this.colours = this.colours
				.slice(1)
				.concat(this.colours.slice(0, 1));
		}, 0.25);
	}
}