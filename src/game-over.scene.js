import {
  FONT_SIZE,
  UI_COLOR,
  SCREEN, BLINK_SPEED
} from "./constants"
import { blinkText } from "./utils"

export class GameOverScene extends Phaser.Scene {

  darkDisplay = null
  darkDisplayText = null
  pointsText = null
  pressAnyKeyText = null

  constructor() {
    super({
      key: "GameOver",
      active: true
    })
  }
  preload() {
    this.scene.setVisible(false)
    this.scene.pause()   

    this.darkDisplay = this.add.rectangle(0, 0, SCREEN.width, SCREEN.height, 0, 0.8)
    this.darkDisplay.setScale(3)
    this.darkDisplay.setDepth(100)

    this.darkDisplayText = this.add.text(0, 180, "Конец игры", {
      fontSize: FONT_SIZE.large,
      fontFamily: "monospace",
      color: UI_COLOR.activeMenuItem
    }).setShadow(2, 3, UI_COLOR.textShadow, 1, true, true)
    this.darkDisplayText.setX((480 - this.darkDisplayText.width) / 2)
    this.darkDisplayText.setDepth(101)

    this.pointsText = this.add.text(0, 240, `Всего очков: ${this.points}`, {
      fontSize: FONT_SIZE.normal,
      align: "center",
      fontFamily: "monospace",
      color: UI_COLOR.normalText
    }).setShadow(2, 3, UI_COLOR.textShadow, 1, true, true)
    this.pointsText.setX((480 - this.pointsText.width) / 2)
    this.pointsText.setDepth(101)

    this.pressAnyKeyText = this.add.text(0, 420, "Нажми любую кнопку", {
      fontSize: FONT_SIZE.normal,
      fontFamily: "monospace",
      align: "center",
      color: UI_COLOR.activeMenuItem
    }).setShadow(2, 3, UI_COLOR.textShadow, 1, true, true)
    this.pressAnyKeyText.blinkTimer = 0
    this.pressAnyKeyText.isBlinked = false
    this.pressAnyKeyText.setDepth(101)
    this.pressAnyKeyText.setX((480 - this.pressAnyKeyText.width) / 2)

  }

  create() {
    this.input.keyboard.on("keydown", () => {
      this.scene.stop("GameScene")
      this.scene.start("MenuScene")
    })
  }

  update(time, delta) {
    blinkText(this.pressAnyKeyText, BLINK_SPEED.medium, this.pressAnyKeyText.isBlinked, delta, UI_COLOR.activeMenuItem, UI_COLOR.inactiveMenuItem)
  }

}
