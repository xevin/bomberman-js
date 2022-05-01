import { FRAME_CONFIG, UI_COLOR } from "./constants"

export class MenuScene extends Phaser.Scene {

  arrow = null
  currentItemIndex = 0

  config = {
    startX: 160,
    startY: 200,
    lastY: null,
    incrementY: 40,
    style: {
      fontSize: 18,
      fontFamily: "NewGen",
      color: UI_COLOR.activeMenuItem
    }
  }

  menuItems = [
    {
      scene: 'GameScene',
      text: 'Новая игра',
    },
    {
      scene: 'MenuOptionsScene',
      text: 'Опции',
    },
  ]

  constructor() {
    super("MenuScene")
  }

  preload() {
    this.load.spritesheet("menu-arrow", "assets/menu_assets/arrow.png", FRAME_CONFIG)
  }

  createAnimations() {
    this.anims.create({
      key: "arrow",
      frames: this.anims.generateFrameNumbers("menu-arrow", {start: 0, end: 3}),
      frameRate: 12,
        repeat: -1
    })
    }

  create() {
    this.arrow = this.physics.add.sprite(
        this.config.startX - 40,
        this.config.startY,
        "menu-arrow"
    )
    //* вывожу пункты меню в сцену
    this.menuItems.forEach( (item, index) => {
      item.textObj = this.add.text(this.config.startX, index ? this.config.lastY + this.config.incrementY : this.config.startY, item.text, this.config.style)
      item.textObj.setShadow(2,3,UI_COLOR.textShadow,1,true,true)
      this.config.lastY = item.textObj.y

    })

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start(this.menuItems[this.currentItemIndex].scene)
    })

    this.input.keyboard.on('keydown-UP', () => {
      this.currentItemIndex === 0 ? this.currentItemIndex = this.menuItems.length - 1 : this.currentItemIndex--
    })

    this.input.keyboard.on('keydown-DOWN', () => {
      this.currentItemIndex === this.menuItems.length - 1 ? this.currentItemIndex = 0 : this.currentItemIndex++
    })
    this.createAnimations()
  }

  update(time, delta) {
    this.arrow.anims.play("arrow", true)
    this.arrow.setY(this.menuItems[this.currentItemIndex].textObj.y + 15)
  }
}
