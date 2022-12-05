import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

// Parse init instructions and movement data
const [initInstructions, movements] = data.trim().split('\n\n');

//~ Initialize stacks
const stacks = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [] };
initInstructions.split('\n').reverse().slice(1).forEach(value => {
  for (let i = 1; i < value.length; i += 4) {
    let crate = value.charAt(i);
    if (crate.trim()) {
      stacks[Math.ceil(i / 4)].push(crate);
    }
  }
});

//~ Process movements
const MOVEMENT_REGEXP = /move ([\d]+) from ([\d]+) to ([\d]+)/;
movements.split('\n').forEach(movement => {
  // Parse instructions
  const [, count, source, target] = movement.match(MOVEMENT_REGEXP);
  // Process movement
  let crates = stacks[source].splice(stacks[source].length - count, count);
  stacks[target].push(...crates);
});

const result = Object.keys(stacks)
  .map(index => stacks[index].pop())
  .join('');

console.log(result);
