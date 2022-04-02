export class GameScene extends Phaser.Scene {
  cusrors = null
  player = null
  playerSpeed = 120
  isHMoves = false // движение только по горизонтали
  isVMoves = false // движение только по вертикали

  constructor() {
    super("GameScene")
  }

  preload() {
    // pass
  }

  create() {
    this.player = this.physics.add.sprite(120, 120, "dude");
    this.player.setBounce(0)
    this.player.setCollideWorldBounds(true)
    this.cursors = this.input.keyboard.createCursorKeys()

    this.anims.create({
      key: "idle",
      frames: [{key: "dude", frame: 0}],
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("dude", {start: 0, end: 7}),
      frameRate: 12,
      repeat: -1
    })

    this.player.anims.play("idle")
  }

  update() {
    if (!this.isVMoves) {
      if (this.cursors.left.isDown) {
        this.isHMoves = true
        this.player.anims.play("run", true)
        this.player.body.rotation = 270
        this.player.setVelocityX(-this.playerSpeed)
      } else if (this.cursors.right.isDown) {
        this.isHMoves = true
        this.player.anims.play("run", true)
        this.player.body.rotation = 90
        this.player.setVelocityX(this.playerSpeed)
      } else {
        this.isHMoves = false
        this.player.anims.play("idle")
        this.player.setVelocityX(0)
      }
    }

    if (!this.isHMoves) {
      if (this.cursors.up.isDown) {
        this.player.anims.play("run", true)
        this.player.body.rotation = 0
        this.isVMoves = true
        this.player.setVelocityY(-this.playerSpeed)
      } else if (this.cursors.down.isDown) {
        this.player.anims.play("run", true)
        this.player.body.rotation = 180
        this.isVMoves = true
        this.player.setVelocityY(this.playerSpeed)
      } else {
        this.player.anims.play("idle")
        this.isVMoves = false
        this.player.setVelocityY(0)
      }
    }
  }
}
