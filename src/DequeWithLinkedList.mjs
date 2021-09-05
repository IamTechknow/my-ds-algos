import DoublyLinkedList from './DoublyLinkedList.mjs';

export default class DequeWithLinkedList {
  constructor() {
    this.list = new DoublyLinkedList();
  }

  insertFront(val) {
    this.list.addToHead(val);
  }

  insertRear(val) {
    this.list.addToTail(val);
  }

  removeFront() {
    return this.list.deleteAtIndex(0);
  }

  removeRear() {
    return this.list.deleteAtIndex(this.list.size - 1);
  }

  getFront() {
    if (this.isEmpty()) {
      throw new Error('Deque underflow');
    }
    return this.list.head.val;
  }

  getRear() {
    if (this.isEmpty()) {
      throw new Error('Deque underflow');
    }
    return this.list.tail.val;
  }

  size() {
    return this.list.size;
  }

  isEmpty() {
    return this.list.isEmpty();
  }
}
