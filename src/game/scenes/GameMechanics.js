import { Scene } from "phaser";

import '@fontsource/press-start-2p'

export class GameMechanics extends Scene {
    constructor() {
        super('GameMechanics');
    }
    create() {
        this.add.image(512, 384, 'background').setScale(5);

        // Back Button
        this.back = this.add.text(100, 50, 'Back', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 9,
            align: 'center'
        }).setOrigin(0.5).setInteractive().setDepth(1000);
        this.back.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.back.setScale(1.1);
        });
        this.back.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            this.back.setScale(1);
        });

        this.back.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        
        this.title = this.add.text(512, 100, 'Patintero Rules', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#f3a51d',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5).setDepth(1000);;

        this.add.image(512, 384 + 50, 'instructions');
    }
    update() {

    }
}