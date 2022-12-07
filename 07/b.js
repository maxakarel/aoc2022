import { readFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const filePath = resolve(dirname(fileURLToPath(import.meta.url)), 'input.data');
const data = await readFile(filePath, 'utf-8');

const FILE_PATTERN = /^([\d]+) ([\w.]+)$/;

/**
 * Class representing file.
 */
class File {

  name = null;
  size = null;

  constructor(name, size) {
    this.name = name;
    this.size = parseInt(size, 10);
  }

}

/**
 * Class representing directory with files.
 */
class Directory {

  name = null;
  parent = null;
  files = [];
  directories = [];

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;
  }

  /**
   * Append file into directory.
   * @param {*} file File to append.
   */
  addFile(file) {
    this.files.push(file);
  }

  /**
   * Append child directory with the specified name into diretory.
   * @param {*} name Name of the directory.
   */
  addDirectory(name) {
    this.directories.push(new Directory(name, this));
  }

  /**
   * Find child directory with the specified name.
   * @param {*} name Name of the child directory.
   */
  getDirectory(name) {
    return this.directories.find(directory => directory.name === name);
  }

  /**
   * Get all child (even indirect) directories.
   */
  getDirectories() {
    return this.directories.concat(this.directories.flatMap(directory => directory.getDirectories()));
  }

  /**
   * Get total size of all files in the directory.
   */
  size() {
    let directorySize = this.directories.reduce((acc, directory) => acc + directory.size(), 0);
    let fileSize = this.files.reduce((acc, file) => acc + file.size, 0);
    return directorySize + fileSize;
  }

}

//~ Build directory structure
let rootDir = new Directory('/');
let currentDir = null;
data.trim().split('\n').forEach(line => {
  if (line === '$ cd /') { // Go to the root directory
    currentDir = rootDir;
  } else if (line === '$ cd ..') { // Go to the parent directory
    currentDir = currentDir.parent;
  } else if (line.startsWith('$ cd')) { // Go to the specified directory
    let dirName = line.substring(5);
    if (!currentDir.getDirectory(dirName)) {
      currentDir.addDirectory(dirName);
    }
    currentDir = currentDir.getDirectory(dirName);
  } else if (line.startsWith('dir')) { // Add new child directory
    let dirName = line.substring(4);
    if (!currentDir.getDirectory(dirName)) {
      currentDir.addDirectory(dirName);
    }
  } else if (FILE_PATTERN.test(line)) { // Add new file
    let [,fileSize, fileName] = line.match(FILE_PATTERN);
    currentDir.addFile(new File(fileName, fileSize));
  }
});


// Resolve minimal directory size to remove
const minSize = 30000000 - (70000000 - rootDir.size());

const directory = rootDir.getDirectories()
  .sort((a, b) => a.size() - b.size())
  .find(directory => directory.size() >= minSize);

console.log(directory.size());
