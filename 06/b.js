import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

for (let i = 0; i < data.length - 14; i++) {
  let packet = data.substring(i, i + 14);
  if (packet.length === new Set(packet).size) {
    console.log(`Result: ${i + 14}`);
    break;
  }
}
