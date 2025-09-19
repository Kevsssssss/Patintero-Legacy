import { Scene } from "phaser";

export class TestPlayGrounds extends Scene
{
    constructor()
    {
        super('TestPlayGrounds');
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

        this.player = this.physics.add.sprite((1024 / 2), (768 / 2), 'player').setCollideWorldBounds(true).setScale(1.5); // player
        
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    update()
    {
        this.back.on('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        // Player Movement
        var speed = 10;
        let moveX = 0;
        let moveY = 0;

        if (this.wasd.up.isDown) moveY -= 1;
        if (this.wasd.down.isDown) moveY += 1;
        if (this.wasd.left.isDown) moveX -= 1;
        if (this.wasd.right.isDown) moveX += 1;

        // Normalize movement vector for consistent speed
        if (moveX !== 0 || moveY !== 0) {
            const length = Math.sqrt(moveX * moveX + moveY * moveY);
            moveX = (moveX / length) * speed;
            moveY = (moveY / length) * speed;
            this.player.x += moveX;
            this.player.y += moveY;

            // Choose animation based on direction
            if (moveY < 0 && moveX === 0) {
                this.player.anims.play('up', true);
            } else if (moveY > 0 && moveX === 0) {
                this.player.anims.play('down', true);
            } else if (moveX < 0) {
                this.player.anims.play('left', true);
            } else if (moveX > 0) {
                this.player.anims.play('right', true);
            }
        } else {
            this.player.anims.play('turn', true);
        }
    }
}