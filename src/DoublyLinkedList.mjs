export default class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToHead(value) {
    if (this.head === null) {
      this.head = new DoublyLinkedList.Node(value);
      this.tail = this.head;
    } else {
      const newHead = new DoublyLinkedList.Node(value, this.head);
      this.head.next.prev = newHead;
      this.head = newHead;
    }
  }

  addToTail(value) {
    if (this.tail === null) {
      this.tail = new DoublyLinkedList.Node(value);
      this.head = this.tail;
    } else {
      this.tail.next = new DoublyLinkedList.Node(value);
      this.tail.prev.next = this.tail.next;
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
