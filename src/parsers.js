import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const supportedFormats = ['.json', '.yml', '.yaml'];

const readFile = (file) => {
  const absPath = path.resolve(file);
  const format = path.extname(absPath).toLowerCase();

  if (!supportedFormats.includes(format)) {
    throw new Error(`The format ${format} is not supported`);
  }

  const fileContent = fs.readFileSync(absPath, 'utf8');

  if (format === '.json') {
    return JSON.parse(fileContent);
  }

  return yaml.load(fileContent);
};

export default readFile;
