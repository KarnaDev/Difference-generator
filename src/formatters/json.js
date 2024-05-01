const makeJson = (abstractTree) => {
  const transformedData = {};

  abstractTree.forEach(({
    name, type, value, from, to, children,
  }) => {
    if (type === 'nested') {
      transformedData[name] = {
        type,
        children: makeJson(children),
      };
    } else {
      transformedData[name] = {
        type,
        value,
        ...(type === 'changed' && { from, to }),
      };
    }
  });

  return transformedData;
};

export default makeJson;
