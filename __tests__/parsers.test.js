import { test, expect } from '@jest/globals';
import readFile from '../src/parsers.js';

test('readFile throws an error for unsupported file format', () => {
  const unsupportedFileFormat = 'unsupported.txt';
  expect(() => {
    readFile(unsupportedFileFormat);
  }).toThrow();
});
