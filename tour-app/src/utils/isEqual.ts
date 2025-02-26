export function isEqual<T>(obj1: T, obj2: T): boolean {
  if (obj1 === obj2) return true;
  if (obj1 == null || obj2 == null || typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  const keys1 = Object.keys(obj1) as Array<keyof T>;
  const keys2 = Object.keys(obj2) as Array<keyof T>;
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)  || !isEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}

