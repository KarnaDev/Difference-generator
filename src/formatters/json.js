const makeJson = (abstractTree) => abstractTree.reduce((transformedData, {
  name, type, value, from, to, children,
}) => {
  const node = {
    type,
  };

  if (type === 'nested') {
    node.children = makeJson(children);
  } else {
    node.value = value;
    if (type === 'changed') {
      node.from = from;
      node.to = to;
    }
  }

  return { ...transformedData, [name]: node };
}, {});

export default makeJson;
