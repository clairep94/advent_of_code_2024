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