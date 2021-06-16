export default class Trie {
  constructor() {
    this.root = new Trie.Node();
  }

  put(key, val) {
    this.root = this._putHelper(this.root, key, val);
  }

  get(key) {
    const node = this._getHelper(this.root, key);
    return node != null ? node.val : null;
  }

  startsWith(prefix) {
    const node = this._getHelper(this.root, prefix);
    return node != null;
  }

  _putHelper(node, key, val, d = 0) {
    if (node == null) {
      node = new Trie.Node();
    }
    if (d === key.length) {
      node.val = val;
      return node;
    }
    const ch = key[d];
    node.next[ch] = this._putHelper(node.next[ch], key, val, d + 1);
    return node;
  }

  _getHelper(node, key, d) {
    if (node == null) {
      return null;
    }
    if (d === key.length) {
      return node;
    }
    const ch = key[d];
    return this._getHelper(node.next[ch], key, d + 1);
  }
}

Trie.Node = class {
  constructor(val = null) {
    this.val = val;
    this.next = {};
  }
};
