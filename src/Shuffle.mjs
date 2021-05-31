import { exch } from './utils/Utils.mjs';

export const shuffle = (nums) => {
  const N = nums.length;
  for (let i = 0; i < N; i += 1) {
    const r = Math.floor(Math.random() * (i + 1));
    exch(nums, i, r);
  }
};
