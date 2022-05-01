import { FontSize, UiColor } from "./constants"

export class IntroScene extends Phaser.Scene {
  pressAnyKeyText = null
  blinkTimer = 0
  isBlinked = false

  constructor() {
    super("IntroScene")
  }

  preload() {
    this.load.image("intro", "assets/intro.png")
  }

  create() {
    this.add.sprite(240, 344,"intro")
    this.add.text(142, 50, "Бомбические\nподземелья", {
      fontSize: FontSize.big,
      fontFamily: "NewGen",
      align: "center",
      color: UiColor.normalText
    })

    this.pressAnyKeyText = this.add.text(140, 200, "Нажми любую кнопку", {
      fontSize: FontSize.normal,
      fontFamily: "NewGen",
      color: UiColor.activeMenuItem
    }).setShadow(2,3,UiColor.textShadow,1,true,true)

    this.input.keyboard.on("keyup", () => {
      this.scene.start("MenuScene")
    })
  }

  update(time, delta) {
    if (this.blinkTimer < 600) {
      this.blinkTimer += delta
    } else {
      this.blinkTimer = 0
      if (this.isBlinked) {
        this.pressAnyKeyText.setColor(UiColor.activeMenuItem)
        this.isBlinked = false
      } else {
        this.pressAnyKeyText.setColor(UiColor.inactiveMenuItem)
        this.isBlinked = true
      }
    }
  }
}
