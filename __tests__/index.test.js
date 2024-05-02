import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const assertDiff = (file1, file2, resultFile, format = 'stylish') => {
  const actual = gendiff(file1, file2, format);
  const expected = fs.readFileSync(getFixturePath(resultFile), 'utf-8');
  return { actual, expected };
};

const testCases = [
  ['file1.json', 'file2.json', 'result-stylish.txt'],
  ['file1.yml', 'file2.yaml', 'result-stylish.txt'],
  ['file1.json', 'file2.json', 'result-stylish.txt', 'stylish'],
  ['file1.yml', 'file2.yaml', 'result-stylish.txt', 'stylish'],
  ['file1.json', 'file2.json', 'result-plain.txt', 'plain'],
  ['file1.yml', 'file2.yaml', 'result-plain.txt', 'plain'],
  ['file1.json', 'file2.json', 'result-json.txt', 'json'],
  ['file1.yml', 'file2.yaml', 'result-json.txt', 'json'],
];

testCases.forEach(([file1, file2, resultFile, format = 'stylish']) => {
  test(`gendiff: ${file1} vs ${file2} with format ${format}`, () => {
    const filePath1 = getFixturePath(file1);
    const filePath2 = getFixturePath(file2);
    const { actual, expected } = assertDiff(filePath1, filePath2, resultFile, format);
    expect(actual).toEqual(expected);
  });
});
