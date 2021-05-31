export default class QueueWithArray {
  constructor() {
    this.items = [];
  }

  enqueue(val) {
    this.items.push(val);
  }

  dequeue() {
    if (this.isEmpty()) {
      throw new Error('Queue is empty');
    }
    return this.items.shift();
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
