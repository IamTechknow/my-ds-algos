import { stringHashFunction } from './utils/Utils.mjs';

const MAX_BUCKET_SIZE = 10;
const MIN_RESIZE_THRESHOLD = 16;

// TODO: Refactor to use an actual linked list class before implementing remove()
export default class SeparateChainingHashTable {
  constructor() {
    this.numBuckets = 8;
    this.size = 0;
    this.buckets = new Array(this.numBuckets);
  }

  get(key) {
    const bucket = this._getHashIndex(key);
    for (let curr = this.buckets(bucket); curr != null; curr = curr.next) {
      if (curr.key === key) {
        return curr.value;
      }
    }
    return null;
  }

  put(key, val) {
    this._checkToEnlarge();
    const bucket = this._getHashIndex(key);
    for (let curr = this.buckets(bucket); curr != null; curr = curr.next) {
      if (curr.key === key) {
        curr.val = val;
        this.size++;
        return;
      }
    }
    this.buckets[bucket] = {
      key,
      val,
      next: this.buckets[bucket],
    };
    this.size++;
  }

  _getHashIndex(key) {
    return Math.abs(stringHashFunction(key) % this.numBuckets);
  }

  // double # of buckets if average list size is >= 10
  _checkToEnlarge() {
    if (this.size >= this.numBuckets * MAX_BUCKET_SIZE) {
      this._resize(true);
    }
  }

  // halve # of buckets if average list size is <= 2
  _checkToShrink() {
    if (
      this.size > MIN_RESIZE_THRESHOLD
      && this.size <= Math.floor(this.numBuckets * 0.2 * MAX_BUCKET_SIZE)
    ) {
      this._resize(false);
    }
  }

  _resize(isIncreasing) {
    const cache = [];
    for (let i = 0; i < this.numBuckets; i++) {
      for (let node = this.buckets[i]; node !== null; node = node.next) {
        cache.push(node);
      }
    }

    if (isIncreasing) {
      this.numBuckets *= 2;
    } else {
      this.numBuckets /= 2;
    }

    this.buckets = new Array(this.numBuckets);
    for (let i = 0; i < this.numBuckets; i++) {
      this.buckets[i] = [];
    }
    cache.forEach((node) => {
      const { key, value } = node;
      this.put(key, value);
    });
  }
}
