import {SCREEN, UI_COLOR} from './constants'

export function showGameOverScreen (scene) {
    scene.gameOver = scene.add.rectangle(0, 0, SCREEN.width, SCREEN.height, 0, 0.9)
    scene.gameOver.setScale(3)
    scene.gameOver.setDepth(100)
    scene.gameOverText = scene.add.text(0, 180, "Конец игры", {
        fontSize: 30,
        fontFamily: "monospace",
        color: UI_COLOR.activeMenuItem
    }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)
    scene.gameOverText.setX((480 - scene.gameOverText.width) / 2)
    scene.gameOverText.setDepth(101)

    scene.pointsText = scene.add.text(0, 240, `Всего очков: ${scene.points}`, {
        fontSize: 16,
        align: "center",
        fontFamily: "monospace",
        color: UI_COLOR.normalText
    }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)
    scene.pointsText.setX((480 - scene.pointsText.width) / 2)
    scene.pointsText.setDepth(101)

    scene.pressAnyKeyText = scene.add.text(0, 420, "Нажми любую кнопку", {
        fontSize: 20,
        fontFamily: "monospace",
        align: "center",
        color: UI_COLOR.activeMenuItem
    }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)
    scene.pressAnyKeyText.blinkTimer = 0
    scene.pressAnyKeyText.isBlinked = false
    scene.pressAnyKeyText.setDepth(101)
    scene.pressAnyKeyText.setX((480 - scene.pressAnyKeyText.width) / 2)

    scene.input.keyboard.on("keydown", () => {
        scene.scene.start("MenuScene")

    })
}