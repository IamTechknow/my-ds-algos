class DoubleLinkedNode {
  constructor(value) {
    this.val = value;
    this.next = null;
    this.prev = null;
  }
}

// LRU cache implementation with an object and doubly linked list.
// The list itself has dummy nodes to avoid null checks but needs to be managed.
export default class LRUCache {
  constructor(capacity) {
    this.size = 0;
    this.capacity = capacity;
    this.nodeCache = {};
    this.head = new DoubleLinkedNode();
    this.tail = new DoubleLinkedNode();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    const node = this.nodeCache[key] || null;
    if (node == null) {
      return null;
    }
    this._moveToHead(node);
    return node.val.value;
  }

  put(key, value) {
    const node = this.nodeCache[key] || null;
    if (node != null) {
      node.val.value = value;
      this._moveToHead(node);
      return;
    }

    const newNode = new DoubleLinkedNode();
    newNode.val = { key, value };
    this._addToHead(newNode);
    this.nodeCache[key] = newNode;
    this.size++;

    if (this.size > this.capacity) {
      const tail = this.tail.prev;
      this._removeNode(tail);

      delete this.nodeCache[tail.val.key];
      this.size--;
    }
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  _addToHead(node) {
    // add node in front of dummy head
    node.prev = this.head;
    node.next = this.head.next;
    this.head.next.prev = node;
    this.head.next = node;
  }

  // eslint-disable-next-line class-methods-use-this
  _removeNode(node) {
    // no null checks due to dummy node
    const { prev, next } = node;
    prev.next = next;
    next.prev = prev;
  }
}
