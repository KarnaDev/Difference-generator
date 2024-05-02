import selectFormatter from '../src/formatter-selector.js';

test('formatter-selector: unsupported formatter', () => {
  const formatter = 'unsupported';
  expect(() => {
    selectFormatter(formatter, {});
  }).toThrow();
});
