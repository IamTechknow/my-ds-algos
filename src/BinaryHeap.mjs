const TOP_IDX = 1;

export default class BinaryHeap {
  constructor(comparator = (a, b) => a > b) {
    // Make the heap one-indexed to simplify implementation
    this.heap = [null];
    this.n = 0;
    this.comparator = comparator;
  }

  static getMinHeap() {
    return new BinaryHeap();
  }

  static getMaxHeap() {
    return new BinaryHeap((a, b) => a < b);
  }

  size() {
    return this.n;
  }

  isEmpty() {
    return this.n === 0;
  }

  peek() {
    if (this.isEmpty()) {
      throw new Error('Binary heap underflow');
    }
    return this.heap[TOP_IDX];
  }

  enqueue(val) {
    this.heap.push(val);
    this._swim(++this.n);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Binary heap underflow');
    }
    const dequeued = this.heap[TOP_IDX];
    this._exch(TOP_IDX, this.n--);
    this._sink(TOP_IDX);
    this.heap.pop();
    return dequeued;
  }

  _swim(k) {
    while (k > TOP_IDX && this._compare(k >> 1, k)) {
      this._exch(k, k >> 1);
      k >>= 1;
    }
  }

  _sink(k) {
    while (2 * k <= this.n) {
      let j = k << 1;
      if (j < this.n && this._compare(j, j + 1)) {
        j++;
      }
      if (!this._compare(k, j)) {
        break;
      }
      this._exch(k, j);
      k = j;
    }
  }

  _compare(left, right) {
    return this.comparator(this.heap[left], this.heap[right]);
  }

  _exch(left, right) {
    const temp = this.heap[left];
    this.heap[left] = this.heap[right];
    this.heap[right] = temp;
  }
}
