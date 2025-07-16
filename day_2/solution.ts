import { count } from "console";
import { testInput, input } from "./input";

// part 1:
/**
 * Convert string input to numbers 2d matrix
 * @param str 
 * @returns 2d array of numbers
 */
function convertToNumMatrix(str: string): number[][]{
  const rows = str.split('\n')
  return rows.map(el => el.split(' ').map(num => Number(num)))
}
const testMatrix = convertToNumMatrix(testInput)
const realMatrix = convertToNumMatrix(input)

// console.log('real matrix', realMatrix)

/**
 * Evaluate a single row for safety
 * safe if nums are strictly decreasing or strictly increasing & differences is at least one and at most three 
 * @param row 
 * @returns 
 */
function evaluateRowSafety(row: number[]): boolean{
  let direction: 'up' | 'down' = 'up' // set 'up' as default

  for(let i =0; i<row.length-1; i++){
    let current = row[i]
    let next = row[i+1]

    if(current === next){ return false}
    if(Math.abs(current - next) > 3) { return false }

    //set direction
    if(i === 0){
      if(current > next){ direction = 'down'} 
    //check direction
    } else {
      if(direction === 'down' && current < next){ return false}
      if(direction === 'up' && current > next){ return false}
    }
  }
  return true
}

testMatrix.forEach(el => {
  console.log(el, evaluateRowSafety(el))
})

/**
 * Return count of safe rows
 * @param matrix 
 * @returns 
 */
function countSafeRows(matrix: number[][]): number{
  let count = 0

  for(let i =0; i<matrix.length; i++){
    if(evaluateRowSafety(matrix[i])){
      count++
    }
  }

  return count
}
console.log('test input safe rowcount', countSafeRows(testMatrix))
console.log('actual input safe rowcount', countSafeRows(realMatrix))

// Part 2:
// https://adventofcode.com/2024/day/2#part2

/**
 * Remove current element and check if row is safe
 * @param row 
 * @returns 
 */
function removeCurrentElAndCheckSafety(row: number[]): boolean{
  if(evaluateRowSafety(row)){ return true } // only start the tolerant check if necessary

  else {
    for(let i=0; i<row.length; i++){
      const copy = structuredClone(row) //idk if this is necessary but to avoid mutation

      copy.splice(i, 1)
      // console.log('copy with el removed:', row[i], copy, evaluateRowSafety(copy))
      if(evaluateRowSafety(copy)){
        return true
      }
    }
  }

  return false // reached end of row and none of the remove els copies pass
}

console.log('tolerant check:')
testMatrix.forEach(el => {
  console.log("FOR ROW:", el, ":", removeCurrentElAndCheckSafety(el))
})

/**
 * Count safe rows using the tolerant version of the check -- removeCurrentElAndCheckSafety
 * @param matrix 
 * @returns 
 */
function tolerantCountSafeRows(matrix: number[][]): number{
  let count = 0

  for(let i =0; i<matrix.length; i++){
    if(removeCurrentElAndCheckSafety(matrix[i])){
      count++
    }
  }

  return count
}
console.log('test input TOLERANT safe rowcount', tolerantCountSafeRows(testMatrix))
console.log('actual input TOLERANT safe rowcount', tolerantCountSafeRows(realMatrix))


