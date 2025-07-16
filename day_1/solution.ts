import { input } from './input'

/**
 * Split string input into left and right arrs
 * @param str
 */
function splitInput(str: string) {
  const _str = str.split('   ')
  const arr = _str.map(el => el.split('\n')).flat()
  // console.log('spliting string into one long arr:', arr)

  const left:number[] = []
  const right:number[] = []
  arr.forEach((el, index) => {
    if (isNaN(Number(el))) {
      console.log('ERROR FOR', el)
    }
    if (index % 2 === 0) {
      left.push(Number(el))
    }
    else {
      right.push(Number(el))
    }
  })
  left.sort((a, b) => a - b)
  right.sort((a, b) => a - b)

  return [left, right]
}

const [left, right] = splitInput(input)

console.log('left', left.length, left)
console.log('right', right.length, right)

/**
 *
 * @param l
 * @param r
 */
function findDiff(l: number[], r: number[]) {
  if (l.length !== r.length) {
    console.log('ERROR, diff lengths', l.length, r.length)
    return
  }
  // // ASSUMING SAME LENGTH:
  let sum = 0
  for (let i = 0; i < l.length; i++) {
    const diff = Math.abs(l[i] - r[i])
    sum += diff
  }
  return sum
}

console.log(findDiff(left, right))

type Count = {
    [key:string]: number
  }
/**
 *
 * @param array
 */
function findCount(array: number[]) {
  const cache: Count = {}

  for (let i = 0; i < array.length; i++) {
    if (!cache[array[i]]) {
      cache[array[i]] = 1
    }
    else {
      cache[array[i]]++
    }
  }

  return cache
}

const rightCount = findCount(right)

console.log('count of right', rightCount)

/**
 *
 * @param left_arr
 * @param right_count
 */
function findSimilarityScore(left_arr: number[], right_count: Count) {
  let similaritySum = 0

  for (let i = 0; i < left_arr.length; i++) {
    const leftNum = left_arr[i]
    const count = right_count[leftNum] ?? 0
    similaritySum += (leftNum * count)
  }

  return similaritySum
}

console.log('similary sum', findSimilarityScore(left, rightCount))