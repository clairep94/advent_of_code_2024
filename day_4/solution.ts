// Part 1: https://adventofcode.com/2024/day/4

import { test1 } from "./input"
const KEY_WORD = 'XMAS'
type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'


function makeMatrix(longString: string){
  const rows = longString.split('\n')
  return rows.map(row => row.split(''))
}

/** Find coordinates -- [row, col] */
function findAdjacentUnit(coordinates: [number, number], height: number, width: number, direction: Direction): [number, number] | undefined{
  const [y, x] = coordinates

  switch(direction) {
    case "N": 
      return (y-1 >= 0) ? [y-1,x] : undefined
    case "E": 
      return (x+1 < width) ? [y,x+1] : undefined
    case "S":
      return (y+1 < height) ? [y+1,x] : undefined
    case "W":
      return (x-1 > 0) ? [y,x-1] : undefined

    default:
      return [y, x]
  }
}

function getHeight(matrix: string[][]){
  return matrix.length
}
function getWidth(matrix: string[][]){
  return matrix[0].length
}

const matrix_1 = makeMatrix(test1)
// console.log(matrix_1)

console.log(
  findAdjacentUnit(
    [9,9],
    getWidth(matrix_1),
    getHeight(matrix_1),
    'E'
  )
)

let E_XMAS = []
const width = getWidth(matrix_1)
const height = getHeight(matrix_1)

function getValue(matrix: string[][], coordinates: [number, number]){
  const [row, col] = coordinates
  return matrix[row][col]
}

for(let row=0; row < height; row++){
  for(let col=0; col < width; col ++){
    const currentPosition: [number, number] = [row, col]

    // found "M"
    if(getValue(matrix_1, currentPosition) === KEY_WORD[0]){
      console.log('Found X at:', currentPosition)
      let lastCoordinate = currentPosition
      let currentWord = KEY_WORD[0]

      // check each adjacent letter in one direction
      for(let i=1; i < KEY_WORD.length; i++){
        const currentCoordinate = findAdjacentUnit(lastCoordinate, height, width, 'E')
        if(!currentCoordinate){ 
          break 
        }

        const currentLetter = getValue(matrix_1, currentCoordinate)
        console.log('Adjacent letter:', currentCoordinate, currentLetter)
        if(currentLetter !== KEY_WORD[i]) { break }
        
        currentWord += currentLetter
        if(i === KEY_WORD.length-1){
          E_XMAS.push(currentWord)
        }
        lastCoordinate = currentCoordinate
      }
    }
  }
}

console.log(E_XMAS)