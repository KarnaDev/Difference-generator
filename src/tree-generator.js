import _ from 'lodash';

// Gets unique keys from two objects
const getUniqueKeys = (file1, file2) => {
  const keys1 = Object.keys(file1);
  const keys2 = Object.keys(file2);
  return _.sortBy(_.union(keys1, keys2));
};

// Compares two files and creates an abstract tree of differences
const generateTree = (file1, file2) => {
  const uniqueKeys = getUniqueKeys(file1, file2);

  return uniqueKeys.reduce((acc, key) => {
    const value1 = file1[key];
    const value2 = file2[key];

    // Creates a node in the tree
    const createNode = (nodeKey, nodeValue1, nodeValue2) => {
      const node = { name: nodeKey };

      if (_.isEqual(nodeValue1, nodeValue2)) {
        return { ...node, type: 'unchanged', value: nodeValue1 };
      }
      if (nodeValue1 === undefined) {
        return { ...node, type: 'added', value: nodeValue2 };
      }
      if (nodeValue2 === undefined) {
        return { ...node, type: 'deleted', value: nodeValue1 };
      }
      if (_.isObject(nodeValue1) && _.isObject(nodeValue2)) {
        // Recursively compares nested objects when both values are objects
        const nestedDiff = generateTree(nodeValue1, nodeValue2);
        return { ...node, type: 'nested', children: Object.values(nestedDiff) };
      }
      return {
        ...node, type: 'changed', from: nodeValue1, to: nodeValue2,
      };
    };

    return { ...acc, [key]: { ...createNode(key, value1, value2) } };
  }, {});
};

export default generateTree;
