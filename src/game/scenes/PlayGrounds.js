import { Scene } from "phaser";

export class PlayGrounds extends Scene {
    // Reference for the game music
    gameMusic = null; 
    // Reference for the game over music
    gameOverMusic = null;

    constructor() {
        super('PlayGrounds');
        
        // References for UI elements and game objects
        this.lifeText1 = null; 
        this.lifeText2 = null; 
        this.player1Hearts = [];
        this.player2Hearts = [];
        this.gameOverScreen = null;
    }

    create() {
        // Stop any current music (like MainMenu music)
        this.sound.stopAll();

        // Start the gameplay music loop
        if (!this.gameMusic || !this.gameMusic.isPlaying) {
            this.gameMusic = this.sound.add('gamePlayMusic', { loop: true, volume: 0.4 }); // Adjust volume as needed
            // The music will be played AFTER the countdown finishes
        }

        // --- CRITICAL: FULL GAME STATE RESET ---
        // Ensures the game starts fresh every time the scene loads.
        this.gameStarted = false; 
        this.score = 0;
        this.player1Crossed = false; 
        this.player2Crossed = false; 
        this.player1Lives = 5;
        this.player2Lives = 5; 
        this.gameOverScreen = null; 
        this.player1Hearts = [];
        this.player2Hearts = [];

        // Game State and Countdown Text Initialization
        this.countdownText = this.add.text(1024 / 2, 768 / 2, '3', {
            fontFamily: '"Press Start 2P"', 
            fontSize: 100, 
            color: '#ffffff',
            stroke: '#000000', 
            strokeThickness: 15,
            align: 'center'
        }).setOrigin(0.5).setDepth(2000).setVisible(true);

        this.startCountdown(); // This will now play the audio

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
            // Stop game music when returning to main menu
            if (this.gameMusic) {
                this.gameMusic.stop();
            }
            // Stop game over music if it's somehow playing
            if (this.gameOverMusic) {
                 this.gameOverMusic.stop();
            }
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
        
        // --- Player Text and Scaled Heart Life Display Setup ---
        const textStartX = 20;
        const heartStartX = 200; 
        const heartY1 = 100;
        const heartY2 = 140;
        const heartScale = 4.0; 
        const heartSpacing = 40;

        // Player 1 Text
        this.lifeText1 = this.add.text(textStartX, heartY1, 'Player 1:', {
            fontFamily: '"Press Start 2P"', fontSize: 18, color: '#ffffffff',
            stroke: '#000000', strokeThickness: 6,
        }).setDepth(1000).setOrigin(0, 0.5); 

        // Player 1 Hearts
        for (let i = 0; i < this.player1Lives; i++) {
            let heart = this.add.image(heartStartX + i * heartSpacing, heartY1, 'heart')
                .setOrigin(0, 0.5)
                .setScale(heartScale)
                .setDepth(1000);
            this.player1Hearts.push(heart);
        }

        // Player 2 Text
        this.lifeText2 = this.add.text(textStartX, heartY2, 'Player 2:', {
            fontFamily: '"Press Start 2P"', fontSize: 18, color: '#00ffff',
            stroke: '#000000', strokeThickness: 6,
        }).setDepth(1000).setOrigin(0, 0.5);

        // Player 2 Hearts
        for (let i = 0; i < this.player2Lives; i++) {
            let heart = this.add.image(heartStartX + i * heartSpacing, heartY2, 'heart')
                .setOrigin(0, 0.5)
                .setScale(heartScale)
                .setDepth(1000);
            this.player2Hearts.push(heart);
        }
        
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

        // Bot Sprites
        this.bot1 = this.physics.add.sprite(((1024 / 2) - (350 - 5)), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot2 = this.physics.add.sprite(((1024 / 2) - (350 / 3) - 5), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot3 = this.physics.add.sprite((1024 / 2), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot4 = this.physics.add.sprite(((1024 / 2) + (350 / 3)), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);
        this.bot5 = this.physics.add.sprite(((1024 / 2) + 350), (768 / 2) - 70, 'bot').setScale(1.5).setImmovable(true);

        this.allBots = [this.bot1, this.bot2, this.bot3, this.bot4, this.bot5];

        this.allBots.forEach(bot => {
            bot.anims.play('bot-turn');
        });

        // Resize and offset hitboxes
        this.player1.body.setSize(35, 20).setOffset(10, 80);
        this.player2.body.setSize(35, 20).setOffset(10, 80);
        this.allBots.forEach(bot => {
            bot.body.setSize(35, 20).setOffset(10, 80);
        });

        // Colliders (Player/Line Collisions)
        this.physics.add.collider(this.player1, this.lineGroup);
        this.physics.add.collider(this.player2, this.lineGroup);
        
        // Colliders (Player/Bot Collisions)
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
    
    startCountdown() {
        let count = 3;
        
        // Play the counter audio once
        this.sound.play('counter', { volume: 0.7 });

        this.countdownTimer = this.time.addEvent({
            delay: 1000, 
            callback: () => {
                count--;

                if (count > 0) {
                    this.countdownText.setText(count.toString());
                } else if (count === 0) {
                    this.countdownText.setText('GO!');
                    // Start the gameplay music
                    if (this.gameMusic) {
                        this.gameMusic.play();
                    }
                } else {
                    this.gameStarted = true;
                    this.countdownText.setVisible(false);
                    this.countdownTimer.remove();
                }
            },
            callbackScope: this,
            loop: true
        });
    }

    update() {
        // --- Game State Check ---
        if (!this.gameStarted) {
            this.player1.setVelocity(0);
            this.player2.setVelocity(0);
            // Bots should retain their 'turn' state until game start
            this.allBots.forEach(bot => bot.anims.play('bot-turn'));
            return; 
        }

        const playerSpeed = 200;
        const botSpeed = 50;

        // Player 1 Movement (WASD) 
        this.player1.setVelocity(0);
        let velX1 = 0;
        let velY1 = 0;
        let isMoving1 = false;
        let currentAnim1 = 'player1-turn'; 

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
            if (!isMoving1) { 
                currentAnim1 = 'player1-left';
            }
            isMoving1 = true;
        } else if (this.wasd.right.isDown) {
            velX1 = playerSpeed;
            if (!isMoving1) {
                currentAnim1 = 'player1-right';
            }
            isMoving1 = true;
        }

        if (velX1 !== 0 && velY1 !== 0) {
            const diagonalFactor = 0.7071; 
            velX1 *= diagonalFactor;
            velY1 *= diagonalFactor;
        }

        this.player1.setVelocity(velX1, velY1);
        this.player1.anims.play(currentAnim1, true);

        // Player 2 Movement (Cursors)
        this.player2.setVelocity(0);
        let velX2 = 0;
        let velY2 = 0;
        let isMoving2 = false;
        let currentAnim2 = 'player2-turn'; 

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
            if (!isMoving2) {
                currentAnim2 = 'player2-left';
            }
            isMoving2 = true;
        } else if (this.cursors.right.isDown) {
            velX2 = playerSpeed;
            if (!isMoving2) {
                currentAnim2 = 'player2-right';
            }
            isMoving2 = true;
        }
        
        if (velX2 !== 0 && velY2 !== 0) {
            const diagonalFactor = 0.7071;
            velX2 *= diagonalFactor;
            velY2 *= diagonalFactor;
        }

        this.player2.setVelocity(velX2, velY2);
        this.player2.anims.play(currentAnim2, true);

        // Set player depths
        this.player1.setDepth(this.player1.y);
        this.player2.setDepth(this.player2.y);
        
        // Set bot depths dynamically based on Y position (essential for 2.5D visual overlap)
        this.allBots.forEach(bot => {
            bot.setDepth(bot.y);
        });

        // Bot movement logic for vertical tracking bots
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

            const topLineY = ((768 / 2) / 2); // 192
            const botLineY = ((768 / 2) * 1.5); // 576
            const minY = topLineY - 50; 
            const maxY = botLineY + 50; 
            bot.y = Phaser.Math.Clamp(bot.y, minY, maxY);
            
            bot.body.updateFromGameObject();
        });

        // Bot3 horizontal movement logic
        const bot3 = this.bot3;
        const distanceToPlayer1Bot3 = Phaser.Math.Distance.Between(bot3.x, bot3.y, this.player1.x, this.player1.y);
        const distanceToPlayer2Bot3 = Phaser.Math.Distance.Between(bot3.x, bot3.y, this.player2.x, this.player2.y);
        const nearestPlayerBot3 = (distanceToPlayer1Bot3 < distanceToPlayer2Bot3) ? this.player1 : this.player2;
        const targetX = nearestPlayerBot3.x;
        const deltaX = targetX - bot3.x;

        const leftBoundary = ((1024 / 2) - 350) + 15;
        const rightBoundary = ((1024 / 2) + 350) - 15;

        if (Math.abs(deltaX) > 5) {
            const directionX = (deltaX > 0) ? 1 : -1;
            const newX = bot3.x + (directionX * botSpeed * this.game.loop.delta / 1000);
            
            if (newX >= leftBoundary && newX <= rightBoundary) {
                bot3.x = newX;
                
                if (directionX > 0) {
                    bot3.anims.play('bot-right', true);
                } else {
                    bot3.anims.play('bot-left', true);
                }
            } else {
                bot3.anims.play('bot-turn', true);
            }
        } else {
            bot3.anims.play('bot-turn', true);
        }

        bot3.x = Phaser.Math.Clamp(bot3.x, leftBoundary, rightBoundary);
        bot3.body.updateFromGameObject();

        // Scoring system - Check player positions for crossing zones
        this.checkCrossingZones();
    }

    checkCrossingZones() {
        const firstLineX = ((1024 / 2) - 350); 
        const fourthLineX = ((1024 / 2) + 350); 
        
        // Check Player 1 crossing
        if (this.player1.x > fourthLineX && !this.player1Crossed) {
            this.player1Crossed = true;
            this.updateCrossedDisplay();
        } else if (this.player1.x < firstLineX && this.player1Crossed) {
            this.score += 10;
            this.player1Crossed = false; 
            this.updateScoreDisplay();
            this.updateCrossedDisplay();
        }
        
        // Check Player 2 crossing
        if (this.player2.x > fourthLineX && !this.player2Crossed) {
            this.player2Crossed = true;
            this.updateCrossedDisplay();
        } else if (this.player2.x < firstLineX && this.player2Crossed) {
            this.score += 10;
            this.player2Crossed = false; 
            this.updateScoreDisplay();
            this.updateCrossedDisplay();
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
        if (!this.gameStarted) return; 

        player.setVelocity(0);

        if (player === this.player1) {
            // Decrease Life
            this.player1Lives -= 1;
            
            // Hide the last visible heart
            if (this.player1Lives >= 0 && this.player1Hearts[this.player1Lives]) {
                this.player1Hearts[this.player1Lives].setVisible(false);
            }

            // Reset position and checkpoint
            this.player1.x = this.player1StartX;
            this.player1.y = this.player1StartY;
            if (this.player1Crossed) {
                this.player1Crossed = false;
                this.updateCrossedDisplay();
            }
            
            // Check for Game Over
            if (this.player1Lives <= 0) {
                this.handleGameOver();
            }
        } else if (player === this.player2) {
            // Decrease Life
            this.player2Lives -= 1;
            
            // Hide the last visible heart
            if (this.player2Lives >= 0 && this.player2Hearts[this.player2Lives]) {
                this.player2Hearts[this.player2Lives].setVisible(false);
            }

            // Reset position and checkpoint
            this.player2.x = this.player2StartX;
            this.player2.y = this.player2StartY;
            if (this.player2Crossed) {
                this.player2Crossed = false;
                this.updateCrossedDisplay();
            }

            // Check for Game Over
            if (this.player2Lives <= 0) {
                this.handleGameOver();
            }
        }
    }

    // --- UPDATED Game Over Function with Retry and Main Menu Buttons ---
    handleGameOver() {
        if (!this.gameStarted || this.gameOverScreen) return; 
        
        this.gameStarted = false; 
        this.physics.pause(); 
        
        // Stop all animations
        this.allBots.forEach(bot => bot.anims.stop()); 
        this.player1.anims.stop();
        this.player2.anims.stop();
        this.player1.setFrame(0); 
        this.player2.setFrame(0);
        this.allBots.forEach(bot => bot.setFrame(0));

        // Stop the looping gameplay music
        if (this.gameMusic) {
            this.gameMusic.stop();
        }

        // Play the game over music once
        if (!this.gameOverMusic) {
            this.gameOverMusic = this.sound.add('gameOver', { loop: false, volume: 0.6 });
        }
        this.gameOverMusic.play();


        const totalScore = this.score;
        const screenWidth = 1024;
        const screenHeight = 768;

        this.gameOverScreen = this.add.container(screenWidth / 2, screenHeight / 2).setDepth(3000);
        
        // Full-screen Background Overlay
        const rect = this.add.rectangle(0, 0, screenWidth, screenHeight, 0x000000, 0.9).setOrigin(0.5);
        
        // Game Over Title
        const titleText = this.add.text(0, -150, 'GAME OVER!', {
            fontFamily: '"Press Start 2P"',
            fontSize: '50px',
            color: '#ff0000',
            align: 'center'
        }).setOrigin(0.5);

        // Final Score
        const scoreDisplay = this.add.text(0, -50, `FINAL SCORE: ${totalScore}`, {
            fontFamily: '"Press Start 2P"', fontSize: '30px', color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5);

        const createButton = (x, y, text) => {
            const button = this.add.text(x, y, text, {
                fontFamily: '"Press Start 2P"', fontSize: '25px', color: '#00ff00',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            }).setOrigin(0.5).setInteractive();

            // Hover effects
            button.on('pointerover', () => {
                this.game.canvas.style.cursor = 'pointer';
                button.setScale(1.1);
            });
            button.on('pointerout', () => {
                this.game.canvas.style.cursor = 'default';
                button.setScale(1);
            });

            return button;
        };
        
        // Retry Button
        const retryButton = createButton(0, 100, 'RETRY');
        retryButton.on('pointerup', () => {
            if (this.gameOverMusic) {
                this.gameOverMusic.stop();
            }
            this.scene.start('PlayGrounds'); 
        });

        // Main Menu Button
        const mainMenuButton = createButton(0, 200, 'MAIN MENU');
        mainMenuButton.on('pointerup', () => {
            if (this.gameOverMusic) {
                this.gameOverMusic.stop();
            }
            this.scene.start('MainMenu'); 
        });

        this.gameOverScreen.add([rect, titleText, scoreDisplay, retryButton, mainMenuButton]);
    }
}