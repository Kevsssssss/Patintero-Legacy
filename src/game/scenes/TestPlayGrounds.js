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


        this.cameras.main.setBackgroundColor(0x814a1e);

        this.add.text(512, 350, 'Wala pa dawg lakaw-lakaw sa ara', {
            fontFamily: '"Press Start 2P"', fontSize: 20, color: '#ffffff',
            stroke: '#000000', strokeThickness: 5,
            align: 'center'
        }).setOrigin(0.5);

        this.player = this.physics.add.sprite((1024 / 2), (768 / 2), 'player').setCollideWorldBounds(true).setScale(1.5); // player
        
        // player animation

        this.anims.create({
            key: 'turn',
            // Change the key from 'dude' to 'player'
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player', { start: 4, end: 7 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('player', { start: 8, end: 11 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('player', { start: 12, end: 15 }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('player', { start: 16, end: 19 }),
            frameRate: 8,
            repeat: -1
        });

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


        
        const speed = 3
        if (this.wasd.up.isDown) {
            this.player.y -= speed;
            this.player.anims.play('up', true);
        }
        else if (this.wasd.down.isDown) {
            this.player.y += speed;
            this.player.anims.play('down', true);
        }
        else if (this.wasd.left.isDown) {
            this.player.x -= speed;
            this.player.anims.play('left', true);
        } else if (this.wasd.right.isDown) {
            this.player.x += speed;
            this.player.anims.play('right', true);
        } else {
            this.player.anims.play('turn', true);
        }
        
    }
}