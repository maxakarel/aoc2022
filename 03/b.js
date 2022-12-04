import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import _ from 'lodash';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const groupItems = _.chunk(data.trim().split('\n'), 3);

const groupBadges = groupItems.map(items => {
  return _.intersection([...items[0]], [...items[1]], [...items[2]])[0];
}).filter(value => !!value);

const result = groupBadges.map(item => {
  return item.charCodeAt() > 96 ? item.charCodeAt() - 96 : item.charCodeAt() - 38;
}).reduce((acc, value) => acc + value, 0);

console.log(`Result: ${result}`);
