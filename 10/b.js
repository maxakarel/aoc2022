import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

/**
 * Resolve pixel value ('#' or '.') based on the specified position and value.
 * @param {*} position Cursor position.
 * @param {*} value Value of X register.
 * @returns '#' when cursor position matches value of X register, '.' otherwise.
 */
const resolvePixel = (position, value) => {
  return value - 1 <= position && position <= value + 1 ? '#' : '.';
};

let cycle = 1;
let position = 0;
let value = 1;
let result = [...Array(6)].map(value => Array(40).fill('-'));

data.trim().split('\n').forEach(command => {
  // Process first cycle
  result[Math.floor((cycle++ - 1) / 40)][position] = resolvePixel(position, value);
  position = ++position === 40 ? 0 : position;
  if (command === 'noop') {
    return; // Finish single cycle instruction
  }
  // Process second cycle
  result[Math.floor((cycle++ - 1) / 40)][position] = resolvePixel(position, value);
  position = ++position === 40 ? 0 : position;
  value += parseInt(command.substring(5), 10);
});

console.log(result.map(row => row.join('')).join('\n'));