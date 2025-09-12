import Phaser from "phaser";

import TitleScreen from "./scene/TitleScreen";

const config = {
    height: 500,
    width: 800,
    type: Phaser.AUTO,
    backgroundColor: 0x308022,
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

game.scene.start('titlescreen')