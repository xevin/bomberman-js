export class MenuScene extends Phaser.Scene {

  bomb = null
  currentItemIndex = 0

  config = {
    startX: 160,
    startY: 200,
    lastY: null,
    incrementY: 40,
    style: {
      fontSize: 24,
      fontFamily: "monospace",
      color: "#b94200"
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
      item.textObj.setShadow(2,3,'rgb(30,30,30)',1,true,true)
      this.config.lastY = item.textObj.y
      
    })

    this.input.keyboard.on('keydown-ENTER', () => {
      this.scene.start("GameScene")
    })

    this.input.keyboard.on('keydown-UP', () => {
      this.currentItemIndex = this.menuItems.findIndex((item) => item.current)
      this.menuItems[this.currentItemIndex].current = false

      this.currentItemIndex === 0 ? this.currentItemIndex = this.menuItems.length - 1 : this.currentItemIndex--

      this.menuItems[this.currentItemIndex].current = true
    })

    this.input.keyboard.on('keydown-DOWN', () => {
      this.currentItemIndex = this.menuItems.findIndex((item, index, arr) => item.current)
      this.menuItems[this.currentItemIndex].current = false

      this.currentItemIndex === this.menuItems.length - 1 ? this.currentItemIndex = 0 : this.currentItemIndex++
      this.menuItems[this.currentItemIndex].current = true

    })

  }

  update() {
    this.bomb.setY(this.menuItems[this.currentItemIndex].textObj.y + 5)
  }
}
