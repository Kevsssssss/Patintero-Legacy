import { Scene } from "phaser";

export class TestPlayGrounds extends Scene
{
    constructor()
    {
        super('TestPlayGrounds');
    }

    preload()
    {
        // // player animation
        // this.anims.create({
        //     key: 'turn',
        //     frames: [ { key: 'player', frame: 0 } ],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNames('player', { start: 4, end: 7 }),
        //     frameRate: 8,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNames('player', { start: 8, end: 11 }),
        //     frameRate: 8,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'up',
        //     frames: this.anims.generateFrameNames('player', { start: 12, end: 15 }),
        //     frameRate: 8,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'down',
        //     frames: this.anims.generateFrameNames('player', { start: 16, end: 19 }),
        //     frameRate: 8,
        //     repeat: -1
        // });

        const anims = [
        { key: 'turn', start: 0, end: 0, frameRate: 20, repeat: 0 },
        { key: 'right', start: 4, end: 7, frameRate: 8, repeat: -1 },
        { key: 'left', start: 8, end: 11, frameRate: 8, repeat: -1 },
        { key: 'up', start: 12, end: 15, frameRate: 8, repeat: -1 },
        { key: 'down', start: 16, end: 19, frameRate: 8, repeat: -1 }
    ];

    anims.forEach(anim => {
        // For the 'turn' animation, use a single frame.
        if (anim.key === 'turn') {
            this.anims.create({
                key: anim.key,
                frames: [{ key: 'player', frame: anim.start }],
                frameRate: anim.frameRate,
                repeat: anim.repeat
            });
        } else {
            // For all other animations, generate the frame range.
            this.anims.create({
                key: anim.key,
                frames: this.anims.generateFrameNumbers('player', { start: anim.start, end: anim.end }),
                frameRate: anim.frameRate,
                repeat: anim.repeat
            });
        }
    });
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

        this.add.text(512, 350, 'Wala pa dawg lakaw-lakaw sa ara', {
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
        var speed = 5;
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