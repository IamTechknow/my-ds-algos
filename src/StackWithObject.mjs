export default class StackWithArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }

  push(val) {
    this.data[this.length] = val;
    this.length += 1;
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }
    const val = this.data[this.length];
    delete this.data[this.length];
    this.length -= 1;
    return val;
  }

  peek() {
    return this.data[this.length];
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }
}
