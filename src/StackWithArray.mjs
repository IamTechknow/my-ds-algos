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

  size() {
    return this.data.length;
  }

  isEmpty() {
    return this.data.length === 0;
  }
}
