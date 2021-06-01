export default class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
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

  removeFromHead() {
    const val = this.head.value;
    this.head = this.head.next;
    return val;
  }

  contains(target) {
    let currNode = this.head;
    while (currNode !== null) {
      if (currNode.value === target) {
        return true;
      }
      currNode = currNode.next;
    }
    return false;
  }
}

LinkedList.Node = class {
  constructor(value) {
    this.val = value;
    this.next = null;
  }
};
