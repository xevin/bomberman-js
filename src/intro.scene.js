import { BLINK_SPEED, FONT_SIZE, UI_COLOR } from "./constants"
import { blinkText } from "./utils"

export class IntroScene extends Phaser.Scene {

  pressAnyKeyText = null

  constructor() {
    super("IntroScene")
  }

  preload() {
    this.load.image("intro", "assets/intro.png")
  }

  create() {
    this.add.sprite(240, 344, "intro").setScale(3)
    this.add.text(142, 50, "Бомбические\nподземелья", {
      fontSize: FONT_SIZE.big,
      fontFamily: "NewGen",
      align: "center",
      color: UI_COLOR.normalText
    })

    this.pressAnyKeyText = this.add.text(140, 200, "Нажми любую кнопку", {
      fontSize: FONT_SIZE.normal,
      fontFamily: "NewGen",
      color: UI_COLOR.activeMenuItem
    }).setShadow(2, 3, UI_COLOR.textShadow, 1, true, true)
    this.pressAnyKeyText.isBlinked = false
    this.pressAnyKeyText.blinkSpeed = 0

    this.input.keyboard.on("keyup", () => {
      this.scene.start("MenuScene")
    })
  }

  update(time, delta) {
    blinkText(this.pressAnyKeyText, BLINK_SPEED.medium, this.pressAnyKeyText.isBlinked, delta, UI_COLOR.activeMenuItem, UI_COLOR.inactiveMenuItem)
  }
}
