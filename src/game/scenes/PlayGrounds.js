import { Scene } from "phaser";

export class PlayGrounds extends Scene {
    constructor() {
        super('PlayGrounds');
    }

    create() {
        // ----------------------------------------------------
        // NEW: Game State and Countdown Text Initialization
        // ----------------------------------------------------
        this.gameStarted = false; // Flag to control all game logic (movement, bots, collisions)

        this.countdownText = this.add.text(1024 / 2, 768 / 2, '3', {
            fontFamily: '"Press Start 2P"', 
            fontSize: 100, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 15,
            align: 'center'
        }).setOrigin(0.5).setDepth(2000).setVisible(true); // High depth to be on top

        this.startCountdown();
        // ----------------------------------------------------

        // this.physics.world.createDebugGraphic();

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

        // Score display at bottom left
        this.scoreText = this.add.text(200, 720, 'Score: 0', {
            fontFamily: '"Press Start 2P"', fontSize: 35, color: '#ffffff',
            stroke: '#000000', strokeThickness: 9,
            align: 'left'
        }).setOrigin(0.5).setDepth(1000);

        // Crossed status display at bottom right
        this.crossedText = this.add.text(900, 720, 'Crossed: None', {
            fontFamily: '"Press Start 2P"', fontSize: 15, color: '#ffffff',
            stroke: '#000000', strokeThickness: 7,
            align: 'right'
        }).setOrigin(0.5).setDepth(1000);

        // Initialize scoring system
        this.score = 0;
        this.player1Crossed = false; // Track if player1 has crossed to safe zone
        this.player2Crossed = false; // Track if player2 has crossed to safe zone

        // Add background image
        this.add.image(512, 384, 'playGoundsBg').setOrigin(0.5, 0.5).setScale(4);

        this.cameras.main.setBackgroundColor(0x874e3b);

        // Patintero Lines (visible and invisible)
        this.lineGroup = this.physics.add.staticGroup();

        this.topLine = this.add.rectangle((1024 / 2), ((768 / 2) / 2), 700, 5, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.midLine = this.add.rectangle((1024 / 2), (768 / 2), 700, 5, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.botLine = this.add.rectangle((1024 / 2), ((768 / 2) * 1.5), 700, 5, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.firstLine = this.add.rectangle(((1024 / 2) - 350), (768 / 2), 5, 385, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.secondLine = this.add.rectangle(((1024 / 2) - (350 / 3)), (768 / 2), 5, 385, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.thirdLine = this.add.rectangle(((1024 / 2) + (350 / 3)), (768 / 2), 5, 385, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.fourthLine = this.add.rectangle(((1024 / 2) + 350), (768 / 2), 5, 385, 0xffffff, 0).setOrigin(0.5, 0.5);
        this.topLineExtended = this.add.rectangle((1024 / 2), ((768 / 2) / 2), 1024, 5, 0xff0000, 0).setOrigin(0.5, 0.5);
        this.botLineExtended = this.add.rectangle((1024 / 2), ((768 / 2) * 1.5), 1024, 5, 0xff0000, 0).setOrigin(0.5, 0.5);

        this.physics.add.existing(this.topLine, true);
        this.physics.add.existing(this.midLine, true);
        this.physics.add.existing(this.botLine, true);
        this.physics.add.existing(this.firstLine, true);
        this.physics.add.existing(this.secondLine, true);
        this.physics.add.existing(this.thirdLine, true);
        this.physics.add.existing(this.fourthLine, true);
        this.physics.add.existing(this.topLineExtended, true);
        this.physics.add.existing(this.botLineExtended, true);

        this.lineGroup.addMultiple([
            this.topLineExtended,
            this.botLineExtended
            // DO NOT ADD ANOTHER LINES
        ]);

        // Player Sprites
        this.player1 = this.physics.add.sprite((1024 / 2) - 470, (768 / 2) - 100, 'player1').setCollideWorldBounds(true).setScale(1.5);
        this.player2 = this.physics.add.sprite((1024 / 2) - 470, (768 / 2) + 25, 'player2').setCollideWorldBounds(true).setScale(1.5);

        // Store starting positions for easy reset
        this.player1StartX = (1024 / 2) - 470;
        this.player1StartY = (768 / 2) - 100;
        this.player2StartX = (1024 / 2) - 470;
        this.player2StartY = (768 / 2) + 25;

        // Bot Sprites - Create moving bots as dynamic sprites, now including bot3
        // Important: Do NOT set collideWorldBounds for bots so they can move freely
        this.bot1 = this.physics.add.sprite(((1024 / 2) - (350 - 5)), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot2 = this.physics.add.sprite(((1024 / 2) - (350 / 3) - 5), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot3 = this.physics.add.sprite((1024 / 2), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot4 = this.physics.add.sprite(((1024 / 2) + (350 / 3)), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot5 = this.physics.add.sprite(((1024 / 2) + 350), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);

        // Create a group for all bots (mixing dynamic and static)
        this.allBots = [this.bot1, this.bot2, this.bot3, this.bot4, this.bot5];

        // Play the 'turn' animation for each bot to show the first frame
        this.allBots.forEach(bot => {
            bot.anims.play('bot-turn');
        });

        // Resize and offset hitboxes for players
        this.player1.body.setSize(35, 20).setOffset(10, 80);
        this.player2.body.setSize(35, 20).setOffset(10, 80);

        // Resize and offset hitboxes for all bots
        this.allBots.forEach(bot => {
            bot.body.setSize(35, 20).setOffset(10, 80);
        });

        // Colliders - Only players collide with boundary lines, bots can move freely
        this.physics.add.collider(this.player1, this.lineGroup);
        this.physics.add.collider(this.player2, this.lineGroup);
        
        // Individual colliders for each bot to ensure collision detection works properly
        // Note: Bots do NOT collide with lineGroup so they can move to the very edges
        this.physics.add.collider(this.player1, this.bot1, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player1, this.bot2, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player1, this.bot3, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player1, this.bot4, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player1, this.bot5, this.handleBotCollision, null, this);
        
        this.physics.add.collider(this.player2, this.bot1, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player2, this.bot2, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player2, this.bot3, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player2, this.bot4, this.handleBotCollision, null, this);
        this.physics.add.collider(this.player2, this.bot5, this.handleBotCollision, null, this);

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
    
    // ----------------------------------------------------
    // NEW: Countdown Logic Method
    // ----------------------------------------------------
    startCountdown() {
        let count = 3;
        
        // Timer event to handle the countdown
        this.countdownTimer = this.time.addEvent({
            delay: 1000, // 1000 milliseconds = 1 second
            callback: () => {
                count--;

                if (count > 0) {
                    this.countdownText.setText(count.toString());
                } else if (count === 0) {
                    this.countdownText.setText('GO!');
                } else {
                    // Countdown is over, start the game
                    this.gameStarted = true;
                    this.countdownText.setVisible(false);
                    this.countdownTimer.remove(); // Stop the timer
                }
            },
            callbackScope: this,
            loop: true
        });
    }
    // ----------------------------------------------------

    update() {
        // ----------------------------------------------------
        // NEW: Check if the game has started before running logic
        // ----------------------------------------------------
        if (!this.gameStarted) {
            this.player1.setVelocity(0);
            this.player2.setVelocity(0);
            // Ensure bots are also stationary during the countdown
            this.allBots.forEach(bot => bot.anims.play('bot-turn'));
            return; 
        }
        // ----------------------------------------------------

        const playerSpeed = 200;
        const botSpeed = 50;

        // --------------------
        // Player 1 Movement (WASD) - Diagonal Movement Enabled with Specific Animation Logic
        // --------------------
        this.player1.setVelocity(0);
        
        let velX1 = 0;
        let velY1 = 0;
        let isMoving1 = false;
        let currentAnim1 = 'player1-turn'; // Default animation if no movement

        if (this.wasd.up.isDown) {
            velY1 = -playerSpeed;
            currentAnim1 = 'player1-up';
            isMoving1 = true;
        } else if (this.wasd.down.isDown) {
            velY1 = playerSpeed;
            currentAnim1 = 'player1-down';
            isMoving1 = true;
        }

        if (this.wasd.left.isDown) {
            velX1 = -playerSpeed;
            // If already moving up/down, keep vertical animation. Otherwise, use left.
            if (!isMoving1) { 
                currentAnim1 = 'player1-left';
            }
            isMoving1 = true;
        } else if (this.wasd.right.isDown) {
            velX1 = playerSpeed;
            // If already moving up/down, keep vertical animation. Otherwise, use right.
            if (!isMoving1) {
                currentAnim1 = 'player1-right';
            }
            isMoving1 = true;
        }

        // Diagonal Speed Normalization (prevents faster diagonal movement)
        if (velX1 !== 0 && velY1 !== 0) {
            const diagonalFactor = 0.7071; // 1 / Math.sqrt(2)
            velX1 *= diagonalFactor;
            velY1 *= diagonalFactor;
        }

        this.player1.setVelocity(velX1, velY1);
        this.player1.anims.play(currentAnim1, true);

        // --------------------
        // Player 2 Movement (Cursors) - Diagonal Movement Enabled with Specific Animation Logic
        // --------------------
        this.player2.setVelocity(0);

        let velX2 = 0;
        let velY2 = 0;
        let isMoving2 = false;
        let currentAnim2 = 'player2-turn'; // Default animation if no movement

        if (this.cursors.up.isDown) {
            velY2 = -playerSpeed;
            currentAnim2 = 'player2-up';
            isMoving2 = true;
        } else if (this.cursors.down.isDown) {
            velY2 = playerSpeed;
            currentAnim2 = 'player2-down';
            isMoving2 = true;
        }

        if (this.cursors.left.isDown) {
            velX2 = -playerSpeed;
            // If already moving up/down, keep vertical animation. Otherwise, use left.
            if (!isMoving2) {
                currentAnim2 = 'player2-left';
            }
            isMoving2 = true;
        } else if (this.cursors.right.isDown) {
            velX2 = playerSpeed;
            // If already moving up/down, keep vertical animation. Otherwise, use right.
            if (!isMoving2) {
                currentAnim2 = 'player2-right';
            }
            isMoving2 = true;
        }
        
        // Diagonal Speed Normalization (prevents faster diagonal movement)
        if (velX2 !== 0 && velY2 !== 0) {
            const diagonalFactor = 0.7071; // 1 / Math.sqrt(2)
            velX2 *= diagonalFactor;
            velY2 *= diagonalFactor;
        }

        this.player2.setVelocity(velX2, velY2);
        this.player2.anims.play(currentAnim2, true);

        // Set player depths
        this.player1.setDepth(this.player1.y);
        this.player2.setDepth(this.player2.y);

        // Set bot depths
        this.allBots.forEach(bot => {
            bot.setDepth(bot.y);
        });

        // Bot movement logic for bots 1, 2, 4, and 5 (vertical tracking behavior)
        const verticalTrackingBots = [this.bot1, this.bot2, this.bot4, this.bot5];
        
        verticalTrackingBots.forEach(bot => {
            const distanceToPlayer1 = Phaser.Math.Distance.Between(bot.x, bot.y, this.player1.x, this.player1.y);
            const distanceToPlayer2 = Phaser.Math.Distance.Between(bot.x, bot.y, this.player2.x, this.player2.y);
            const nearestPlayer = (distanceToPlayer1 < distanceToPlayer2) ? this.player1 : this.player2;
            const targetY = nearestPlayer.y;
            const deltaY = targetY - bot.y;

            if (Math.abs(deltaY) > 5) {
                const directionY = (deltaY > 0) ? 1 : -1;
                bot.y += directionY * botSpeed * this.game.loop.delta / 1000;
                
                if (directionY > 0) {
                    bot.anims.play('bot-down', true);
                } else {
                    bot.anims.play('bot-up', true);
                }
            } else {
                bot.anims.play('bot-turn', true);
            }

            // Much more generous movement boundaries - allow bots to go well beyond the lines
            const topLineY = ((768 / 2) / 2); // 192
            const botLineY = ((768 / 2) * 1.5); // 576
            const minY = topLineY - 50; // Allow 50 pixels above top line
            const maxY = botLineY + 50; // Allow 50 pixels below bottom line
            bot.y = Phaser.Math.Clamp(bot.y, minY, maxY);
            
            // Update the physics body to match the new sprite position
            bot.body.updateFromGameObject();
        });

        // Bot3 horizontal movement logic - tracks nearest player horizontally along midLine
        const bot3 = this.bot3;
        const distanceToPlayer1Bot3 = Phaser.Math.Distance.Between(bot3.x, bot3.y, this.player1.x, this.player1.y);
        const distanceToPlayer2Bot3 = Phaser.Math.Distance.Between(bot3.x, bot3.y, this.player2.x, this.player2.y);
        const nearestPlayerBot3 = (distanceToPlayer1Bot3 < distanceToPlayer2Bot3) ? this.player1 : this.player2;
        const targetX = nearestPlayerBot3.x;
        const deltaX = targetX - bot3.x;

        // Define bot3 movement boundaries
        const leftBoundary = ((1024 / 2) - 350) + 15;
        const rightBoundary = ((1024 / 2) + 350) - 15;

        // Only move if there's significant distance to target
        if (Math.abs(deltaX) > 5) {
            const directionX = (deltaX > 0) ? 1 : -1;
            const newX = bot3.x + (directionX * botSpeed * this.game.loop.delta / 1000);
            
            // Check if the new position would be within boundaries
            if (newX >= leftBoundary && newX <= rightBoundary) {
                bot3.x = newX;
                
                if (directionX > 0) {
                    bot3.anims.play('bot-right', true);
                } else {
                    bot3.anims.play('bot-left', true);
                }
            } else {
                // At boundary but still want to track - show idle animation
                bot3.anims.play('bot-turn', true);
            }
        } else {
            // Close to target - show idle animation
            bot3.anims.play('bot-turn', true);
        }

        // Ensure bot3 stays within boundaries (safety clamp)
        bot3.x = Phaser.Math.Clamp(bot3.x, leftBoundary, rightBoundary);
        
        // Update bot3 physics body
        bot3.body.updateFromGameObject();

        // Scoring system - Check player positions for crossing zones
        this.checkCrossingZones();
    }

    checkCrossingZones() {
        // Define zone boundaries based on the vertical lines
        const firstLineX = ((1024 / 2) - 350); // firstLine position (scoring line)
        const fourthLineX = ((1024 / 2) + 350); // fourthLine position (checkpoint line)
        
        // Check Player 1 crossing
        if (this.player1.x > fourthLineX && !this.player1Crossed) {
            // Player1 crossed fourthLine - set checkpoint
            this.player1Crossed = true;
            this.updateCrossedDisplay();
            console.log('Player 1 crossed fourthLine! Checkpoint set.');
        } else if (this.player1.x < firstLineX && this.player1Crossed) {
            // Player1 crossed firstLine ONLY IF they have the checkpoint from fourthLine
            this.score += 10;
            this.player1Crossed = false; // Reset checkpoint for next round
            this.updateScoreDisplay();
            this.updateCrossedDisplay();
            console.log('Player 1 crossed firstLine with checkpoint! +10 points (Total: ' + this.score + ')');
        }
        
        // Check Player 2 crossing
        if (this.player2.x > fourthLineX && !this.player2Crossed) {
            // Player2 crossed fourthLine - set checkpoint
            this.player2Crossed = true;
            this.updateCrossedDisplay();
            console.log('Player 2 crossed fourthLine! Checkpoint set.');
        } else if (this.player2.x < firstLineX && this.player2Crossed) {
            // Player2 crossed firstLine ONLY IF they have the checkpoint from fourthLine
            this.score += 10;
            this.player2Crossed = false; // Reset checkpoint for next round
            this.updateScoreDisplay();
            this.updateCrossedDisplay();
            console.log('Player 2 crossed firstLine with checkpoint! +10 points (Total: ' + this.score + ')');
        }
    }

    updateScoreDisplay() {
        this.scoreText.setText('Score: ' + this.score);
    }

    updateCrossedDisplay() {
        let crossedStatus = 'Crossed: ';
        
        if (this.player1Crossed && this.player2Crossed) {
            crossedStatus += 'P1, P2';
        } else if (this.player1Crossed) {
            crossedStatus += 'P1';
        } else if (this.player2Crossed) {
            crossedStatus += 'P2';
        } else {
            crossedStatus += 'None';
        }
        
        this.crossedText.setText(crossedStatus);
    }

    handleBotCollision(player, bot) {
        // Prevent collision logic from running before the game officially starts
        if (!this.gameStarted) return; 

        console.log('Collision detected!', player.texture.key, 'hit', bot.texture.key);
        
        // Stop the player immediately
        player.setVelocity(0);

        // Cancel crossed status when player gets caught
        if (player === this.player1) {
            this.player1.x = this.player1StartX;
            this.player1.y = this.player1StartY;
            // Cancel player1's checkpoint
            if (this.player1Crossed) {
                this.player1Crossed = false;
                this.updateCrossedDisplay();
                console.log('Player 1 caught! Checkpoint cancelled.');
            }
        } else if (player === this.player2) {
            this.player2.x = this.player2StartX;
            this.player2.y = this.player2StartY;
            // Cancel player2's checkpoint
            if (this.player2Crossed) {
                this.player2Crossed = false;
                this.updateCrossedDisplay();
                console.log('Player 2 caught! Checkpoint cancelled.');
            }
        }
        
        // Optional: Add a brief pause or visual effect to make the collision more noticeable
    }
}