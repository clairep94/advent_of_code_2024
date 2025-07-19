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
    case "NE": 
      return (y-1 >= 0) && (x+1 < width)  ? [y-1,x+1] : undefined
    case "E": 
      return (x+1 < width) ? [y,x+1] : undefined
    case "SE":
      return (y+1 < height) && (x+1 < width) ? [y+1,x+1] : undefined
    case "S":
      return (y+1 < height) ? [y+1,x] : undefined
    case "SW":
      return (y+1 < height) && (x-1 > 0) ? [y+1,x-1] : undefined
    case "W":
      return (x-1 > 0) ? [y,x-1] : undefined
    case "NW": 
      return (y-1 >= 0) && (x-1 > 0) ? [y-1,x-1] : undefined

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

let XMAS_COUNT: {
  [key: string]: number
} = {}
const width = getWidth(matrix_1)
const height = getHeight(matrix_1)

function getValue(matrix: string[][], coordinates: [number, number]){
  const [row, col] = coordinates
  return matrix[row][col]
}

const directions = ['E', 'W'] as Direction[]

for(let row=0; row < height; row++){
  for(let col=0; col < width; col ++){
    const currentPosition: [number, number] = [row, col]

    // found "M"
    if(getValue(matrix_1, currentPosition) === KEY_WORD[0]){


      directions.forEach(dir => {
        if(findWordInOneDirection(
          matrix_1,
          KEY_WORD,
          currentPosition,
          height,
          width,
          dir
        )){
          if(XMAS_COUNT[dir]){
            XMAS_COUNT[dir]++
          }else{
            XMAS_COUNT[dir] = 1
          }
        }
      })
    }
  }
}

function findWordInOneDirection(matrix:string[][], key_word:string, startingPosition:[number, number], height:number, width:number, direction:Direction): boolean{
  let lastCoordinate = startingPosition
  let foundLetters = key_word[0]

  for(let i=1; i < key_word.length; i++){
    const currentCoordinate = findAdjacentUnit(lastCoordinate, height, width, direction)
    if(!currentCoordinate){ 
          break // reached edge
    }

    const currentLetter = getValue(matrix, currentCoordinate)
    foundLetters += currentLetter

    if(currentLetter !== key_word[i]) {
      console.log('broken:', direction, foundLetters) 
      break 
    }
    if(foundLetters === key_word){
      return true // should push or increment found count
    }

    lastCoordinate = currentCoordinate
  }

  return false
}

console.log(XMAS_COUNT)