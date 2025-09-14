import { Scene } from "phaser";

export class Lobby extends Scene
{
    constructor()
    {
        super('Lobby');
    }

    create()
    {
        this.add.image(512, 384, 'background').setScale(1.5);
        
        // Back Button
        this.back = this.add.text(100, 50, 'Back', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 9,
            align: 'center' 
        }).setOrigin(0.5).setInteractive();
        this.back.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.back.setScale(1.1);
        });
        this.back.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            this.back.setScale(1);
        });

        // Players Amount Option
        this.twoPlayers = this.add.text(512, 350, '2 Players', {
            fontFamily: '"Press Start 2P"', fontSize: 40, color: '#ffffff',
            stroke: '#000000', strokeThickness: 9,
            align: 'center' 
        }).setOrigin(0.5).setInteractive();
        this.twoPlayers.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.twoPlayers.setScale(1.1);
        });
        this.twoPlayers.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            this.twoPlayers.setScale(1);
        });
        this.fourPlayers = this.add.text(512, 500, '4 Players', {
            fontFamily: '"Press Start 2P"', fontSize: 40, color: '#ffffff',
            stroke: '#000000', strokeThickness: 9,
            align: 'center' 
        }).setOrigin(0.5).setInteractive();
        this.fourPlayers.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.fourPlayers.setScale(1.1);
        });
        this.fourPlayers.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            this.fourPlayers.setScale(1);
        });
    }
    update()
    {
        this.back.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        this.twoPlayers.on('pointerdown', () => {
            this.scene.start('Game');
        });
        this.fourPlayers.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}   