const fs = require('fs/promises')
const path = require('path')

async function printMaxCalories() {
  try {
    const input = await fs.readFile(path.resolve('input.txt'), { encoding: 'utf8' })
    let elfSums = []
    let currentElfSum = 0
    
    for (let snac of input.split("\n")) {
      if (snac) {
        currentElfSum += Number(snac)
      } else {
        elfSums.push(currentElfSum)
        currentElfSum = 0
      }
    }

    console.log(Math.max(...elfSums))
  } catch (err) {
    console.log(err)
  }
}

printMaxCalories()