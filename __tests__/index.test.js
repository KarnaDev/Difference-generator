import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
// import expected from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff main flow for json', () => {
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('gendiff main flow for yml', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  const expected = fs.readFileSync(getFixturePath('result.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('unsupported tree formatter', () => {
  const formatter = 'unsupported formatter';
  expect(() => {
    gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), formatter);
  }).toThrow();
});
