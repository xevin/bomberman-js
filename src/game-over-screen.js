import {SCREEN, UI_COLOR} from './constants'

export function showGameOverScreen (scene) {
    scene.darkDisplay = scene.add.rectangle(0, 0, SCREEN.width, SCREEN.height, 0, 0.8)
    scene.darkDisplay.setScale(3)
    scene.darkDisplay.setDepth(100)
    scene.darkDisplayText = scene.add.text(0, 180, "Конец игры", {
        fontSize: 30,
        fontFamily: "monospace",
        color: UI_COLOR.activeMenuItem
    }).setShadow(2,3,UI_COLOR.textShadow,1,true,true)
    scene.darkDisplayText.setX((480 - scene.darkDisplayText.width) / 2)
    scene.darkDisplayText.setDepth(101)

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
        destroyGameOverScreen(scene)
        scene.scene.start("MenuScene")
    })
}

function destroyGameOverScreen (scene) {
    delete scene.darkDisplay
    delete scene.pointsText
    delete scene.pressAnyKeyText
}