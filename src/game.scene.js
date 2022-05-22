import {
  TILE_W,
  TILE_H,
  FRAME_CONFIG,
  TILE_OFFSET,
  MAP,
  HUD_POS,
  SCREEN,
  FONT_SIZE,
  UI_COLOR,
  BLINK_SPEED
} from "./constants"
import { isBothOdd, randomTilePosition, fitPointToTile } from "./utils"

export class GameScene extends Phaser.Scene {
  fireKey = null
  cursors = null
  player = null
  bombs = null
  walls = null
  breakableWalls = null
  blasts = null
  playerSpeed = 120
  isHMoves = false // движение только по горизонтали
  isVMoves = false // движение только по вертикали
  hudBombText = null
  hudTimeText = null
  points = 999

  constructor() {
    super("GameScene")
  }

  preload() {
    this.load.spritesheet("dude", "assets/dude.png", FRAME_CONFIG)
    this.load.spritesheet("bomb", "assets/bomb-frames.png", FRAME_CONFIG)
    this.load.spritesheet("blast", "assets/blast-frames.png", FRAME_CONFIG)
    this.load.atlas("tiles", "assets/tiles.png", "assets/tiles.json")
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

    const blastFrameRate = 25
    this.anims.create({
      key: "blast-cross",
      frames: [
        {key: "blast", frame: 0},
        {key: "blast", frame: 3},
        {key: "blast", frame: 6},
        {key: "blast", frame: 9},
        {key: "blast", frame: 12},
      ],
      frameRate: blastFrameRate,
      repeat: 0
    })

    this.anims.create({
      key: "blast-body",
      frames: [
        {key: "blast", frame: 1},
        {key: "blast", frame: 4},
        {key: "blast", frame: 7},
        {key: "blast", frame: 10},
        {key: "blast", frame: 13},
      ],
      frameRate: blastFrameRate,
      repeat: 0
    })

    this.anims.create({
      key: "blast-tail",
      frames: [
        {key: "blast", frame: 2},
        {key: "blast", frame: 5},
        {key: "blast", frame: 8},
        {key: "blast", frame: 11},
        {key: "blast", frame: 14},
      ],
      frameRate: blastFrameRate,
      repeat: 0
    })

    this.anims.create({
      key: "brick-wall-breaks",
      frames: [
        {key: "tiles", frame: "broken_brick_01"},
        {key: "tiles", frame: "broken_brick_02"},
        {key: "tiles", frame: "broken_brick_03"},
        {key: "tiles", frame: "broken_brick_04"},
      ],
      hideOnComplete: true,
      frameRate: 15,
      repeat: 0
    })
  }

  drawWalls() {
    this.walls = this.physics.add.staticGroup()
    this.physics.add.collider(this.player, this.walls)

    this.breakableWalls = this.physics.add.staticGroup()
    this.physics.add.collider(this.player, this.breakableWalls)

    // Часть I - стены вокруг уровня
    const bottomCoord = MAP.height * TILE_H - TILE_H
    const rightCoord = MAP.width * TILE_W - TILE_W

    // верхняя и нижняя стены
    for (let i = MAP.width - 2; i > 0; i--) {
      const x = i * TILE_W + TILE_OFFSET
      this.walls.create(x, TILE_OFFSET, "tiles", "t_wall").setDepth(1)
      this.walls.create(x, bottomCoord + TILE_OFFSET, "tiles", "b_wall").setDepth(1)
    }

    // левая и правая стены
    for (let i = MAP.height - 2; i > 0; i--) {
      const y = i * TILE_H + TILE_OFFSET
      this.walls.create(TILE_OFFSET, y, "tiles", "l_wall").setDepth(1)
      this.walls.create(rightCoord + TILE_OFFSET, y, "tiles", "r_wall").setDepth(1)
    }

    // Расставляем углы
    // TODO: не использовать физику для изображений угов
    this.walls.create(TILE_OFFSET, TILE_OFFSET, "tiles", "tl_wall")
    this.walls.create(rightCoord + TILE_OFFSET, TILE_OFFSET, "tiles", "tr_wall")
    this.walls.create(TILE_OFFSET, bottomCoord + TILE_OFFSET, "tiles", "bl_wall")
    this.walls.create(rightCoord + TILE_OFFSET, bottomCoord + TILE_OFFSET, "tiles", "br_wall")

    // Часть II - нерушимые колонны
    const w_count = (MAP.width - 4) / 2
    const h_count = (MAP.height - 4) / 2

    for (let i = 0; i < w_count; i++) {
      const x = TILE_OFFSET + (i + 1) * (TILE_W * 2)

      for (let j = 0; j < h_count; j++) {
        const y = TILE_OFFSET + (j + 1) * (TILE_H * 2)
        this.walls.create(x, y, "tiles", "column").setDepth(1).body.setCircle(TILE_W / 2)
      }
    }

    // Часть III - кирпичная кладка
    // Кол-во тайлов по ширине и высоте игрового поля
    const gameAreaW = 13
    const gameAreaH = 13

    function randomBrickCoordinate() {
      let pos = randomTilePosition()

      // когда обе координаты нечётные - в этой позиции стоит колонна (т.е. не подходит для расположения кирпича)
      // так-же нулевые координаты должны быть пустые для спавна игрока
      while (isBothOdd(pos) || (pos.x === 0 && pos.y === 0)) {
        pos = randomTilePosition(gameAreaW, gameAreaH)
      }

      pos.x += 1
      pos.y += 1

      pos.x *= TILE_W
      pos.y *= TILE_H
      return pos
    }

    let brickWallCoordinates = []
    const brickCount = 30

    for (let i = 0; i < brickCount; i++) {
      brickWallCoordinates.push(randomBrickCoordinate())
    }

    brickWallCoordinates.forEach(pos => {
      this.breakableWalls.create(pos.x + TILE_OFFSET, pos.y + TILE_OFFSET, "tiles", "brick")
        .body.setCircle(TILE_W / 2)
    })
  }

  drawHud() {
    const y = HUD_POS.y + TILE_OFFSET
    const x = HUD_POS.x + TILE_OFFSET
    this.add.sprite(x, y, "tiles", "hud_left")

    for (let i = 0; i < (SCREEN.width / TILE_W) - 2; i++) {
      this.add.sprite(x + TILE_W + (i * TILE_W), y, "tiles", "hud_middle")
    }

    this.add.sprite(SCREEN.width - TILE_W + TILE_OFFSET, y, "tiles", "hud_right")

    this.add.sprite(x, y, "tiles", "hud_timer")
    this.hudTimeText = this.add.text(x + TILE_OFFSET, y - TILE_OFFSET + 2, "256", {
      fontSize: FONT_SIZE.normal,
      fontFamily: "NewGen",
      color: UI_COLOR.normalText
    })
    this.add.sprite(x + TILE_W * 3, y, "tiles", "hud_bomb")
    this.hudBombText = this.add.text(
      x + TILE_OFFSET + TILE_W * 3,
      y - TILE_OFFSET + 2,
      "1",
      {
        fontSize: FONT_SIZE.normal,
        fontFamily: "NewGen",
        color: UI_COLOR.normalText
      }
    )

    this.updateHudText()
  }


  updateHudText() {
    this.hudBombText.setText(this.player.availableBombCount)
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
    this.blasts = this.physics.add.staticGroup()

    this.physics.add.collider(this.player, this.bombs)

    this.cursors = this.input.keyboard.createCursorKeys()
    this.fireKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.endgame = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TAB)

    this.createAnimations()
    this.drawWalls()
    this.drawHud()
  }

  isABombFreePlace(position) {
    let rect = new Phaser.Geom.Rectangle(position.x, position.y, 4, 4)
    let result = true

    this.bombs.children.entries.forEach((bomb) => {
      let int = Phaser.Geom.Intersects.RectangleToRectangle(rect, bomb.body)
      if (int) {
        result = false
      }
    })

    return result
  }

  spawnBomb(position) {
    // бомба должна быть размером чем тайл, поэтому уменьшаем её размер на 4 пикселя
    // так как это радиус, то отнимаем не 4, а 2 пикселя
    const offset = 2
    const collideRadius = (TILE_W / 2) - offset

    const newBomb = this.bombs.create(
      position.x,
      position.y,
      "bomb"
    )
    newBomb.body.setCircle(collideRadius)

    // что-бы центрировать коллайдер, смещаем его на пару пикселей ниже и правее
    newBomb.body.position.x += offset
    newBomb.body.position.y += offset

    newBomb.anims.play("bomb")

    newBomb.on("animationcomplete", () => {
      this.explodeBomb(newBomb)
    })
  }

  drawBlast(position, size) {
    const positionOffset = 5

    const crossBlast = this.physics.add.sprite(
      position.x,
      position.y,
      "blast",
    )

    crossBlast.body.setCircle((TILE_W / 2) - positionOffset)
    crossBlast.body.offset.x += positionOffset
    crossBlast.body.offset.y += positionOffset
    crossBlast.anims.play("blast-cross")
    crossBlast.on("animationcomplete", () => {
      crossBlast.destroy()
    })

    this.physics.add.overlap(this.player, crossBlast, this.collidePlayerWithBlast)
    this.blasts.create(crossBlast)

    const dirs = [
      Phaser.Math.Vector2.LEFT,
      Phaser.Math.Vector2.RIGHT,
      Phaser.Math.Vector2.UP,
      Phaser.Math.Vector2.DOWN,
    ]

    let disabledDirs = []

    dirs.forEach(dir => {
      for (let i = 1; i <= size; i++) {
        const x = position.x + (dir.x * TILE_W * (i))
        const y = position.y + (dir.y * TILE_W * (i))

        let rect = new Phaser.Geom.Rectangle(x, y, 4, 4)

        // проверяем что взрыв упёрся в колонну или стену до отрисовки взрыва
        this.walls.children.entries.forEach((wall) => {
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
        newBlast.body.setCircle((TILE_W / 2) - positionOffset)
        newBlast.body.offset.x += positionOffset
        newBlast.body.offset.y += positionOffset

        if (dir === Phaser.Math.Vector2.UP) {
          newBlast.setRotation(Phaser.Math.DegToRad(270))
        } else if (dir === Phaser.Math.Vector2.DOWN) {
          newBlast.setRotation(Phaser.Math.DegToRad(90))
        } else if (i === size && dir === Phaser.Math.Vector2.LEFT) {
          newBlast.setRotation(Phaser.Math.DegToRad(180))
        }

        newBlast.anims.play(i === size ? "blast-tail" : "blast-body")

        newBlast.on("animationcomplete", () => {
          newBlast.destroy()
        })

        this.physics.add.overlap(this.player, newBlast, this.collidePlayerWithBlast)
        this.physics.add.overlap(this.breakableWalls, newBlast, this.collideBreakableWallWithBlast)

        // навешиваем коллбэк при столкновении взрыва и бомбы
        this.bombs.children.entries.forEach(bomb => {
          this.physics.add.overlap(bomb, newBlast, this.explodeBomb, () => true, this)
        })

        this.blasts.create(newBlast)

        // проверяем что взрыв пришёлся на кирпичную стену после отрисовки взрыва
        this.breakableWalls.children.entries.forEach((wall) => {
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

  explodeBomb(bomb) {
    this.drawBlast(
      {
        x: bomb.x,
        y: bomb.y
      },
      this.player.blastSize
    )

    // бомба отработала и больше не нужна
    bomb.destroy()

    // возвращаем игроку возможность ставить бомбу
    this.player.availableBombCount += 1
    this.updateHudText()
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

    if (Phaser.Input.Keyboard.JustDown(this.endgame)) {
      this.input.keyboard.removeAllKeys()
      this.scene.setVisible(true, "GameOver")
      this.scene.resume("GameOver")
    }

    if (Phaser.Input.Keyboard.JustDown(this.fireKey)) {
      // позиция с округлёнными до ближайшего тайла координатами
      const bombPlacePosition = fitPointToTile(this.player)

      if (this.player.availableBombCount && this.isABombFreePlace(bombPlacePosition)) {
        // забираем у игрока одну бомбу
        this.player.availableBombCount -= 1
        this.updateHudText()
        this.spawnBomb(bombPlacePosition)
      }
    }
  }
}
