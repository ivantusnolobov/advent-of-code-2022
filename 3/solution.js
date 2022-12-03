// Part 1
function calcMisplacedItems() {
  let bags = getInput()
  let score = 0

  for (let bag of bags) {
    let mid = bag.length / 2
    let leftPart = new Set(bag.slice(0, mid))
    let rightPart = bag.slice(mid)
    
    for (let item of rightPart) {
      if (leftPart.has(item)) {
        score += getItemPriority(item)
        break
      }
    }
  }

  return score
}

// Part 2
function calcGroupBadges() {
  let bags = getInput().map(bag => new Set(bag))
  let score = 0

  for (let i = 0; i < bags.length; i+=3) {
      let elf1 = bags[i]
      let elf2 = bags[i + 1]
      let elf3 = bags[i + 2]

      for (let item of elf1) {
        if (elf2.has(item) && elf3.has(item)) {
          score += getItemPriority(item)
          break
        }
      }
  }
  
  return score
}

console.log("Part 1 answer is", calcMisplacedItems())
console.log("Part 2 answer is", calcGroupBadges())

// Helpers
function getInput() {
  let fs = require("fs")
  let path = require("path")

  try {
    return fs.readFileSync(path.resolve("input.txt"), { encoding: "utf8" }).trim().split("\n").map(i => Array.from(i.trim()))
  } catch (error) {
    console.error(error)
    return []
  }
}

function getItemPriority(item) {
  let UPPERCASE_CODE_OFFSET = 38
  let LOWERCASE_CODE_OFFSET = 96
  let code = item.charCodeAt()
  let isUppercase = code >= 65 && code <= 90
  return isUppercase ? code - UPPERCASE_CODE_OFFSET : code - LOWERCASE_CODE_OFFSET
}