export default class StackWithArray {
  constructor() {
    this.data = [];
  }

  push(val) {
    this.data.push(val);
  }

  pop() {
    if (this.isEmpty()) {
      throw new Error('Stack underflow');
    }
    return this.data.pop();
  }

  peek() {
    return this.data[this.data.length - 1];
  }

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }
}
