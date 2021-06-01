export const exch = (arr, left, right) => {
  const temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
};

export const stringHashFunction = (stringKey) => {
  if (typeof stringKey !== 'string') {
    throw new Error('Input key is not a string');
  }
  let hash = 0;
  for (let i = 0; i < stringKey.length; i++) {
    hash = (hash << 5) + hash + stringKey.charCodeAt(i);
    hash &= hash; // Convert to 32bit integer
    hash = Math.abs(hash);
  }
  return hash;
};
