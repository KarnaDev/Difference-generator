import fs from 'fs';
import _ from 'lodash';
import path from 'path';

// const getAbsolutePath = (file) => path.resolve(process.cwd(), file);
// If, after processing given path, an absolute path has not yet been generated, 
// the current working directory is used
const getAbsolutePath = (file) => path.resolve( file);

const genDiff = (file1, file2) => {
  const file1Parsed = JSON.parse(fs.readFileSync(getAbsolutePath(file1)));
  const file2Parsed = JSON.parse(fs.readFileSync(getAbsolutePath(file2)));

  return { file1Parsed, file2Parsed };
};

export default genDiff;