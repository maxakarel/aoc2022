import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const ROUND_SCORE = {
  X: 0, // Lose
  Y: 3, // Draw
  Z: 6 // Win
};

const SHAPE_SCORE = {
  A: { // Rock
    X: 3, // Lose (Scissors)
    Y: 1, // Draw (Rock)
    Z: 2 // Win (Paper)
  },
  B: { // Paper
    X: 1, // Lose (Rock)
    Y: 2, // Draw (Paper)
    Z: 3 // Win (Scissors)
  },
  C: { // Scissors
    X: 2, // Lose (Paper)
    Y: 3, // Draw (Scissors)
    Z: 1 // Win (Rock)
  }
};

const result = data.trim().split('\n')
  .map(round => {
    const [first, second] = round.split(' ');
    return ROUND_SCORE[second] + SHAPE_SCORE[first][second];
  })
  .reduce((acc, value) => acc + value);

console.log(`Result: ${result}`);
