import { TILE_W, TILE_H, FRAME_CONFIG, SCREEN, TILE_OFFSET } from "./constants"

export class GameScene extends Phaser.Scene {
  fireKey = null
  cursors = null
  player = null
  bombs = null
  walls = null
  breakableWalls = null
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
    this.load.spritesheet("walls", "assets/walls.png", FRAME_CONFIG)
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
        { key: "blast", frame: 9 },
        { key: "blast", frame: 12 },
      ],
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: "blast-body",
      frames: [
        { key: "blast", frame: 1 },
        { key: "blast", frame: 4 },
        { key: "blast", frame: 7 },
        { key: "blast", frame: 10 },
        { key: "blast", frame: 13 },
      ],
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: "blast-tail",
      frames: [
        { key: "blast", frame: 2 },
        { key: "blast", frame: 5 },
        { key: "blast", frame: 8 },
        { key: "blast", frame: 11 },
        { key: "blast", frame: 14 },
      ],
      frameRate: 10,
      repeat: 0
    })

    this.anims.create({
      key: "brick-wall-breaks",
      frames: [
        { key: "walls", frame: 5 },
        { key: "walls", frame: 9 },
        { key: "walls", frame: 10 },
        { key: "walls", frame: 11 },
      ],
      frameRate: 15,
      repeat: 0
    })
  }

  drawWalls() {
    // TODO вынести в атлас (или что-то подобное)
    const TL_CORNER = 0
    const TR_CORNER = 2
    const BL_CORNER = 12
    const BR_CORNER = 14
    const T_WALL = 1
    const L_WALL = 6
    const R_WALL = 8
    const B_WALL = 13
    const COLUMN = 7
    const BRICK_WALL = 3

    this.walls = this.physics.add.staticGroup()
    this.physics.add.collider(this.player, this.walls)

    this.breakableWalls = this.physics.add.staticGroup()
    this.physics.add.collider(this.player, this.breakableWalls)

    // Часть I - стены вокруг уровня
    const bottomCoord = SCREEN.height - TILE_H
    const rightCoord = SCREEN.width - TILE_W

    // верхняя и нижняя стены
    for(let i=(SCREEN.width/TILE_W)-2; i > 0; i--) {
      const x = i * TILE_W + TILE_OFFSET
      this.walls.create(x, TILE_OFFSET, "walls", T_WALL).setDepth(1)
      this.walls.create(x, bottomCoord + TILE_OFFSET, "walls", B_WALL).setDepth(1)
    }

    // левая и правая стены
    for(let i=(SCREEN.height/TILE_H)-2; i > 0; i--) {
      const y = i * TILE_H + TILE_OFFSET
      this.walls.create(TILE_OFFSET, y, "walls", L_WALL).setDepth(1)
      this.walls.create(rightCoord + TILE_OFFSET, y, "walls", R_WALL).setDepth(1)
    }

    // Расставляем углы
    // TODO: не использовать физику для изображений угов
    this.walls.create(TILE_OFFSET, TILE_OFFSET, "walls", TL_CORNER)
    this.walls.create(rightCoord + TILE_OFFSET, TILE_OFFSET, "walls", TR_CORNER)
    this.walls.create(TILE_OFFSET, bottomCoord + TILE_OFFSET, "walls", BL_CORNER)
    this.walls.create(rightCoord + TILE_OFFSET, bottomCoord + TILE_OFFSET, "walls", BR_CORNER)

    // Часть II - нерушимые колонны
    const w_count = ((SCREEN.width / TILE_W) - 4) / 2
    const h_count = ((SCREEN.height / TILE_H) - 4) / 2

    for( let i=0; i < w_count; i++) {
      const x = TILE_OFFSET + (i+1) * (TILE_W * 2)

      for (let j=0; j < h_count; j++) {
        const y = TILE_OFFSET + (j+1) * (TILE_H * 2)
        this.walls.create(x, y, "walls", COLUMN).setDepth(1).body.setCircle(TILE_W/2)
      }
    }

    // Часть III - кирпичная кладка
    // TODO генерировать случайное кол-во и случайное расположение кирпичей
    const brickWallCoordinates = [
      {
        x: TILE_W * 3,
        y: TILE_H * 4
      },
      {
        x: TILE_W * 3,
        y: TILE_H * 2
      },
      {
        x: TILE_W * 2,
        y: TILE_H * 3
      }
    ]

    brickWallCoordinates.forEach(pos => {
      this.breakableWalls.create(pos.x + TILE_OFFSET, pos.y + TILE_OFFSET, "walls", BRICK_WALL)
        .body.setCircle(TILE_W/2)
    })
  }

  create() {
    this.player = this.physics.add.sprite(
      TILE_W + TILE_OFFSET,
      TILE_H + TILE_OFFSET,
      "dude"
    )

    this.player.setBounce(0)
    this.player.setCollideWorldBounds(true)
    this.player.setDepth(1)
    this.player.availableBombCount = 2
    // длина языков взрыва
    this.player.blastSize = 1

    this.bombs = this.physics.add.staticGroup()

    this.physics.add.collider(this.player, this.bombs)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

    this.createAnimations()
    this.drawWalls()
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

    let disabledDirs = [
    ]

    dirs.forEach(dir => {
      for(let i=1; i <= size; i++) {
        const x = position.x + (dir.x * TILE_W * (i))
        const y = position.y + (dir.y * TILE_W * (i))

        let rect = new Phaser.Geom.Rectangle(x, y, 4, 4)

        // проверяем что взрыв упёрся в колонну или стену до отрисовки взрыва
        this.walls.children.entries.forEach((wall, idx) => {
          let int = Phaser.Geom.Intersects.RectangleToRectangle(rect, wall.body)
          if (int) {
            // есть пересечение - отменяем отрисовку взрывов в этом направлении
            disabledDirs.push(dir)
          }
        })

        if (disabledDirs.includes(dir)) {
          break
        }

        const newBlast = this.physics.add.sprite(x, y, "blast")
        newBlast.body.setCircle(TILE_W/2)

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
        this.physics.add.overlap(this.breakableWalls, newBlast, this.collideBreakableWallWithBlast)

        // навешиваем коллбэк при столкновении взрыва и бомбы
        this.bombs.children.entries.forEach(bomb => {
          this.physics.add.overlap(bomb, newBlast, this.explodeBomb, () => true, this)
        })

        this.blasts.push(newBlast)

        // проверяем что взрыв пришёлся на кирпичную стену после отрисовки взрыва
        this.breakableWalls.children.entries.forEach((wall, idx) => {
          let int = Phaser.Geom.Intersects.RectangleToRectangle(rect, wall.body)
          if (int) {
            newBlast.anims.play("blast-tail")
            disabledDirs.push(dir)
          }
        })
      }
    })
  }

  collidePlayerWithBlast() {
    console.info("player is dead")
  }

  collideBreakableWallWithBlast(blast, brickWall) {
    brickWall.anims.play("brick-wall-breaks")
    brickWall.on("animationcomplete", () => {
      brickWall.destroy()
    })
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
      if (time - blast.startTime > 500) {
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
