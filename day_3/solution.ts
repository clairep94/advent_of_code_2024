// Part 1: https://adventofcode.com/2024/day/3

// need to do text file input bc input as `
import * as fs from 'fs'
import * as path from 'path'

function parseTextFileToString(filePath: string): string{
  try {
    const fileContent: string = fs.readFileSync(filePath, 'utf-8')
    return fileContent
  } catch (error) {
    throw new Error(`error reading filepath: ${filePath}`)
  }
}

function parseInputFile(fileName: string){
  const currentDir = __dirname; // Node.js global for current module's directory
  const inputFilePath = path.join(currentDir, fileName)

  try {
    return parseTextFileToString(inputFilePath)
  } catch (error) {
    console.log(error)
  }
}

const INPUT_FILE_NAME = 'input.txt'

// console.log(
//   parseInputFile(INPUT_FILE_NAME)
// )

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const realInput = parseInputFile(INPUT_FILE_NAME) ?? ''

const FIRST_NUM_UNCLOSED = /^mul\((\d{1,3})$/ // Matches "mul(" followed by 1 to 3 digits (e.g., "mul(1", "mul(12", "mul(123")
const FIRST_NUM_COMMA = /^mul\((\d{1,3}),$/ // Matches "mul(" followed by 1 to 3 digits and a comma (e.g., "mul(1,", "mul(12,", "mul(123,")
const TWO_NUMS_UNCLOSED = /^mul\((\d{1,3}),(\d{1,3})$/ // Matches "mul(" followed by 1-3 digits, a comma, and 1-3 digits (e.g., "mul(1,1", "mul(12,123")
const FULL_MATCH = /^mul\((\d{1,3}),(\d{1,3})\)$/ // Matches "mul(" followed by 1-3 digits, a comma, 1-3 digits, and a closing parenthesis (e.g., "mul(1,1)", "mul(12,123)")

const PATTERNS = [
  FIRST_NUM_UNCLOSED,
  FIRST_NUM_COMMA,
  TWO_NUMS_UNCLOSED,
  FULL_MATCH
];

let matches = []
let latest = ''

function resetLatest(){
  latest = ''
}

function findMultiple(str: string){
  const charsToFilter = ['m','u','l','(',')']
  const removedStr = str
    .split('')
    .filter( el => !charsToFilter.includes(el))
    .join('')

  const nums = removedStr.split(',').map(el => Number(el))
  
  return nums[0] * nums[1]
}

for(let i =0; i< realInput.length; i++){
  const currentChar = realInput[i]

  if(latest.length === 0){ // start queue
    if(currentChar === 'm'){
      latest += currentChar
    }
  } else {
    if(latest.length === 1){
      if(currentChar === 'u'){
        latest += currentChar
      } else {
        resetLatest()
      }
    } else if (latest.length === 2){
      if(currentChar === 'l'){
        latest += currentChar
      } else {
        resetLatest()
      }
    } else if(latest.length === 3){
      if(currentChar === '('){
        latest += currentChar
      } else {
        resetLatest()
      }
    } else {
      latest += currentChar
      if(!PATTERNS.some(regex => regex.test(latest))){
        resetLatest()
      } else {
        if(FULL_MATCH.test(latest)){
          matches.push(latest)
          resetLatest()
        }
      }
    }
  }
}

console.log(matches)

let total = 0
matches.forEach(el => {
  console.log(findMultiple(el))
  total += findMultiple(el)
})

console.log("TOTAL:",total)
