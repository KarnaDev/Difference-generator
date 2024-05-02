import makeStylish from './formatters/stylish.js';
import makePlain from './formatters/plain.js';

export default (format, abstractTree) => {
  switch (format) {
    case 'stylish':
      return makeStylish(abstractTree);
    case 'plain':
      return makePlain(abstractTree);
    case 'json':
      return JSON.stringify(abstractTree, null, 2);
    default:
      throw new Error(`Unexpected format: ${format}`);
  }
};
