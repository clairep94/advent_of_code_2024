// Part 1: https://adventofcode.com/2024/day/4

import { test1, actualCase } from "./input"
const KEY_WORD = 'XMAS'
type Direction = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW'

/** Convert string to matrix */
function makeMatrix(longString: string): string [][]{
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
      return (y+1 < height) && (x-1 >= 0) ? [y+1,x-1] : undefined
    case "W":
      return (x-1 >= 0) ? [y,x-1] : undefined
    case "NW": 
      return (y-1 >= 0) && (x-1 >= 0) ? [y-1,x-1] : undefined

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
/** Get value of a cell from a 2d matrix */
function getValue(matrix: string[][], coordinates: [number, number]){
  const [row, col] = coordinates
  return matrix[row][col]
}

/** Starting from an initial cell, check a single direction to see if the adjacent letters match the key word. if not escape early */
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
      break 
    }
    if(foundLetters === key_word){
      return true // should push or increment found count
    }

    lastCoordinate = currentCoordinate
  }

  return false
}

function normalCrossWordSearch(crossword: string, key_word: string, validDirections: Direction[]): [
  { [key:string] : number }, number
] {
  const matrix = makeMatrix(crossword)
  const width = getWidth(matrix)
  const height = getHeight(matrix)

  let cache: { [key:string]: number } = {}

  // traverse each cell in each row
  for(let row=0; row < height; row++){
    for(let col=0; col < width; col ++){

      const currentPosition: [number, number] = [row, col]

      // found first char
      if(getValue(matrix, currentPosition) === key_word[0]){
        directions.forEach(dir => {
          if(findWordInOneDirection(
            matrix,
            key_word,
            currentPosition,
            height,
            width,
            dir
          )){
            if(cache[dir]){
              cache[dir]++
            }else{
              cache[dir] = 1
            }
          }
        })
      }
    }
  }
  const sum = Object.values(cache).reduce((acc, current) => acc + current, 0)
  return [cache, sum]
}

const directions = ['N', 'S', 'E', 'W', 'NW', 'NE', 'SE', 'SW'] as Direction[]

const result = normalCrossWordSearch(actualCase, KEY_WORD, directions)
console.log(result[0])
console.log(result[1])