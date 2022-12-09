import fs from "fs"

function getTreesVisionData() {
  let treesGrid = fs
    .readFileSync("input.txt", { encoding: "utf8" })
    .trim()
    .split("\n")
    .map(row => row.split("")
    .map(treeHeight => Number(treeHeight)))
  let treesGrid90 = treesGrid[0].map((_, idx) => treesGrid.map(row => row[idx]).reverse())
  let treeVisionData = []

  for (let a = 0; a < treesGrid.length; a++) {
    let row = treesGrid[a]

    for (let b = 0; b < row.length; b++) {
      let currentTreeHeight = row[b]

      // Sides direction start from current tree
      let left = row.slice(0, b).reverse()
      let right = row.slice(b + 1)
      let top = a === 0 ? [] : treesGrid90[b].slice(-a)
      let bottom = treesGrid90[b].slice(0, treesGrid90[b].length - a - 1).reverse()
      let sides = [left, right, top, bottom]

      let hasEdgeVision = sides.map(side => side.every(treeHeight => currentTreeHeight > treeHeight)).some(side => side)
      let visionScore = sides.reduce((acc, side) => {
        let sideScore = 0;

        for (let treeHeight of side) {
          sideScore++
          if (currentTreeHeight <= treeHeight) break
        }
        
        return sideScore ? sideScore * acc : acc
      }, 1)

      treeVisionData.push({
        position: [a, b],
        height: currentTreeHeight,
        visionScore,
        hasEdgeVision
      })
    }
  }

  return treeVisionData
}


(function () {
  let trees = getTreesVisionData()
  let treesWithEdgeVision = 0
  let highestVisionScore = 0

  for (let tree of trees) {
    if (tree.hasEdgeVision) {
      treesWithEdgeVision++
    }
    if (tree.visionScore > highestVisionScore) {
      highestVisionScore = tree.visionScore
    }
  }

  console.log('Part 1:', treesWithEdgeVision)
  console.log('Part 2:', highestVisionScore)
})()