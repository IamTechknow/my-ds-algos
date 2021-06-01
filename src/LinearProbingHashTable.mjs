import { stringHashFunction } from './utils/Utils.mjs';

const INITIAL_CAPACITY = 4;
const LOAD_FACTOR = 0.75;
const DOWNSIZE_FACTOR = 0.25;

export default class LinearProbingHashTable {
  constructor(capacity = INITIAL_CAPACITY) {
    this.size = 0;
    this.capacity = capacity;
    this.keys = new Array(this.capacity);
    this.values = new Array(this.capacity);
  }

  get(key) {
    for (let i = this._getHashIndex(key); this.keys[i] !== null; i = (i + 1) % this.capacity) {
      if (this.keys[i] === key) {
        return this.values[i];
      }
    }
    return null;
  }

  put(key, val) {
    this._checkToEnlarge();
    let i;
    for (i = this._getHashIndex(key); this.keys[i] !== null; i = (i + 1) % this.capacity) {
      if (this.keys[i] === key) { // update case
        this.values[i] = val;
        return;
      }
    }
    this.keys[i] = key;
    this.values[i] = val;
    this.size++;
  }

  size() {
    return this.size();
  }

  _getHashIndex(key) {
    return Math.abs(stringHashFunction(key) % this.capacity);
  }

  _checkToEnlarge() {
    if (this.size >= Math.floor(this.capacity * LOAD_FACTOR)) {
      this._resize(2 * this.capacity);
    }
  }

  _checkToShrink() {
    if (this.size <= Math.floor(this.capacity * DOWNSIZE_FACTOR)) {
      this._resize(this.capacity >> 1);
    }
  }

  _resize(newCapacity) {
    const hashTable = new LinearProbingHashTable(newCapacity);
    for (let i = 0; i < this.size; i++) {
      if (this.keys[i] !== null) {
        hashTable.put(this.keys[i], this.values[i]);
      }
    }
    this.keys = hashTable.keys;
    this.values = hashTable.values;
    this.capacity = newCapacity;
  }
}
