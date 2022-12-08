import fs from "fs"

function getSumOfElfsCalorieLoads(numberOfElfs) {
  let elfCalorieLoads = fs.readFileSync('input.txt', { encoding: 'utf8' }).split("\n").reduce((acc, value) => {
    if (value) {
      acc[acc.length - 1] = acc[acc.length - 1] + Number(value)
    } else {
      acc.push(0)
    }
    return acc
  }, [0]).sort((a, b) => b - a)

  return elfCalorieLoads.slice(0, numberOfElfs).reduce((acc, value) => acc + value, 0)
}

console.log("Part 1:", getSumOfElfsCalorieLoads(1))
console.log("Part 2:", getSumOfElfsCalorieLoads(3))
