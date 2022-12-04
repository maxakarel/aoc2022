import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const commonItems = data.trim().split('\n').map(items => {
  // Resolve comparment items
  let first = items.substring(0, items.length / 2);
  let second = items.substring(items.length / 2, items.length);
  // Find common item
  return [...first].find(item => second.indexOf(item) >= 0);
});

const result = commonItems.map(item => {
  return item.charCodeAt() > 96 ? item.charCodeAt() - 96 : item.charCodeAt() - 38;
}).reduce((acc, value) => acc + value, 0);

console.log(`Result: ${result}`);
