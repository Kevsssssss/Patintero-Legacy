import Phaser from "phaser";

class Game extends Phaser.Scene {
    preload() {

    }
    create() {
        // Map
        this.topHorizontalLine = this.add.rectangle(400, 100, 600, 5, 0xffffff, 1).setOrigin(0.5, 0.5)
        this.middleHorizontalLine = this.add.rectangle(400, 250, 600, 5, 0xffffff, 1).setOrigin(0.5, 0.5)
        this.bottomHorizontalLine = this.add.rectangle(400, 400, 600, 5, 0xffffff, 1).setOrigin(0.5, 0.5)
        this.firstVerticalLine = this.add.rectangle(100, 250, 5, 300, 0xffffff, 1).setOrigin(0.5, 0.5)
        this.secondVerticalLine = this.add.rectangle(300, 250, 5, 300, 0xffffff, 1).setOrigin(0.5 ,0.5)
        this.thirdVerticalLine = this.add.rectangle(500, 250, 5, 300, 0xffffff, 1).setOrigin(0.5, 0.5)
        this.fourthVerticalLine = this.add.rectangle(700, 250, 5, 300, 0xffffff, 1).setOrigin(0.5, 0.5)

        // Players
        this.player1 = this.physics.add.existing(
            this.add.circle(100, 150, 20, 0xff0000, 1).setOrigin(0.5, 0.5)
        )
        this.player2 = this.physics.add.existing(
            this.add.circle(100, 200, 20, 0xff5050, 0).setOrigin(0.5, 0.5)
        )
        this.player3 = this.physics.add.existing(
            this.add.circle(300, 250, 20, 0x00ff00, 1).setOrigin(0.5, 0.5)
        )
        this.player4 = this.physics.add.existing(
            this.add.circle(500, 250, 20, 0x50ff50, 1).setOrigin(0.5, 0.5)
        )
        // WASD Keyboard Controllers
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        })
        // IJKL Keyboard Controllers
        this.ijkl = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.I,
            down: Phaser.Input.Keyboard.KeyCodes.K,
            left: Phaser.Input.Keyboard.KeyCodes.J,
            right: Phaser.Input.Keyboard.KeyCodes.L
        })
        // Arrow Keyboard Controllers
        this.arrowKeys = this.input.keyboard.createCursorKeys()
        // Numpad Keyboard Controllers (configuring)
        this.numKeys = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.NUMPAD_ADD,
            down: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE,
            left: Phaser.Input.Keyboard.KeyCodes.NUMPAD_FOUR,
            right: Phaser.Input.Keyboard.KeyCodes.NUMPAD_SIX
        })

    }
    update() {
        const speed = 5

        // Player1 Controls
        if (this.wasd.up.isDown) {
            this.player1.y -= speed
        }
        if (this.wasd.down.isDown) {
            this.player1.y += speed
        }
        if (this.wasd.left.isDown) {
            this.player1.x -= speed
        }
        if (this.wasd.right.isDown) {
            this.player1.x += speed
        }
        // Player2 Controls
        if (this.ijkl.up.isDown) {
            this.player2.y -= speed
        }
        if (this.ijkl.down.isDown) {
            this.player2.y += speed
        }
        if (this.ijkl.left.isDown) {
            this.player2.x -= speed
        }
        if (this.ijkl.right.isDown) {
            this.player2.x += speed
        }
        // Player 3 Controls
        // if (this.arrowKeys.up.isDown) {
        //     this.player3.y -= speed
        // }
        // if (this.arrowKeys.down.isDown) {
        //     this.player3.y += speed
        // }
        // if (this.arrowKeys.left.isDown) {
        //     this.player3.x -= speed
        // }
        // if (this.arrowKeys.right.isDown) {
        //     this.player3.x += speed
        // }
        // Player 4 Controls (Configuring)

        // AI Player
        const aiSpeed = 2
        // Player 3
        if (this.player3.y < this.player1.y) {
            this.player3.y += aiSpeed
        }
        if (this.player3.y > this.player1.y) {
            this.player3.y -= aiSpeed
        }
        // Player 4
        if (this.player4.y < this.player1.y) {
            this.player4.y += aiSpeed
        }
        if (this.player4.y > this.player1.y) {
            this.player4.y -= aiSpeed
        }
        // Team 1 Player Positions
        this.player1Position = this.player1.x * this.player1.y
        this.player2Position = this.player2.x * this.player2.y  
        // Team 2 Player Positions
        this.player3Position = this.player3.x * this.player3.y
        this.player4Position = this.player4.x * this.player4.y

        // Player Hitboxes
        const halfPlayerHeight = 20 / 2
        const halfPlayerWidth = 20 / 2

        if (
            ((this.player1Position == this.player3Position) || (this.player1Position == this.player4Position)) || 
            ((this.player2Position == this.player3Position) || (this.player2Position == this.player4Position))
        ) {
            this.resetPlayers()
        }
    }
    resetPlayers() {
        this.player1.x = 100
        this.player1.y = 150

        this.player2.x = 100
        this.player2.y = 200
    }
}

export default Game