export class MenuScene extends Phaser.Scene {

  bomb = null
  cursors = null

  config = {
    startX: 160,
    startY: 200,
    lastY: null,
    incrementY: 40,
    style: {
      fontSize: 20,
      fontFamily: "monospace",
      color: "#ff6d01"
    }
  }
  
  menuItems = [
    {
      name: 'newGame',
      text: 'Новая игра',
      position: 1,
      current: true,
    },
    {
      name: 'options',
      text: 'Опции',
      position: 2,
      current: false,
    },
    {
      name: 'about',
      text: 'Об игре',
      position: 3,
      current: false,
    }
  ]

  constructor() {
    super("MenuScene")
  }

  preload() {
    this.load.image("menu-bomb", "assets/menu_assets/bomb.png")
  }

  create() {
    this.bomb = this.add.image(130, 205,"menu-bomb")
    this.bomb.setDisplaySize(30, 30)
    this.cursors = this.input.keyboard.createCursorKeys()

    //* вывожу пункты меню в сцену
    this.menuItems.forEach( (item, index) => {
      item.textObj = this.add.text(this.config.startX, index ? this.config.lastY + this.config.incrementY : this.config.startY, item.text, this.config.style)
      this.config.lastY = item.textObj.y
      
    })

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start("GameScene")
    })

  }

  update(time, delta) {
    let currentItemIndex = this.menuItems.findIndex((item, index, arr) => item.current)
    if (this.cursors.up.isDown) {
      if (currentItemIndex === 0) {
        this.bomb.setY(this.menuItems[this.menuItems.length - 1].textObj.y + 5)
        this.menuItems[this.menuItems.length - 1].current = true

      } else {

        this.bomb.setY(this.menuItems[currentItemIndex - 1].textObj.y + 5)
        this.menuItems[currentItemIndex - 1].current = true
      }
      this.menuItems[currentItemIndex].current = false
    } else if (this.cursors.down.isDown) {
      if (currentItemIndex === this.menuItems.length - 1) {
        this.bomb.setY(this.menuItems[0].textObj.y + 5)
        this.menuItems[0].current = true

      } else {

        this.bomb.setY(this.menuItems[currentItemIndex + 1].textObj.y + 5)
        this.menuItems[currentItemIndex + 1].current = true
      }
      this.menuItems[currentItemIndex].current = false
    }

  }
}
