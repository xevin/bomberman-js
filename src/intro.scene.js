export class IntroScene extends Phaser.Scene {
  pressAnyKeyText = null
  blinkTimer = 0
  isBlinked = false

  constructor() {
    super("IntroScene")
  }

  preload() {
    this.load.image("intro", "assets/intro.png")
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 32
    })
  }

  create() {
    this.add.sprite(240, 344,"intro")
    this.add.text(140, 50, "Бомбические\nподземелья", {
      fontSize: 28,
      align: "center",
      fontFamily: "monospace"
    })
    this.pressAnyKeyText = this.add.text(132, 200, "Нажми любую кнопку", {
      fontSize: 20,
      fontFamily: "monospace",
      color: "#3CA370 "
    })
  }

  update(time, delta) {
    if (this.blinkTimer < 600) {
      this.blinkTimer += delta
    } else {
      this.blinkTimer = 0
      if (this.isBlinked) {
        this.pressAnyKeyText.setColor("#3CA370")
        this.isBlinked = false
      } else {
        this.pressAnyKeyText.setColor("#CFFF70")
        this.isBlinked = true
      }
    }


    this.input.keyboard.on("keydown", () => {
      this.scene.start("GameScene")
    })
  }
}
