import Phaser from "phaser"
import { SCREEN, UiColor } from "./constants"
import { IntroScene } from "./intro.scene"
import { GameScene } from "./game.scene"
import { MenuScene } from "./menu.scene"
import { MenuOptionsScene } from "./menu-options.scene"


let config = {
  type: Phaser.AUTO,
  width: SCREEN.width,
  height: SCREEN.height,
  scene: [ IntroScene, MenuScene, MenuOptionsScene, GameScene],
  backgroundColor: UiColor.background,
  physics: {
    default: "arcade",
    arcade: {
      debug: false
    }
  },
  pixelArt: true
}

let game = new Phaser.Game(config)
