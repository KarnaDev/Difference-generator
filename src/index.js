import fs from 'fs';
import _ from 'lodash';
import path from 'path';

// const getAbsolutePath = (file) => path.resolve(process.cwd(), file);
// If, after processing given path, an absolute path has not yet been generated,
// the current working directory is used
const getAbsolutePath = (file) => path.resolve(file);

const readFileAsJSON = (filePath) => {
  const absPath = getAbsolutePath(filePath);
  return JSON.parse(fs.readFileSync(absPath));
};

const compareFiles = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  const uniqKeys = _.union(keys1, keys2).sort();
  const diffs = uniqKeys.reduce(((acc, key) => {
    const hasKeyInFile1 = _.has(file1, key);
    const hasKeyInFile2 = _.has(file2, key);

    if (hasKeyInFile1 && hasKeyInFile2) {
      const valuesEqual = _.isEqual(file1[key], file2[key]);
      if (valuesEqual) {
        acc.push(`  ${key}: ${file1[key]}`);
      } else {
        acc.push(`- ${key}: ${file1[key]}`);
        acc.push(`+ ${key}: ${file2[key]}`);
      }
    } else if (hasKeyInFile1) {
      acc.push(`- ${key}: ${file1[key]}`);
    } else if (hasKeyInFile2) {
      acc.push(`+ ${key}: ${file2[key]}`);
    }

    return acc;
  }), []);
  return diffs;
};

const genDiff = (filePath1, filePath2) => {
  const file1 = readFileAsJSON(filePath1);
  const file2 = readFileAsJSON(filePath2);
  const diffs = compareFiles(file1, file2);
  return `{\n  ${diffs.join('\n  ')}\n}`;
};

export default genDiff;
