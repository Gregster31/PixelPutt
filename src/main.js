/**
 * PixelPut
 *
 * Base Code From: Vikram Singh (vikram.singh@johnabbott.qc.ca)
 * Adapted By: Julien Halde (julienhalde9@gmail.com)
 *
 *	PixelPut is a 2d puzzle golf game. 
 *	Players must navigate through the objstacles and different terrain 
 *	throughout the levels to get in the hole with the least amount of strokes. 
 * Art
 * @see https://www.spriters-resource.com/mobile/superstickgolf2/sheet/70674/
 *
 * Sounds & Music
 * @see https://pixabay.com/sound-effects/
 */

import GameStateName from './enums/GameStateName.js';
import Game from '../lib/Game.js';
import {
	canvas,
	CANVAS_HEIGHT,
	CANVAS_WIDTH,
	context,
	stateMachine,
} from './globals.js';
import PlayState from './states/PlayState.js';
import GameOverState from './states/GameOverState.js';
import VictoryState from './states/VictoryState.js';
import TitleScreenState from './states/TitleScreenState.js';
import ShopState from './states/ShopState.js';

// Set the dimensions of the play area.
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvas.setAttribute('tabindex', '1'); // Allows the canvas to receive user input.

// Now that the canvas element has been prepared, we can add it to the DOM.
document.body.prepend(canvas);

// Add all the states to the state machine.
stateMachine.add(GameStateName.GameOver, new GameOverState());
stateMachine.add(GameStateName.Victory, new VictoryState());
stateMachine.add(GameStateName.Play, new PlayState());
stateMachine.add(GameStateName.ShopScreen, new ShopState());
stateMachine.add(GameStateName.TitleScreen, new TitleScreenState());


stateMachine.change(GameStateName.TitleScreen, {ballColor: 1});

const game = new Game(stateMachine, context, canvas.width, canvas.height);

game.start();

// Focus the canvas so that the player doesn't have to click on it.
canvas.focus();
