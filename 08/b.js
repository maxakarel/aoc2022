import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

/**
 * Resolve scenic score for the specified tree.
 */
const resolveScore = (tree, alley) => {
  let index = alley.findIndex(current => current >= tree);
  return alley.slice(0, index !== -1 ? index + 1 : alley.length).length;
};

const grid = data.trim().split('\n')
  .map(row => [...row].map(tree => parseInt(tree, 10)));
const transposedGrid = grid[0].map((column, index) => grid
  .map(row => row[index]));

let maxScore = 0;

for (let row = 0; row < grid.length; row++) {
  for (let column = 0; column < grid[0].length; column++) {
    let current = grid[row][column];
    let up = resolveScore(current, transposedGrid[column].slice(0, row).reverse());
    let left = resolveScore(current, grid[row].slice(0, column).reverse());
    let down = resolveScore(current, transposedGrid[column].slice(row + 1, transposedGrid.length));
    let right = resolveScore(current, grid[row].slice(column + 1, grid.length));
    let sum = up * left * down * right;
    if (sum > maxScore) {
      maxScore = sum;
    }
  }
}

console.log(maxScore);
