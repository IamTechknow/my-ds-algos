import { stringHashFunction } from './utils/Utils.mjs';
import LinkedList from './LinkedList.mjs';

const MAX_BUCKET_SIZE = 10;
const MIN_RESIZE_THRESHOLD = 16;

// TODO: Implement remove()
export default class SeparateChainingHashTable {
  constructor() {
    this.numBuckets = 8;
    this.size = 0;
    this.buckets = new Array(this.numBuckets);
    for (let i = 0; i < this.numBuckets; i += 1) {
      this.buckets[i] = new LinkedList();
    }
  }

  get(key) {
    const bucket = this._getHashIndex(key);
    const list = this.buckets[bucket];
    for (let curr = list.head; curr != null; curr = curr.next) {
      if (curr.val.key === key) {
        return curr.val.val;
      }
    }
    return null;
  }

  put(key, val) {
    this._checkToEnlarge();
    const bucket = this._getHashIndex(key);
    const list = this.buckets[bucket];
    for (let curr = list.head; curr != null; curr = curr.next) {
      if (curr.val.key === key) {
        curr.val.val = val;
        this.size++;
        return;
      }
    }
    list.addToTail({ key, val });
    this.size++;
  }

  size() {
    return this.size();
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
      for (let node = this.buckets[i].head; node !== null; node = node.next) {
        cache.push(node);
      }
    }

    this.numBuckets = isIncreasing ? this.numBuckets * 2 : this.numBuckets >> 1;
    this.buckets = new Array(this.numBuckets);
    for (let i = 0; i < this.numBuckets; i += 1) {
      this.buckets[i] = new LinkedList();
    }
    this.size = 0;
    cache.forEach((node) => {
      const { key, value } = node;
      this.put(key, value);
    });
  }
}
