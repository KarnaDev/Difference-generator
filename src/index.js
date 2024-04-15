import _ from 'lodash';
import readFile from './parsers.js';
import makeStylish from './formatters/stylish.js';
import makePlain from './formatters/plain.js';

// const getAbsolutePath = (file) => path.resolve(process.cwd(), file);
// If, after processing given path, an absolute path has not yet been generated,
// the current working directory is used

// Gets unique keys from two objects
const getUniqueKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  return _.union(keys1, keys2).sort();
};

// Compares two files and creates an abstract tree of differences
const compareFiles = (file1, file2) => {
  const uniqueKeys = getUniqueKeys(file1, file2);
  const differences = {};

  uniqueKeys.forEach((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    // Creates a node in the tree
    const createNode = (nodeKey, nodeValue1, nodeValue2) => {
      const node = { name: nodeKey };

      if (_.isEqual(nodeValue1, nodeValue2)) {
        node.type = 'unchanged';
        node.value = nodeValue1;
      } else if (nodeValue1 === undefined) {
        node.type = 'added';
        node.value = nodeValue2;
      } else if (nodeValue2 === undefined) {
        node.type = 'deleted';
        node.value = nodeValue1;
      } else if (_.isObject(nodeValue1) && _.isObject(nodeValue2)) {
        // Recursively compares nested objects when both values are objects
        const nestedDiff = compareFiles(nodeValue1, nodeValue2);
        node.type = 'nested';
        node.children = Object.values(nestedDiff);
      } else {
        node.type = 'changed';
        node.from = nodeValue1;
        node.to = nodeValue2;
      }

      return node;
    };

    const node = createNode(key, value1, value2);
    differences[key] = node;
  });

  return differences;
};

// Generates differences between two files
const genDiff = (filePath1, filePath2, format = 'stylish') => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const abstractTree = Object.values(compareFiles(file1, file2));

  if (format === 'stylish') {
    return makeStylish(abstractTree);
  } if (format === 'plain') {
    return makePlain(abstractTree);
  }
  throw new Error(`Unexpected format: ${format}`);
};

export default genDiff;
