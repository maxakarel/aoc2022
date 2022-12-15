import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

/**
 * Check strength for the specified cycle and register value.
 * @param {*} cycle cycle to check.
 * @param {*} value register value.
 * @returns computed strenght for significant cycles, zero otherwise.
 */
const checkStrength = (cycle, value) => {
  if (cycle >= 20 && cycle <= 220 && cycle % 40 === 20) {
    return cycle * value;
  }
  return 0;
};

let cycle = 0;
let value = 1;
let result = 0;

data.trim().split('\n').forEach(command => {
  if (command === 'noop') {
    result += checkStrength(++cycle, value);
  } else if (command.startsWith('addx')) {
    result += checkStrength(++cycle, value);
    result += checkStrength(++cycle, value);
    value += parseInt(command.substring(5), 10);
  }
});

console.log(result);