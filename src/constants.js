export const TILE_W = 32
export const TILE_H = 32
export const TILE_OFFSET = TILE_W/2

export const MAP = {
  width: 15,
  height: 15
}

export const HUD_HEIGHT = (TILE_H + 1) - 1

export const HUD_POS = {
  x: 0,
  y: MAP.height * TILE_H
}

export const SCREEN = {
  width: TILE_W * MAP.width,
  height: TILE_H * MAP.height + HUD_HEIGHT
}

export const FRAME_CONFIG = {
  frameWidth: TILE_W,
  frameHeight: TILE_H
}

export const FONT_SIZE = {
  // размеры подобраны под шрифт NewGen
  normal: "18px",
  big: "27px",
  large: "36px"
}

export const UI_COLOR = {
  normalText: "#F1F1F1",
  inactiveMenuItem: "#3CA370",
  activeMenuItem: "#CFFF70",
  textShadow: "#1E1E1E",
  background: "#43434F"
}
