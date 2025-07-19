import { testInput, actualInput } from "./input"


function parseInput(input: string): [
  string[], string[][]
]{
  const initial = input.split('\n\n').map(el => el.split('\n'))
  return [initial[0], initial[1].map(el => el.split(','))]
}

const [rules, printed] = parseInput(testInput)

function findElementsThatNeedToBeAfter(num: string): string[]{
  return rules.filter(el => el.startsWith(`${num}|`)).map(el => {
    const [_, after] = el.split('|')
    return after
  })
}

function checkLineValidity(line: string[]){
  return line.every((target_number,targe_num_index) => {

    const shouldBeAfterTarget = findElementsThatNeedToBeAfter(target_number)

    // check if all nums that should be after the target appear after the target
    return shouldBeAfterTarget.every(afterNum => {
      const foundIndex = line.findIndex((e) => e === afterNum)
      return foundIndex === -1 || foundIndex > targe_num_index // not in row, or el is after the target num
    })
  })
}

function findSumsOfValidRows(rows: string[][]){
  let sum = 0
  for(let i=0; i<rows.length; i++){
    const row = rows[i]
    if(checkLineValidity(row)){
      console.log(row)
      const middleIndex = Math.floor(row.length/2)
      sum += Number(row[middleIndex])
    }
  }
  return sum
}

console.log(findSumsOfValidRows(printed))