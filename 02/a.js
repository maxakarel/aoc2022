import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const SHAPE_SCORE = {
  X: 1, // Rock
  Y: 2, // Paper
  Z: 3 // Scissors
};

const ROUND_SCORE = {
  A: { // Rock
    X: 3, // Rock
    Y: 6, // Paper
    Z: 0 // Scissors
  },
  B: { // Paper
    X: 0, // Rock
    Y: 3, // Paper
    Z: 6 // Scissors
  },
  C: { // Scissors
    X: 6, // Rock
    Y: 0, // Paper
    Z: 3 // Scissors
  }
};

const result = data.trim().split('\n')
  .map(round => {
    const [first, second] = round.split(' ');
    return SHAPE_SCORE[second] + ROUND_SCORE[first][second];
  })
  .reduce((acc, value) => acc + value);

console.log(`Result: ${result}`);
