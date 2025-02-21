export const getType = (value: any) => {
  console.log(typeof value);
  const type = isType(value);
  if (type === '[object Function]') {
    return 'function';
  } else if (type === '[object Object]') {
    return 'object';
  } else if (type === '[object Number]') {
    return 'number';
  }
};

export const isType = (value: any) => {
  return Object.prototype.toString.call(value);
};
