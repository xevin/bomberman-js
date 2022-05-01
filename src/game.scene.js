import { TILE_W, TILE_H, FRAME_CONFIG } from "./constants"

export class GameScene extends Phaser.Scene {
  fireKey = null
  cusrors = null
  player = null
  bombs = null
  blasts = []
  playerSpeed = 120
  isHMoves = false // движение только по горизонтали
  isVMoves = false // движение только по вертикали

  constructor() {
    super("GameScene")
  }

  preload() {
    this.load.spritesheet("dude", "assets/dude.png", FRAME_CONFIG)
    this.load.spritesheet("bomb", "assets/bomb-frames.png", FRAME_CONFIG)
    this.load.spritesheet("blast", "assets/blast-frames.png", FRAME_CONFIG)
  }

  createAnimations() {
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

    this.anims.create({
      key: "bomb",
      frames: this.anims.generateFrameNumbers("bomb", {start: 0, end: 3}),
      frameRate: 1.2,
      repeat: 0
    })

    this.anims.create({
      key: "blast-cross",
      frames: [
        { key: "blast", frame: 0 },
        { key: "blast", frame: 3 },
        { key: "blast", frame: 6 },
        { key: "blast", frame: 3 },
        { key: "blast", frame: 0 },
      ],
      frameRate: 6,
      repeat: 0
    })

    this.anims.create({
      key: "blast-body",
      frames: [
        { key: "blast", frame: 1 },
        { key: "blast", frame: 4 },
        { key: "blast", frame: 7 },
        { key: "blast", frame: 4 },
        { key: "blast", frame: 1 },
      ],
      frameRate: 6,
      repeat: 0
    })

    this.anims.create({
      key: "blast-tail",
      frames: [
        { key: "blast", frame: 2 },
        { key: "blast", frame: 5 },
        { key: "blast", frame: 8 },
        { key: "blast", frame: 5 },
        { key: "blast", frame: 2 },
      ],
      frameRate: 6,
      repeat: 0
    })
  }

  create() {
    this.player = this.physics.add.sprite(
      TILE_W*4,
      TILE_H*8,
      "dude"
    )

    this.player.setBounce(0)
    this.player.setCollideWorldBounds(true)
    this.player.availableBombCount = 2
    this.player.blastSize = 2 // длина взрыва: счёт от центра (перекрестье)

    this.bombs = this.physics.add.staticGroup()

    this.physics.add.collider(this.player, this.bombs)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.createAnimations()
  }

  spawnBomb(placeTime, position) {
    const newBomb = this.bombs.create(
      position.x,
      position.y,
      "bomb"
    )
    newBomb.anims.play("bomb")
    newBomb.startTime = placeTime
  }

  drawBlast(position, size, currentTime) {
    const crossBlast = this.physics.add.sprite(
      position.x,
      position.y,
      "blast",
    )

    crossBlast.startTime = currentTime
    crossBlast.anims.play("blast-cross")
    this.physics.add.overlap(this.player, crossBlast, this.collidePlayerWithBlast)
    this.blasts.push(crossBlast)

    const dirs = [
      Phaser.Math.Vector2.LEFT,
      Phaser.Math.Vector2.RIGHT,
      Phaser.Math.Vector2.UP,
      Phaser.Math.Vector2.DOWN,
    ]

    for(let i=1; i <= size; i++) {
      dirs.forEach(dir => {
        const x = position.x + (dir.x * TILE_W * (i))
        const y = position.y + (dir.y * TILE_W * (i))
        const newBlast = this.physics.add.sprite(x, y)

        if (dir === Phaser.Math.Vector2.UP) {
          newBlast.setRotation(Phaser.Math.DegToRad(270))
        } else if (dir === Phaser.Math.Vector2.DOWN) {
          newBlast.setRotation(Phaser.Math.DegToRad(90))
        } else if (i === size && dir === Phaser.Math.Vector2.LEFT) {
          newBlast.setRotation(Phaser.Math.DegToRad(180))
        }

        newBlast.anims.play(i === size ? "blast-tail" : "blast-body")
        newBlast.startTime = currentTime
        this.physics.add.overlap(this.player, newBlast, this.collidePlayerWithBlast)

        // навешиваем коллбэк при столкновении взрыва и бомбы
        this.bombs.children.entries.forEach(bomb => {
          this.physics.add.overlap(bomb, newBlast, this.explodeBomb, () => true, this)
        })

        this.blasts.push(newBlast)
      })
    }
  }

  collidePlayerWithBlast() {
    console.info("player is dead")
  }

  explodeBomb(bomb, { startTime }) {
    this.drawBlast(
      {
        x: bomb.x,
        y: bomb.y
      },
      this.player.blastSize,
      startTime
    )

    // бомба отработала и больше не нужна
    bomb.destroy()

    // возвращаем игроку возможность ставить бомбу
    this.player.availableBombCount += 1
  }

  update(time, delta) {
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

    if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
      if (this.player.availableBombCount) {
        // забираем у игрока одну бомбу
        this.player.availableBombCount -= 1
        // и ставим её с округлёнными координатами - для привязки к ближайшему тайлу
        this.spawnBomb(time, {
          x: Math.floor((this.player.x) / TILE_W) * TILE_W + 16,
          y: Math.floor((this.player.y) / TILE_W) * TILE_W + 16
        })
      }
    }

    // удаляем старые взрывы
    this.blasts.forEach(blast => {
      if (time - blast.startTime > 1000) {
        blast.destroy()
      }
    })

    const self = this
    this.bombs.children.entries.forEach(bomb => {
      if (time - bomb.startTime > 3000) {
        self.explodeBomb(bomb, { startTime: time })
      }
    })
  }
}
