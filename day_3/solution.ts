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



