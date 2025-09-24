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
        
        // Patintero Lines (visible and invisible)
        this.lineGroup = this.physics.add.staticGroup();

        this.topLine = this.add.rectangle((1024 / 2), ((768 / 2) / 2), 700, 5, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.midLine = this.add.rectangle((1024 / 2), (768 / 2), 700, 5, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.botLine = this.add.rectangle((1024 / 2), ((768 / 2) * 1.5), 700, 5, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.firstLine = this.add.rectangle(((1024 / 2) - 350), (768 / 2), 5, 385, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.secondLine = this.add.rectangle(((1024 / 2) - (350 / 3)), (768 / 2), 5, 385, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.thirdLine = this.add.rectangle(((1024 / 2) + (350 / 3)), (768 / 2), 5, 385, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.fourthLine = this.add.rectangle(((1024 / 2) + 350), (768 / 2), 5, 385, 0xffffff, 1).setOrigin(0.5, 0.5);
        this.topLineExtended = this.add.rectangle((1024 / 2), ((768 / 2) / 2), 1024, 5, 0xff0000, 0.5).setOrigin(0.5, 0.5);
        this.botLineExtended = this.add.rectangle((1024 / 2), ((768 / 2) * 1.5), 1024, 5, 0xff0000, 0.5).setOrigin(0.5, 0.5);

        this.lineGroup.addMultiple([
            this.topLineExtended,
            this.botLineExtended
        ]);

        // Player Sprites
        this.player1 = this.physics.add.sprite((1024 / 2) - 470, (768 / 2) - 100, 'player1').setCollideWorldBounds(true).setScale(1.5);
        this.player2 = this.physics.add.sprite((1024 / 2) - 470, (768 / 2) + 25, 'player2').setCollideWorldBounds(true).setScale(1.5);
        
        // Bot Sprites - Create sprites first, then add to the group
        this.botGroup = this.physics.add.staticGroup();

        const bot1 = this.physics.add.staticSprite(((1024 / 2) - (350 - 5)), (768 / 2) - 70, 'bot').setScale(1.5);
        const bot2 = this.physics.add.staticSprite(((1024 / 2) - (350 / 3) - 5), (768 / 2) - 70, 'bot').setScale(1.5);
        const bot3 = this.physics.add.staticSprite((1024 / 2), (768 / 2) - 70, 'bot').setScale(1.5);
        const bot4 = this.physics.add.staticSprite(((1024 / 2) + (350 / 3)), (768 / 2) - 70, 'bot').setScale(1.5);
        const bot5 = this.physics.add.staticSprite(((1024 / 2) + 350), (768 / 2) - 70, 'bot').setScale(1.5);

        this.botGroup.addMultiple([bot1, bot2, bot3, bot4, bot5]);

        // Play the 'turn' animation for each bot to show the first frame
        this.botGroup.getChildren().forEach(bot => {
            bot.anims.play('bot-turn');
        });

        // Resize and offset hitboxes for players
        this.player1.body.setSize(35, 20).setOffset(17.5, 100);
        this.player2.body.setSize(35, 20).setOffset(17.5, 100);

        // Resize and offset hitboxes for bots to be slightly bigger
        this.botGroup.getChildren().forEach(bot => {
            bot.body.setSize(45, 30).setOffset(12.5, 100); // Adjusted Y offset for a lower hitbox
        });

        // Colliders
        this.physics.add.collider(this.player1, this.lineGroup);
        this.physics.add.collider(this.player2, this.lineGroup);

        this.physics.add.collider(this.player1, this.botGroup, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player2, this.botGroup, this.handleBotCollision, null, this);
        
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

        var speed = 200;

        // Player 1 Movement (WASD)
        let moveX1 = 0;
        let moveY1 = 0;
        if (this.wasd.up.isDown) moveY1 = -1;
        if (this.wasd.down.isDown) moveY1 = 1;
        if (this.wasd.left.isDown) moveX1 = -1;
        if (this.wasd.right.isDown) moveX1 = 1;

        if (moveX1 !== 0 || moveY1 !== 0) {
            const length = Math.sqrt(moveX1 * moveX1 + moveY1 * moveY1);
            this.player1.setVelocityX((moveX1 / length) * speed);
            this.player1.setVelocityY((moveY1 / length) * speed);
            this.player1.body.setImmovable(false);

            if (moveY1 < 0) {
                this.player1.anims.play('player1-up', true);
            } else if (moveY1 > 0) {
                this.player1.anims.play('player1-down', true);
            } else if (moveX1 < 0) {
                this.player1.anims.play('player1-left', true);
            } else if (moveX1 > 0) {
                this.player1.anims.play('player1-right', true);
            }
        } else {
            this.player1.setVelocity(0);
            this.player1.body.setImmovable(true);
            this.player1.anims.play('player1-turn', true);
        }

        // Player 2 Movement (⬆️⬇️⬅️➡️)
        let moveX2 = 0;
        let moveY2 = 0;
        if (this.cursors.up.isDown) moveY2 = -1;
        if (this.cursors.down.isDown) moveY2 = 1;
        if (this.cursors.left.isDown) moveX2 = -1;
        if (this.cursors.right.isDown) moveX2 = 1;
        
        if (moveX2 !== 0 || moveY2 !== 0) {
            const length = Math.sqrt(moveX2 * moveX2 + moveY2 * moveY2);
            this.player2.setVelocityX((moveX2 / length) * speed);
            this.player2.setVelocityY((moveY2 / length) * speed);
            this.player2.body.setImmovable(false);

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
            this.player2.setVelocity(0);
            this.player2.body.setImmovable(true);
            this.player2.anims.play('player2-turn', true);
        }

        // Set player depths
        this.player1.setDepth(this.player1.y);
        this.player2.setDepth(this.player2.y);
        
        // Set bot depths
        this.botGroup.getChildren().forEach(bot => {
            bot.setDepth(bot.y);
        });
    }

    handleBotCollision(player, bot) {
        player.setVelocity(0);

        if (player === this.player1) {
            this.player1.x = (1024 / 2) - 470;
            this.player1.y = (768 / 2) - 100;
        } else if (player === this.player2) {
            this.player2.x = (1024 / 2) - 470;
            this.player2.y = (768 / 2) + 25;
        }
    }
}