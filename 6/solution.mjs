import fs from 'fs'

function findStartOfMessage(sequenceLength) {
  let input = fs.readFileSync("input.txt", { encoding: "utf8" }).trim().split("")
  let sequenceOffset = sequenceLength - 1

  for (let i = 0; i < input.length - sequenceOffset; i++) {
    let hashset = new Set()
    let pointA = i
    let pointB = i + sequenceOffset

    while (pointA <= pointB) {
      hashset.add(input[pointA])
      pointA++
    }

    if (hashset.size === sequenceLength) {
      return pointB + 1
    }
  }
}

// Part 1
console.log(findStartOfMessage(4))

// Part 2
console.log(findStartOfMessage(14))