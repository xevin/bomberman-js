import {BLINK_SPEED, FRAME_CONFIG, UI_COLOR} from "./constants"
import {blinkText} from './utils'

export class MenuScene extends Phaser.Scene {

  i = 0
  arrow = null
  currentItemIndex = 0
  selected = false

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
      frames: this.anims.generateFrameNumbers("menu-arrow", {start: 0, end: 8}),
      frameRate: 15,
        repeat: -1
    })
    }

  create() {
    this.arrow = this.physics.add.sprite(
        this.config.startX - 40,
        this.config.startY,
        "menu-arrow"
    )
    //* вывожу пункты меню в сцену, добавляю параметры
    this.menuItems.forEach( (item, index) => {
      item.textObj = this.add.text(this.config.startX, index ? this.config.lastY + this.config.incrementY : this.config.startY, item.text, this.config.style)
      item.textObj.setShadow(2,3,UI_COLOR.textShadow,1,true,true)
      item.textObj.isBlinked = false
      item.textObj.blinkSpeed = 0
      this.config.lastY = item.textObj.y
    })

    this.input.keyboard.on('keydown-ENTER', () => {
      this.selected = true
      //Анимация выбора меню с задержкой
      setTimeout(() => {
        this.scene.start(this.menuItems[this.currentItemIndex].scene)
        this.selected = false
      }, 600)
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

    if (this.selected) {
        blinkText(this.menuItems[this.currentItemIndex].textObj, BLINK_SPEED.turbo, this.menuItems[this.currentItemIndex].textObj.isBlinked, delta, UI_COLOR.activeMenuItem, UI_COLOR.inactiveMenuItem)
       }
    }
}
