import { test, expect } from '@jest/globals';
import readFile from '../src/parsers.js';

test('readFile throws an error for unsupported format', () => {
  const unsupportedFile = 'unsupported.txt';
  expect(() => {
    readFile(unsupportedFile);
  }).toThrow();
});
