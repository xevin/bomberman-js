import { FONT_SIZE, UI_COLOR } from "./constants"

export class MenuOptionsScene extends Phaser.Scene {

    constructor() {
        super("MenuOptionsScene")
    }

    preload() {

    }

    create() {
        this.add.text(90, 200, 'Опции в разработке', {
            fontSize: FONT_SIZE.big,
            fontFamily: "NewGen",
            color: UI_COLOR.activeMenuItem
        }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start("MenuScene")
        })
    }

    update(time, delta) {

    }
}
