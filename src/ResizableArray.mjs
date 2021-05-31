export default class ResizableArray {
  constructor() {
    this.items = [null];
    this.length = 0;
    this.capacity = 1;
  }

  add(val, idx = this.length) {
    if (this.length === this.capacity) {
      this._resize(this.length * 2);
    }
    if (idx !== this.length) {
      this._shiftRight(idx, this.length - idx);
    }
    this.items[idx] = val;
    this.length += 1;
  }

  get(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error(`${idx} is out of bounds`);
    }
    return this.items[idx];
  }

  remove(idx = this.length) {
    if (this.isEmpty()) {
      throw new Error('Resizable array is empty');
    }
    const val = this.items[idx];
    this.items[idx] = null;
    if (idx !== this.length) {
      this._shiftLeft(idx, this.length - idx);
    }
    this.length -= 1;
    if (this.length > 0 && this.length === this.capacity / 4) {
      this._resize(this.capacity / 2);
    }
    return val;
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  _resize(newCapacity) {
    const newArray = new Array(newCapacity);
    for (let i = 0; i < this.items.length; i += 1) {
      newArray[i] = this.items[i];
    }
    this.items = newArray;
    this.capacity = newCapacity;
  }

  _shiftLeft(startIdx, length) {
    for (let i = startIdx; i < startIdx + length; i += 1) {
      this.items[i - 1] = this.items[i];
    }
  }

  _shiftRight(startIdx, length) {
    for (let i = startIdx; i < startIdx + length; i += 1) {
      this.items[i + 1] = this.items[i];
    }
  }
}
