import * as fs from 'fs'
import { URL } from 'url'

const inputPath = new URL('../tests/test0.in', import.meta.url)
const input = fs.readFileSync(inputPath).toString()

const lines = input.split(/\r?\n/)
const gridSize = lines[0].length
const grid = lines.slice(0, gridSize).map(line => line.split(''))
const scannedValues = lines.slice(gridSize).map(line => line.split(' ').map(x => Number(x)))
const distances = getDistances()

function getDistances() {
  let distances = []
  let scannedIndex = 0

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if(cell === 'A') {
        distances.push({
          x: rowIndex,
          y: columnIndex,
          z: scannedValues[scannedIndex][0],
          probability: scannedValues[scannedIndex][1],
        })
        scannedIndex++
      }
    })
  });

  return distances
}
