export const binarySearch = (arr, target) => {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (arr[mid] < target) {
      lo = mid + 1;
    } else if (arr[mid] > target) {
      hi = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
};
