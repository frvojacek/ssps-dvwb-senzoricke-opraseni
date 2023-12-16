import * as fs from 'fs'
import { URL } from 'url'

const inputPath = new URL('../tests/test0.in', import.meta.url)
const input = fs.readFileSync(inputPath).toString()

const lines = input.split(/\r?\n/)
const gridSize = lines[0].length
const grid = lines.slice(0, gridSize).map(line => line.split(''))
const scannedValues = lines.slice(gridSize).map(line => line.split(' ').map(x => Number(x)))
const axes = ['x', 'y', 'z']
const distances = getDistances()

function getDistances() {
  let distances = []
  let scannedIndex = 0

  grid.forEach((row, rowIndex) => {
    row.forEach((cell, columnIndex) => {
      if(cell === 'A') {
        distances.push({
          x: columnIndex,
          y: rowIndex,
          z: scannedValues[scannedIndex][0],
          probability: scannedValues[scannedIndex][1],
        })
        scannedIndex++
      }
    })
  });

  return distances
}

const averagePosition = getAveragePosition()

function getAveragePosition() {
  let averagePosition = { x: 0, y: 0, z: 0 }

  distances.forEach(distance => {
    axes.forEach(axis => {
      averagePosition[axis] += distance[axis]
    });
  })

  axes.forEach(axis =>{
    averagePosition[axis] /= distances.length
    averagePosition[axis] = Math.floor(averagePosition[axis])
  })

  return averagePosition
}

const filteredDistances = distances.filter(distance => { return computeDistance(averagePosition, distance) <= gridSize / 2 })

// Geometric mean theorem 
function computeDistance (a, b) {
  let toExtractRoot = 0
  axes.forEach(axis => {
    toExtractRoot += Math.pow(a[axis] - b[axis], 2)
  });
  
  return Math.sqrt(toExtractRoot)
}