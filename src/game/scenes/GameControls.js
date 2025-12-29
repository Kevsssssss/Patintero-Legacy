import { Scene } from "phaser";

import '@fontsource/press-start-2p';

export class GameControls extends Scene {
    constructor() {
        super('GameControls')
    }

    create() {
        this.add.image(512, 384, 'background').setScale(5);

        this.controlsInstruction = this.add.text(1024 / 2, (768 / 2) - 300, 'Controls', {
            fontFamily: '"Press Start 2P"', fontSize: 40, color: '#ffffff',
            stroke: '#000000', strokeThickness: 9,
            align: 'center'
        }).setOrigin(0.5);

        this.player1ControlText = this.add.text((1024 / 2) - 200, (768 / 2) - 50, 'Player 1', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        this.player2ControlText = this.add.text((1024 / 2) + 200, (768 / 2) - 50, 'Player 2', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        // image for key controlls
        this.add.image((1024 / 2) - 200, (768 / 2) + 100, 'arrowkeys').setOrigin(0.5, 0.5);
        this.add.image((1024 / 2) + 200, (768 / 2) + 100, 'wasdkeys').setOrigin(0.5, 0.5);

        // Flag to track if the scene is ready to transition
        this.canContinue = false;

        // Add the 'Click to Continue' text (initially hidden)
        this.continueText = this.add.text(1024 / 2, 768 - 50, 'Click to Continue', {
            fontFamily: '"Press Start 2P"', fontSize: 24, color: '#ffd700', // Gold color
            stroke: '#000000', strokeThickness: 7,
            align: 'center'
        }).setOrigin(0.5).setAlpha(0); // Set alpha to 0 to hide it initially

        // Set up the 5-second timer
        // 5000 milliseconds = 5 seconds
        this.time.delayedCall(2000, this.enableContinue, [], this);

        // Set up the click handler
        this.input.on('pointerdown', this.handleContinue, this);
    }

    /**
     * Called by the timer after 5 seconds to enable continuation and show the text.
     */
    enableContinue() {
        this.canContinue = true;
        
        // Ensure the text is visible right away (in case the tween is delayed or fails)
        this.continueText.setAlpha(1);

        // Add the flashing effect (tween)
        this.tweens.add({
            targets: this.continueText,
            alpha: 0.2, // Fade from 1 down to 0.2
            duration: 500, // Duration of one fade
            ease: 'Linear',
            yoyo: true, // Go back (fade back up to 1)
            repeat: -1 // Repeat indefinitely
        });
    }

    /**
     * Called when the user clicks/taps the screen.
     */
    handleContinue() {
        if (this.canContinue) {
            // Remove the input event listener and stop the tween to clean up
            this.input.off('pointerdown', this.handleContinue, this);
            this.tweens.killTweensOf(this.continueText);

            // Transition to the next scene
            // 🛑 IMPORTANT: Replace 'PlayGrounds' with the key of the next scene.
            this.scene.start('PlayGrounds'); 
        }
    }

    update() {
        // ... (your existing update logic, if any)
    }
}