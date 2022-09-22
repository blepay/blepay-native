export function isEmpty(obj) {
    for (const property in obj) {
      return false;
    }
    return true;
  }

export function isArrayNull (array) {
  return array.length === 0;
}  