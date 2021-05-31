export default class StringBuilder {
  constructor() {
    this.value = [];
    this.length = 0;
    this.capacity = 1;
  }

  append(val) {
    if (val === null) {
      this._appendNull();
    }
    switch (typeof val) {
      case 'boolean':
        this._appendBoolean(val);
        break;
      case 'number':
        this._appendNumber(val);
        break;
      default: // case 'string'
        this._appendString(val);
        break;
    }
  }

  charAt(idx) {
    if (idx < 0 || idx >= this.length) {
      throw new Error(`${idx} is out of bounds`);
    }
    return this.value[idx];
  }

  length() {
    return this.length;
  }

  toString() {
    return this.value.join('');
  }

  _appendNull() {
    if (this.length + 4 >= this.capacity) {
      this._resize(StringBuilder._getNearestPowerOfTwo(this.capacity + 4));
    }
    this.value[this.length++] = 'n';
    this.value[this.length++] = 'u';
    this.value[this.length++] = 'l';
    this.value[this.length++] = 'l';
  }

  _appendBoolean(val) {
    const offset = val ? 4 : 5;
    if (this.length + offset >= this.capacity) {
      this._resize(StringBuilder._getNearestPowerOfTwo(this.capacity + offset));
    }
    if (val) {
      this.value[this.length++] = 't';
      this.value[this.length++] = 'r';
      this.value[this.length++] = 'u';
      this.value[this.length++] = 'e';
    } else {
      this.value[this.length++] = 'f';
      this.value[this.length++] = 'a';
      this.value[this.length++] = 'l';
      this.value[this.length++] = 's';
      this.value[this.length++] = 'e';
    }
  }

  _appendNumber(val) {
    this._appendString(String(val));
  }

  _appendString(val) {
    const offset = val.length;
    if (this.length + offset >= this.capacity) {
      this._resize(StringBuilder._getNearestPowerOfTwo(this.capacity + offset));
    }
    for (let i = 0; i < offset; i++) {
      this.value[this.length + i] = val[i];
    }
    this.length += offset;
  }

  static _getNearestPowerOfTwo(capacity) {
    const n = Math.ceil(Math.log(capacity) / Math.log(2));
    return 2 ** n;
  }

  _resize(newCapacity) {
    const newValue = new Array(newCapacity);
    for (let i = 0; i < this.value.length; i += 1) {
      newValue[i] = this.value[i];
    }
    this.value = newValue;
    this.capacity = newCapacity;
  }
}
