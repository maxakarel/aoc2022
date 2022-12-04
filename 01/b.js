import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const calories = data
  .split('\n\n')
  .map(chunk => chunk
    .split('\n')
    .map(value => parseInt(value, 10))
    .reduce((acc, value) => acc + value), 0)
  .sort((a, b) => b - a);

const result = calories.slice(0, 3).reduce((acc, value) => acc + value, 0);

console.log(`Result: ${result}`);
