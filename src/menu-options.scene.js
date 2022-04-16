export class MenuOptionsScene extends Phaser.Scene {

    constructor() {
        super("MenuOptionsScene")
    }

    preload() {

    }

    create() {
        this.add.text(120, 200, 'Опции в разработке', {
            fontSize: 22,
            fontFamily: "monospace",
            color: "#58ee38"
        }).setShadow(2,3,'rgb(30,30,30)',1,true,true)

        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start("MenuScene")
        })
    }

    update(time, delta) {

    }
}