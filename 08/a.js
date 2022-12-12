import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

/**
 * Check if the specified tree is visible in the specicied alley (row / column of trees).
 */
const isVisible = (tree, alley) => {
  return alley.every(current => current < tree);
};

const grid = data.trim().split('\n')
  .map(row => [...row].map(tree => parseInt(tree, 10)));
const transposedGrid = grid[0].map((column, index) => grid
  .map(row => row[index]));

let result = 2 * (grid.length - 1) + 2 * (grid[0].length - 1);

for (let row = 1; row < grid.length - 1; row++) {
  for (let column = 1; column < grid[0].length - 1; column++) {
    let current = grid[row][column];
    let left = isVisible(current, grid[row].slice(0, column));
    let right = isVisible(current, grid[row].slice(column + 1, grid.length));
    let up = isVisible(current, transposedGrid[column].slice(0, row));
    let down = isVisible(current, transposedGrid[column].slice(row + 1, transposedGrid.length));
    if (left || right || up || down) {
      result++;
    }
  }
}

console.log(result);
