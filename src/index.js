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

const getUniqKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  return _.union(keys1, keys2).sort();
};

const compareFiles = (file1, file2) => {
  const uniqKeys = getUniqKeys(file1, file2);
  const diffs = uniqKeys.flatMap((key) => {
    const valuesEqual = _.isEqual(file1[key], file2[key]);

    if (_.has(file1, key) && _.has(file2, key) && valuesEqual) {
      return [`  ${key}: ${file1[key]}`];
    } else if (_.has(file1, key) && _.has(file2, key) && !valuesEqual) {
      return [`- ${key}: ${file1[key]}`, `+ ${key}: ${file2[key]}`];
    } else if (_.has(file1, key)) {
      return [`- ${key}: ${file1[key]}`];
    } else if (_.has(file2, key)) {
      return [`+ ${key}: ${file2[key]}`];
    }
  });
  return diffs;
};

const genDiff = (filePath1, filePath2) => {
  const file1 = readFileAsJSON(filePath1);
  const file2 = readFileAsJSON(filePath2);
  const diffs = compareFiles(file1, file2);
  return `{\n  ${diffs.join('\n  ')}\n}`;
};

export default genDiff;
