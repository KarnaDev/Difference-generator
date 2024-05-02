import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const supportedFormats = ['.json', '.yml', '.yaml'];

const parseData = (fileContent, format) => {
  const parsedData = format === '.json' ? JSON.parse(fileContent) : yaml.load(fileContent);
  return parsedData;
};

export default (file) => {
  const absPath = path.resolve(file);
  const format = path.extname(absPath).toLowerCase();

  if (!supportedFormats.includes(format)) {
    throw new Error(`The format ${format} is not supported`);
  }

  const fileContent = fs.readFileSync(absPath, 'utf8');
  return parseData(fileContent, format);
};
