let fs = require("fs/promises")
let path = require("path")

// Opponent
// A: Rock, B: Papper, C: Scissors

// Player
// X: Rock, Y: Papper, Z: Scissors

// Scores
// Lose: 0
// Win: 6
// Draw: 3

// Rock: 1
// Papper: 2
// Scissors: 3

let conditions = {
  "A": {
    "X": 1 + 3,
    "Y": 2 + 6,
    "Z": 3 + 0,
  },
  "B": {
    "X": 1 + 0,
    "Y": 2 + 3,
    "Z": 3 + 6,
  },
  "C": {
    "X": 1 + 6,
    "Y": 2 + 0,
    "Z": 3 + 3,
  },
}

async function calcGameScore() {
  try {
    let input = await fs.readFile(path.resolve("input.txt"), { encoding: 'utf8' })
    let rounds = input.split("\n")
    let totalScore = 0

    for (let round of rounds) {
      let opponent = round[0]
      let player = round[2]
      let roundScore = conditions[opponent][player]
      totalScore += roundScore
    }

    console.log(totalScore)
  } catch (error) {
    console.error(error)
  }
}

calcGameScore()