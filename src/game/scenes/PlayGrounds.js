import { Scene } from "phaser";

export class PlayGrounds extends Scene
{
    constructor()
    {
        super('PlayGrounds');
    }

    create()
    {
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


        this.cameras.main.setBackgroundColor(0x874e3b);

        this.add.text(512, 350, 'Theres nothing here yet.', {
            fontFamily: '"Press Start 2P"', fontSize: 30, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        this.player1 = this.physics.add.sprite((1024 / 2), (768 / 2), 'player1').setCollideWorldBounds(true).setScale(1.5); // player 1
        this.player2 = this.physics.add.sprite((1024 / 2), (768 / 2), 'player2').setCollideWorldBounds(true).setScale(1.5); // player 2
        
        // Player 1 controls (WASD)
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
        // Player 2 controls (⬆️⬇️⬅️➡️)
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update()
    {
        this.back.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });

        // PLayer Speed        
        var speed = 5;

        // Player 1 Movement (WASD)
        let moveX1 = 0;
        let moveY1 = 0;

        if (this.wasd.up.isDown) moveY1 -= 1;
        if (this.wasd.down.isDown) moveY1 += 1;
        if (this.wasd.left.isDown) moveX1 -= 1;
        if (this.wasd.right.isDown) moveX1 += 1;

        // Normalize movement vector for consistent speed
        if (moveX1 !== 0 || moveY1 !== 0) {
            const length = Math.sqrt(moveX1 * moveX1 + moveY1 * moveY1);
            moveX1 = (moveX1 / length) * speed;
            moveY1 = (moveY1 / length) * speed;
            this.player1.x += moveX1;
            this.player1.y += moveY1;

            // Choose animation based on direction
            if (moveY1 < 0 && moveX1 === 0) {
                this.player1.anims.play('player1-up', true);
            } else if (moveY1 > 0 && moveX1 === 0) {
                this.player1.anims.play('player1-down', true);
            } else if (moveX1 < 0) {
                this.player1.anims.play('player1-left', true);
            } else if (moveX1 > 0) {
                this.player1.anims.play('player1-right', true);
            }
        } else {
            this.player1.anims.play('player1-turn', true);
        }

        // Player 2 Movement (⬆️⬇️⬅️➡️)
        let moveX2 = 0;
        let moveY2 = 0;

        if (this.cursors.up.isDown) moveY2 -= 1;
        if (this.cursors.down.isDown) moveY2 += 1;
        if (this.cursors.left.isDown) moveX2 -= 1;
        if (this.cursors.right.isDown) moveX2 += 1;
        
        const isMoving2 = (moveX2 !== 0 || moveY2 !== 0);

        if (isMoving2) {
            const length = Math.sqrt(moveX2 * moveX2 + moveY2 * moveY2);
            this.player2.x += (moveX2 / length) * speed;
            this.player2.y += (moveY2 / length) * speed;

            // Play Player 2 animations with prefixed keys
            if (moveY2 < 0) {
                this.player2.anims.play('player2-up', true);
            } else if (moveY2 > 0) {
                this.player2.anims.play('player2-down', true);
            } else if (moveX2 < 0) {
                this.player2.anims.play('player2-left', true);
            } else if (moveX2 > 0) {
                this.player2.anims.play('player2-right', true);
            }
        } else {
            this.player2.anims.play('player2-turn', true);
        }
    }
}