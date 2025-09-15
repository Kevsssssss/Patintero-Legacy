import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.add.image(512, 384, 'background').setScale(1.5);
        // Game Title
        this.title = this.add.text(512, 280, 'PATINTERO', {
            fontFamily: '"Press Start 2P"', fontSize: 100, color: '#f3a51d',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5)
        this.titleSub = this.add.text(512, 370, 'LEGACY', {
            fontFamily: '"Press Start 2P"', fontSize: 80, color: '#1977bd',
            stroke: '#000000', strokeThickness: 10,
            align: 'center'
        }).setOrigin(0.5)

        this.tweens.add({
            targets: this.title,
            y: this.title.y - 20, // Move 20 pixels up from its original position
            duration: 1500, // Duration of the tween in milliseconds
            ease: 'Sine.easeInOut',
            yoyo: true, // Make it go back and forth
            repeat: -1 // Repeat forever
        });
        this.tweens.add({
            targets: this.titleSub,
            y: this.titleSub.y - 20, // Move 20 pixels down from its original position
            duration: 1500,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1
        });

        // Clickable Play Text
        this.mainMenuText = this.add.text(512, 600, 'Play', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
            cursor: 'pointer'
        }).setOrigin(0.5).setInteractive();
        // Adding hover effect
        this.mainMenuText.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.mainMenuText.setScale(1.1)
        });
        this.mainMenuText.on('pointerout', () => {
            this.game.canvas.style.cursor = 'default';
            this.mainMenuText.setScale(1)
        });

        // Clickable Controls Text
        this.controlText = this.add.text(512, 650, 'Controls', {
            fontFamily: '"Press Start 2P', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center',
        }).setOrigin(0.5).setInteractive();
        // Adding hover effect
        this.controlText.on('pointerover', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.controlText.setScale(1.1);
        });
        this.controlText.on('pointerout', () => {
            this.game.canvas.style.cursor = 'pointer';
            this.controlText.setScale(1);
        });
    }
    update ()
    {
        this.mainMenuText.once('pointerdown', () => {
            this.scene.start('Lobby');
        });
        this.controlText.once('pointerdown', () => {
            // Change scene to controllers
        });
    }
}
