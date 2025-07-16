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

console.log(
  parseInputFile(INPUT_FILE_NAME)
)

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

let matches = []
let latest = ''

for(let i =0; i< testInput.length; i++){
  const currentChar = testInput[i]

  if(latest.length === 0){ // start queue
    if(currentChar === 'm'){
      latest += currentChar
    }
  } else {
    if(latest.length === 1){
      if(currentChar === 'u'){
        latest += currentChar
      } else {
        latest = ''
      }
    } else if (latest.length === 2){
      if(currentChar === 'l'){
        latest += currentChar
      } else {
        latest = ''
      }
    } else if(latest.length === 3){
      if(currentChar === '('){
        latest += currentChar
      } else {
        latest = ''
      }
    } else if( latest.length === 4 ){
      const numAttempt = Number(currentChar)
      if(!isNaN(numAttempt)){
        latest += currentChar

        //temporary
        matches.push(latest)
        latest = ''
      } else {
        latest = ''
      }
    }
  }
}

console.log(matches)
// traverse string via pop & queue
  // find matches for mul(X,Y) -- X and Y are 1-3 digits max 
    // escape early and continue if no match -- use regex??
  // if found full-match
    // sum += multiplication

const PATTERNS = {
  1: /^m$/, //m
  2: /^mu$/, //mu
  3: /^mul$/, //mul
  4: /^mul\($/, //mul(
  5: /^mul\((\d{1,3})$/,
  6: /^mul\((\d{1,3})\)$/,
  7: /^mul\((\d{1,3})\),$/
}
const partialMatchRegex = /^mul\((\d{1,3})\),$/ // mul(1, mul(12, mul(123,
const fullMatchRegex = /^mul\(\d{1,3},\d{1,3}$/ // mul(1,12) etc.



