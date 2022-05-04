import { TILE_OFFSET, TILE_W } from "./constants"

export function isEven(num) {
  return num % 2 === 0
}

export function isBothOdd(pos) {
  return !isEven(pos.x) && !isEven(pos.y)
}

export function getRandomArbitrary(min, max) {
  return parseInt(Math.random() * (max - min) + min, 10)
}

export function randomTilePosition(maxW, maxH) {
  return {
    x: getRandomArbitrary(0, maxW - 1),
    y: getRandomArbitrary(0, maxH - 1),
  }
}

export function fitPointToTile(pos, offset=TILE_OFFSET) {
  // округление координат точки (pos) до позиций тайлов
  // pos = { x: number, y: number }

  return {
    x: Math.floor((pos.x) / TILE_W) * TILE_W + offset,
    y: Math.floor((pos.y) / TILE_W) * TILE_W + offset
  }
}
