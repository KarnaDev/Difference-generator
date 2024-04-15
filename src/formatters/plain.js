import _ from 'lodash';

// Formats the value of a node based on its type
const formatNodeValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  return value;
};

// Converts the abstract syntax tree into a plain text diff
const makePlain = (abstractTree) => {
  // Recursively builds the plain text diff
  const buildPlainDiff = (tree, path = '') => {
    const plainDiff = tree.flatMap((node) => {
      const {
        name, type, value, from, to, children,
      } = node;
      const currentPath = path ? `${path}.${name}` : name;

      switch (type) {
        case 'added':
          return `Property '${currentPath}' was added with value: ${formatNodeValue(value)}`;
        case 'deleted':
          return `Property '${currentPath}' was removed`;
        case 'changed':
          return `Property '${currentPath}' was updated. From ${formatNodeValue(from)} to ${formatNodeValue(to)}`;
        case 'nested':
          return buildPlainDiff(children, currentPath);
        default:
          return [];
      }
    });

    return plainDiff.join('\n');
  };

  return buildPlainDiff(abstractTree);
};

export default makePlain;
