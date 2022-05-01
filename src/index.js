import Phaser from "phaser"
import { SCREEN } from "./constants"
import { IntroScene } from "./intro.scene"
import { GameScene } from "./game.scene"
import { MenuScene } from "./menu.scene"
import { MenuOptionsScene } from "./menu-options.scene"



let config = {
  type: Phaser.AUTO,
  width: SCREEN.width * 2,
  height: SCREEN.height * 2,
  scene: [ IntroScene, MenuScene, MenuOptionsScene, GameScene],
  backgroundColor: "#43434F",
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  pixelArt: true
}

let game = new Phaser.Game(config)
