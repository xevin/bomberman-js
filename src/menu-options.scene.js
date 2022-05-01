import { FontSize, UiColor } from "./constants"

export class MenuOptionsScene extends Phaser.Scene {

    constructor() {
        super("MenuOptionsScene")
    }

    preload() {

    }

    create() {
        this.add.text(90, 200, 'Опции в разработке', {
            fontSize: FontSize.big,
            fontFamily: "NewGen",
            color: UiColor.activeMenuItem
        }).setShadow(2,3,UiColor.textShadow,1,true,true)

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start("MenuScene")
        })
    }

    update(time, delta) {

    }
}
