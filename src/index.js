'use strict'

const Chance = require('chance')

const CELL_VARIANT = require('./variants/cell-variant')
const FOLD_VARIANT = require('./variants/fold-variant')

function createNoise (width, height, fold, random) {
  const yEnd = fold !== FOLD_VARIANT.VERTICAL
    ? height - 2
    : height - 1

  const xEnd = fold !== FOLD_VARIANT.HORIZONTAL
    ? width - 2
    : width - 1

  return Array(height).fill().map(
    (_, y) => {
      return Array(width).fill().map(
        (_, x) => {
          return x === 0 || y === 0 || x === xEnd || y === yEnd
            ? CELL_VARIANT.DEAD
            : random.pickone([CELL_VARIANT.DEAD, CELL_VARIANT.ALIVE])
        }
      )
    }
  )
}

module.exports = function createNoci (props = {}) {
  const {
    fold: foldProp,
    iterations = 10,
    width: widthProp = 10,
    height: heightProp = 10,
    seed = 'idrinkandiknowthings'
  } = props

  const random = new Chance(seed)

  const fold = foldProp != null
    ? foldProp
    : random.pickone(Object.keys(FOLD_VARIANT))

  const width = fold === FOLD_VARIANT.HORIZONTAL
    ? widthProp
    : Math.floor(widthProp / 2)

  const height = fold === FOLD_VARIANT.VERTICAL
    ? heightProp
    : Math.floor(heightProp / 2)

  const grid = createNoise(width, height, fold, random)


  function getCell (x, y) {
    return (x < 0 || y < 0 || x >= width || y >= height)
      ? CELL_VARIANT.DEAD
      : grid[y][x]
  }

  function getLivingNeighbours (x, y) {
    let amount = 0

    if (getCell(x - 1, y) === CELL_VARIANT.ALIVE) amount += 1
    if (getCell(x, y - 1) === CELL_VARIANT.ALIVE) amount += 1
    if (getCell(x + 1, y) === CELL_VARIANT.ALIVE) amount += 1
    if (getCell(x, y + 1) === CELL_VARIANT.ALIVE) amount += 1

    return amount
  }

  for (let iteration = 0; iteration < iterations; iteration++) {
    grid.forEach(
      (row, y) => {
        if (y === 0) return

        row.forEach(
          (cell, x) => {
            if (x === 0) return

            const livingNeighbours = getLivingNeighbours(x, y)

            if (cell === CELL_VARIANT.ALIVE) {
              if (livingNeighbours < 2 || livingNeighbours > 3) {
                grid[y][x] = CELL_VARIANT.DEAD;
              }
            } else {
              if (livingNeighbours <= 1) grid[y][x] = CELL_VARIANT.ALIVE
            }
          }
        )
      }
    )
  }

  grid.forEach(
    (row, y) => {
      row.forEach(
        (cell, x) => {
          if (cell !== CELL_VARIANT.DEAD) return
          const livingNeighbours = getLivingNeighbours(x, y)
          if (livingNeighbours > 0) grid[y][x] = CELL_VARIANT.CONTOUR
        }
      )
    }
  )

  if (fold !== FOLD_VARIANT.HORIZONTAL) {
    grid.forEach(
      (row) => {
        row.push(...[...row].reverse())
      }
    )
  }

  if (fold !== FOLD_VARIANT.VERTICAL) {
    grid.push(
      ...grid.map(row => [...row]).reverse()
    )
  }

  return grid
}
