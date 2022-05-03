
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
