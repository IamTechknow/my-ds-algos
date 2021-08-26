export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(value) {
    if (this.head === null) {
      this.head = new LinkedList.Node(value);
      this.tail = this.head;
    } else {
      const newHead = new LinkedList.Node(value, this.head);
      this.head = newHead;
    }
  }

  addToTail(value) {
    if (this.tail === null) {
      this.tail = new LinkedList.Node(value);
      this.head = this.tail;
    } else {
      this.tail.next = new LinkedList.Node(value);
      this.tail = this.tail.next;
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
    const newNode = new LinkedList.Node(value);
    newNode.next = prev.next ? prev.next : null;
    prev.next = newNode;
    if (newNode.next === null) {
      this.tail = newNode;
    }
  }

  deleteAtIndex(index) {
    if (index < 0) {
      return;
    }
    if (index === 0) {
      this.head = this.head.next;
      return;
    }
    const prev = this._getNode(index - 1);
    if (prev === null) {
      return;
    }
    const curr = prev.next;
    if (curr === null) {
      return;
    }
    const currNext = curr.next;
    prev.next = currNext;
    if (currNext === null) {
      this.tail = prev;
    }
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

LinkedList.Node = class {
  constructor(value, next = null) {
    this.val = value;
    this.next = next;
  }
};
