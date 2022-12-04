import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Class representing range with <x,y> coordinates.
 */
class Range {

  constructor(section) {
    let parsed = section.split('-');
    this.x = parseInt(parsed[0], 10);
    this.y = parseInt(parsed[1], 10);
  }

  /**
   * Check whether current range overlaps the specifed one.
   * @param {*} range Range to check. Never null.
   * @returns true when the range overlaps, false otherwise.
   */
  overlaps(range) {
    return (this.x <= range.x && range.x <= this.y) || (this.x <= range.y && range.y <= this.y);
  }
}

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const result = data.trim().split('\n').filter(sections => {
  let parsed = sections.split(',');
  let firstRange = new Range(parsed[0]);
  let secondRange = new Range(parsed[1]);
  return firstRange.overlaps(secondRange) || secondRange.overlaps(firstRange);
});

console.log(`Result: ${result.length}`);
