import Phaser from "phaser";

import TitleScreen from "./scene/TitleScreen";
import Game from "./scene/Game";

const config = {
    height: 500,
    width: 800,
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0},
            debug: true
        }
    }
}

const game = new Phaser.Game(config)

game.scene.add('titlescreen', TitleScreen)
game.scene.add('game', Game)

// game.scene.start('titlescreen')
game.scene.start('game')