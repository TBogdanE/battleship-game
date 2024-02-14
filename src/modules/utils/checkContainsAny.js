export function checkContainsAny(arr1, arr2) {
  if (arr1.length === 0 && arr2.length === 0) return false;
  for (const element1 of arr2) {
    for (const element2 of arr1) {
      if (element1[0] === element2[0] && element1[1] == element2[1]) {
        return true;
      }
    }
  }
  return false;
}
