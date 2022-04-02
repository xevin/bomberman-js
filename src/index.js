import Phaser from "phaser"
import { IntroScene } from "./intro.scene"
import { GameScene } from "./game.scene"

const SCREEN = {
  width: 240,
  height: 240
}

let config = {
  type: Phaser.AUTO,
  width: SCREEN.width * 2,
  height: SCREEN.height * 2,
  scene: [ IntroScene, GameScene ],
  backgroundColor: "#43434F",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  }
}

let game = new Phaser.Game(config)
