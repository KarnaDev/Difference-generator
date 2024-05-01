const makeJson = (abstractTree) => abstractTree.reduce((transformedData, {
  name, type, value, from, to, children,
}) => {
  const node = {
    type,
  };

  if (type === 'nested') {
    return { ...transformedData, [name]: { ...node, children: makeJson(children) } };
  }

  return { ...transformedData, [name]: { ...node, value, ...(type === 'changed' && { from, to }) } };
}, {});

export default makeJson;
