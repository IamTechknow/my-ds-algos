export default class QueueWithObject {
  constructor() {
    this.items = {};
    this.start = 0;
    this.end = 0;
  }

  enqueue(val) {
    this.items[this.end++] = val;
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    const val = this.items[this.start];
    delete this.items[this.start];
    this.start += 1;
    return val;
  }

  peek() {
    return this.items[this.start];
  }

  size() {
    return this.end - this.start;
  }

  isEmpty() {
    return this.size() === 0;
  }
}
