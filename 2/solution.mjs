import fs from "fs"

// Points
// Lose: 0
// Win: 6
// Draw: 3

// Rock: 1
// Papper: 2
// Scissors: 3

function part1() {
  let rounds = fs.readFileSync("input.txt", { encoding: 'utf8' }).split("\n")
  let score = 0

  // Opponent
  // A: Rock, B: Papper, C: Scissors

  // Player
  // X: Rock, Y: Papper, Z: Scissors

  let conditions = {
    // Rock
    "A": {
      // Rock
      "X": 1 + 3,
      // Papper
      "Y": 2 + 6,
      // Scissors
      "Z": 3 + 0,
    },
    // Papper
    "B": {
      // Rock
      "X": 1 + 0,
      // Papper
      "Y": 2 + 3,
      // Scissors
      "Z": 3 + 6,
    },
    // Scissors
    "C": {
      // Rock
      "X": 1 + 6,
      // Papper
      "Y": 2 + 0,
      // Scissors
      "Z": 3 + 3,
    },
  }

  for (let round of rounds) {
    let opponent = round[0]
    let player = round[2]
    let roundScore = conditions[opponent][player]
    score += roundScore
  }

  console.log("Part 1:", score)
}

function part2() {
  let rounds = fs.readFileSync("input.txt", { encoding: 'utf8' }).split("\n")
  let score = 0
  let conditions = {
    // Lose
    X: {
      // Rock
      A: 0 + 3,
      // Papper
      B: 0 + 1,
      // Scissors
      C: 0 + 2,
    },
    // Draw
    Y: {
      // Rock
      A: 3 + 1,
      // Papper
      B: 3 + 2,
      // Scissors
      C: 3 + 3,
    },
    // Win
    Z: {
      // Rock
      A: 6 + 2,
      // Papper
      B: 6 + 3,
      // Scissors
      C: 6 + 1,
    },
  }

  for (let round of rounds) {
    let opponent = round[0]
    let gameResult = round[2]
    let roundScore = conditions[gameResult][opponent]
    score += roundScore
  }

  console.log("Part 2:", score)
}

part1()
part2()