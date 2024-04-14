import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path, { dirname } from 'path';
import gendiff from '../src/index.js';
// import expected from '../__fixtures__/result.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gendiff non-specified formatter (stylish as default) for json', () => {
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = fs.readFileSync(getFixturePath('result-stylish.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('gendiff non-specified formatter (stylish as default) for yml', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'));
  const expected = fs.readFileSync(getFixturePath('result-stylish.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('gendiff stylish formatter for json', () => {
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  const expected = fs.readFileSync(getFixturePath('result-stylish.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('gendiff stylish formatter for yml', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'stylish');
  const expected = fs.readFileSync(getFixturePath('result-stylish.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('gendiff plain formatter for json', () => {
  const actual = gendiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  const expected = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('gendiff plain formatter for yml', () => {
  const actual = gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), 'plain');
  const expected = fs.readFileSync(getFixturePath('result-plain.txt'), 'utf-8');
  expect(actual).toEqual(expected);
});

test('unsupported tree formatter', () => {
  const formatter = 'unsupported formatter';
  expect(() => {
    gendiff(getFixturePath('file1.yml'), getFixturePath('file2.yaml'), formatter);
  }).toThrow();
});
