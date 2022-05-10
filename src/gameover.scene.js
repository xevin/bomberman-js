import { UI_COLOR } from "./constants"
import { blinkText } from "./utils"
export class GameOverScene extends Phaser.Scene {

    darkDisplay = null
    pressAnyKeyText = null
    points = 300
    blinkTimer = 0

    constructor() {
        super("GameOverScene")
    }

    preload() {

    }

    create() {
       let gameOverText = this.add.text(0, 180, "Конец игры", {
            fontSize: 30,
            fontFamily: "monospace",
            color: UI_COLOR.inactiveMenuItem
        }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)

        gameOverText.setX((480 - gameOverText.width) / 2)

        let pointsText = this.add.text(0, 240, `Всего очков: ${this.points}`, {
            fontSize: 16,
            align: "center",
            fontFamily: "monospace",
            color: UI_COLOR.normalText
        }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)

        pointsText.setX((480 - pointsText.width) / 2)

        this.pressAnyKeyText = this.add.text(0, 420, "Нажми любую кнопку", {
            fontSize: 20,
            fontFamily: "monospace",
            align: "center",
            color: UI_COLOR.activeMenuItem
        }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)

        this.pressAnyKeyText.isBlinked = false

        this.pressAnyKeyText.setX((480 - this.pressAnyKeyText.width) / 2)

        this.input.keyboard.on("keydown", () => {
            this.scene.start("MenuScene")
        })
    }

    update(time, delta) {
      if (this.blinkTimer < 400) {
        this.blinkTimer += delta
      }
        else {
          this.blinkTimer = 0
          this.pressAnyKeyText.isBlinked = blinkText(this.pressAnyKeyText, this.pressAnyKeyText.isBlinked)
      }
    }

}