export class MenuScene extends Phaser.Scene {

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
  
  menuItems = {

    newGame: {
      text: 'Новая игра',
      position: 1,
      current: true,
    },

    options: {
      text: 'Опции',
      position: 2,
      current: false,
    },

    about: {
      text: 'Об игре',
      position: 3,
      current: false,
    }
  }

  bomb = null
  cursors = null

  constructor() {
    super("MenuScene")
  }

  preload() {
    this.load.image("menu-bomb", "assets/bomb.png")
  }
  create() {
    //this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    //this.input.keyboard.addKeys('LEFT, RIGHT, UP, DOWN, ENTER')
    this.bomb = this.add.image(130, 205,"menu-bomb")
    this.bomb.setDisplaySize(30, 30)


    //console.log('hello')
    for (const item in this.menuItems) {

        Object.assign(this.menuItems[item], this.add.text(this.config.startX, this.config.lastY ? this.config.lastY + this.config.incrementY : this.config.startY, this.menuItems[item].text, this.config.style))
        this.config.lastY = this.menuItems[item].y
        console.log(this.menuItems[item])
    }

    //Object.assign(this.menuItems.newGame, this.add.text(160, 200, this.menuItems.newGame.text, this.config.style))
    //Object.assign(this.menuItems.options, this.add.text(160, 240, this.menuItems.options.text, this.config.style))


  }

  update() {
    this.input.keyboard.on('keydown-ENTER', () => {
      //console.log('hello')
      this.scene.sleep("MenuScene")
      this.scene.start("GameScene")
    })


    // if (this.cursors.down.isDown) {
    //   this.bomb.setY(this.menuItems.options.y + 5)
    //   }
    //   console.log(Object.keys(this.menuItems))
    //
    // if (this.cursors.up.isDown) {
    //   this.bomb.setY(this.menuItems.newGame.y + 5)
    // }
    //
    // if (this.cursors..isDown) {
    //
    // }

  }
}
