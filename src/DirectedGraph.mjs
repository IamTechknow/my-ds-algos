export default class DirectedGraph {
  constructor() {
    this.V = 0;
    this.E = 0;
    this.adj = {};
  }

  addVertex(vertex) {
    if (this.includes(vertex)) {
      return;
    }
    this.adjacent[vertex] = [];
    this.V++;
  }

  includes(vertex) {
    return this.adjacent[vertex] !== undefined;
  }

  addEdge(v, w) {
    if (!this.includes(v) || !this.includes(w) || this.adjacent[v].includes(w)) {
      return;
    }
    this.adj[v].push(w);
    this.E++;
  }

  getAdjacentEdges(v) {
    return this.adj[v];
  }

  V() {
    return this.V;
  }

  E() {
    return this.E;
  }
}
