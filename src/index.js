import _ from 'lodash';
import readFile from './parsers.js';

// const getAbsolutePath = (file) => path.resolve(process.cwd(), file);
// If, after processing given path, an absolute path has not yet been generated,
// the current working directory is used

const getUniqKeys = (file1, file2) => {
  const keys1 = _.keys(file1);
  const keys2 = _.keys(file2);
  return _.union(keys1, keys2).sort();
};
const compareFiles = (file1, file2) => {
  const uniqKeys = getUniqKeys(file1, file2);
  const diffs = [];

  uniqKeys.forEach((key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    if (_.isEqual(value1, value2)) {
      diffs.push(`  ${key}: ${value1}`);
    } else if (value1 === undefined) {
      diffs.push(`+ ${key}: ${value2}`);
    } else if (value2 === undefined) {
      diffs.push(`- ${key}: ${value1}`);
    } else {
      diffs.push(`- ${key}: ${value1}`, `+ ${key}: ${value2}`);
    }
  });

  return diffs;
};

const genDiff = (filePath1, filePath2) => {
  const file1 = readFile(filePath1);
  const file2 = readFile(filePath2);
  const diffs = compareFiles(file1, file2);
  return `{\n  ${diffs.join('\n  ')}\n}`;
};

export default genDiff;
