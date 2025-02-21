// 实现简单的get方法
export function get(object: any, path: any, defaultValue?: any) {
  let obj = object;
  const reg = /[^\[\].]+/g;
  if (typeof path === 'string') {
    path = path.match(reg);
  }
  for (const key of path) {
    if (!obj) {
      return defaultValue;
    }
    obj = obj[key];
  }
  return obj === undefined ? defaultValue : obj;
}
// 深度克隆
export function deepCopy<T>(value: T): T {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  function deepClone(value: T) {
    const cache = new Map();
    if (cache.has(value)) {
      return cache.get(value);
    }
    let result = Array.isArray(value) ? ([] as unknown as T) : ({} as unknown as T);
    cache.set(value, result);
    for (const key in value) {
      result[key] = deepCopy(value[key]);
    }

    return result as unknown as T;
  }
  return deepClone(value);
}
// 使用代理实现单例
export function gingleton(className: any) {
  let ins: any;
  const proxy = new Proxy(className, {
    construct(target, args) {
      if (!ins) {
        ins = Reflect.construct(target, args);
      }
      return ins;
    },
  });
  className.prototype.consttructor = proxy;
}
