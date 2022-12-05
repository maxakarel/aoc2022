import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import _ from 'lodash';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

// Parse init instructions and movement data
const parsedInput = data.trim().split('\n\n');

//~ Initialize stacks
const stacks = {};
_.reverse(parsedInput[0].split('\n')).forEach(value => {
  let crates = [...value];
  let stack = 1;
  for (let i = 1; i < crates.length; i = i + 4) {
    if (!stacks[stack]) {
      stacks[stack] = [];
    } else if (crates[i].trim()) {
      stacks[stack].push(crates[i]);
    }
    stack++;
  }
});

//~ Process movements
const MOVEMENT_REGEXP = /move ([\d]+) from ([\d]+) to ([\d]+)/;
parsedInput[1].split('\n').forEach(movement => {
  // Parse instructions
  let count, source, target;
  [, count, source, target] = movement.match(MOVEMENT_REGEXP);
  // Process movement
  let crates = stacks[source].splice(stacks[source].length - count, count);
  stacks[target].push(...crates);
});

const result = Object.keys(stacks).map(index => _.last(stacks[index])).join('');

console.log(result);
