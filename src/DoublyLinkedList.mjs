export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(value) {
    const newNode = new DoublyLinkedList.Node(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  addToTail(value) {
    const newNode = new DoublyLinkedList.Node(value);
    if (this.tail === null) {
      this.tail = newNode;
      this.head = this.tail;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
  }

  addAtIndex(index, value) {
    if (index < 0) {
      return;
    }
    if (index === 0) {
      this.addAtHead(value);
      return;
    }
    const prev = this._getNode(index - 1);
    if (prev === null) {
      return;
    }
    const newNode = new DoublyLinkedList.Node(value);
    newNode.next = prev.next ? prev.next : null;
    prev.next = newNode;
    newNode.prev = prev;
    if (newNode.next === null) {
      this.tail = newNode;
    }
  }

  deleteAtIndex(index) {
    if (index < 0) {
      return null;
    }
    const curr = this._getNode(index);
    if (curr === null) {
      return null;
    }
    const { next, prev, val } = curr;
    if (prev !== null) {
      prev.next = next;
    } else {
      this.head = next; // deleting head
    }
    if (next === null) {
      this.tail = prev; // deleted last node
    } else {
      next.prev = prev;
    }
    return val;
  }

  contains(target) {
    let currNode = this.head;
    while (currNode !== null) {
      if (currNode.val === target) {
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }

  get(index) {
    const node = this._getNode(index);
    return node !== null ? node.val : null;
  }

  _getNode(index) {
    let curr = this.head;
    for (let i = 0; curr !== null && i < index; i++) {
      curr = curr.next;
    }
    return curr;
  }
}

DoublyLinkedList.Node = class {
  constructor(value, next = null, prev = null) {
    this.val = value;
    this.next = next;
    this.prev = prev;
  }
};
