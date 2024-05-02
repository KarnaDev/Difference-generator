import _ from 'lodash';
import readFile from './parsers.js';
import generateTree from './tree-generator.js';
import selectFormatter from './formatter-selector.js';

// Generates differences between two files
export default (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const abstractTree = Object.values(generateTree(file1, file2));

  return selectFormatter(format, abstractTree);
};
