import fs from "fs"

// Part 1
function rearrangeP1() {
  let { stacks, instructions } = getData() 
  
  for (let instruction of instructions) {
    let { amount, from, to } = instruction

    while (amount > 0) {
      let crate = stacks[from].get()
      stacks[to].set([crate])
      amount--;
    }
  }

  return stacks.map(stack => stack.get()).join("")
}

console.log("Part 1:", rearrangeP1())

// Part 2
function rearrangeP2() {
  let { stacks, instructions } = getData() 
  
  for (let instruction of instructions) {
    let { amount, from, to } = instruction
    let crates = stacks[from].get(amount)
    stacks[to].set(crates)
  }

  return stacks.map(stack => stack.get()).join("")
}

console.log("Part 2:", rearrangeP2())

function getData() {
  let input = getInput()
  let stacks = parseStacks(input)
  let instructions = parseInstructions(input)

  return { stacks, instructions }
}

function parseInstructions(input) {
  let rawInstructions = input.filter(string => string.startsWith("move"))
  return rawInstructions.map(line => line.split(" ").filter(item => !isNaN(Number(item)))).map(item => ({ amount: Number(item[0]), from: Number(item[1]) - 1, to: Number(item[2]) - 1 }))
}

function parseStacks(input) {
  class Stack {
    data = []
    get length() {
      return this.data.length
    }
    set(items) {
      this.data = [...this.data, ...items]
    }
    get(amount = 1) {
      let subStack = this.data.slice(-amount)
      this.data.splice(-amount)
      return subStack
    }
  }

  let rawStacks = input.filter(string => !string.startsWith("move")).slice(0, -2).reverse();
  let stacks = []

  for (let a = 0; a < rawStacks.length; a++) {
    let row = rawStacks[a]
    let col = 0

    for (let b = 1; b < row.length; b += 4) {
      let item = row[b]
      let isLetter = item.match(/[A-Z]/g)

      if (isLetter) {
        if (!stacks[col]) {
          stacks[col] = new Stack()
        }
        stacks[col].set(item)
      }
      col++
    }
  }

  return stacks
}

function getInput() {
  return fs.readFileSync("input.txt", { encoding: "utf8" }).split("\n")
}