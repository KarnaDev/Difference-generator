import _ from 'lodash';

// Returns a string of spaces based on the depth in the tree and whether a sign (+ or -) is included
const getIndent = (depth, sign = false) => ' '.repeat(4 * depth - (sign ? 2 : 0));

// Checks if a tree node is object and recursively formats it into a string representation
const formatNode = (value, depth) => {
  if (_.isObject(value)) {
    const formatEntry = ([key, val]) => `${getIndent(depth)}${key}: ${formatNode(val, depth + 1)}`;
    const nestedValues = Object.entries(value).map(formatEntry).join('\n');
    return `{\n${nestedValues}\n${getIndent(depth - 1)}}`;
  }
  return value;
};

// Return strings according to node types
const createChange = (name, value, sign, depth) => `${getIndent(depth, true)}${sign} ${name}: ${formatNode(value, depth + 1)}`;
const createAdded = (name, value, depth) => createChange(name, value, '+', depth);
const createDeleted = (name, value, depth) => createChange(name, value, '-', depth);
const createChanged = (name, from, to, depth) => `${createDeleted(name, from, depth)}\n${createAdded(name, to, depth)}`;
const createUnchanged = (name, value, depth) => `${getIndent(depth)}${name}: ${formatNode(value, depth + 1)}`;

const makeStylish = (abstractTree) => {
  const buildStylishedTree = (tree, depth) => {
    const indent = getIndent(depth);
    const stylishedTree = tree.map(({
      type, name, value, from, to, children,
    }) => {
      switch (type) {
        case 'unchanged':
          return createUnchanged(name, value, depth);
        case 'added':
          return createAdded(name, value, depth);
        case 'deleted':
          return createDeleted(name, value, depth);
        case 'changed':
          return createChanged(name, from, to, depth);
        default:
          return `${indent}${name}: ${(buildStylishedTree(children, depth + 1))}`;
      }
    });
    return ['{', ...stylishedTree, `${getIndent(depth - 1)}}`].join('\n');
  };
  return buildStylishedTree(abstractTree, 1);
};

export default makeStylish;
