import Phaser from "phaser";

class TitleScreen extends Phaser.Scene {
    preload() {

    }
    create() {
        this.text = this.add.text(400, 200, "Patintero Legacy", { fontSize: "3rem", fontStyle: "bold" })
        this.text.setOrigin(0.5, 0.5)

        this.startBtn = this.add.text(400, 350, "PRESS ENTER TO START", { fontSize: "1.5rem", fontStyle: "bold" })
        this.startBtn.setOrigin(0.5, 0.5)

        this.enterKey = this.input.keyboard.addKey('ENTER')
    }
    update() {
        if (this.enterKey.isDown) {
            this.startBtn.setText('Wala pa bitaw nahuman')
            this.startBtn.setFill('#ff0000')
            console.log('Enter key pressed')
        }
    }
}

export default TitleScreen