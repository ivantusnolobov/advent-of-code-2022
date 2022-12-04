let fs = require("fs")
let path = require("path")

// Part 1
function countContainedPairs() {
  let pairs = getPairs()
  let count = 0

  for (let pair of pairs) {
    let a1 = pair[0][0]
    let a2 = pair[0][1]
    let b1 = pair[1][0]
    let b2 = pair[1][1]

    let isContainedByA = a1 <= b1 && a2 >= b2
    let isContainedByB = b1 <= a1 && b2 >= a2

    if (isContainedByA || isContainedByB) count++
  }

  return count
}

// Part 2
function countOverlapedPairs() {
  let pairs = getPairs()
  let count = 0

  for (let pair of pairs) {
    let a1 = pair[0][0]
    let a2 = pair[0][1]
    let b1 = pair[1][0]
    let b2 = pair[1][1]
    let isOverlaped = a1 <= b2 && b1 <= a2
    if (isOverlaped) count++
  }

  return count
}

console.log(countContainedPairs())
console.log(countOverlapedPairs())

function getInput() {
  return (fs.readFileSync(path.resolve("input.txt"), { encoding: "utf8" })).trim()
}

function getPairs() {
  return getInput().split("\n").map(pair => {
    let splited = pair.split(",")
    let pair1 = splited[0].split("-")
    let pair2 = splited[1].split("-")
    return [[+pair1[0], +pair1[1]],[+pair2[0], +pair2[1]]]
  })
}