import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { Lobby } from './scenes/Lobby';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { TestPlayGrounds } from './scenes/TestPlayGrounds';
import { AUTO, Game } from 'phaser';

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
    type: AUTO,
    width: 1024,
    height: 768,
    parent: 'game-container',
    backgroundColor: '#028af8',
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        },
        debug: true
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Lobby,
        MainGame,
        GameOver,
        TestPlayGrounds
    ]
};

const StartGame = (parent) => {

    return new Game({ ...config, parent });

}

export default StartGame;
