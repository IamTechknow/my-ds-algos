export default class DirectedGraph {
  constructor() {
    this.V = 0;
    this.E = 0;
    this.adj = {};
    this.indegree = {};
  }

  addVertex(vertex) {
    if (this.includes(vertex)) {
      return;
    }
    this.adj[vertex] = [];
    this.indegree[vertex] = [];
    this.V++;
  }

  includes(vertex) {
    return this.adj[vertex] !== undefined;
  }

  addEdge(v, w) {
    if (!this.includes(v) || !this.includes(w) || this.adj[v].includes(w)) {
      return;
    }
    this.adj[v].push(w);
    this.indegree[w] += 1;
    this.E++;
  }

  getAdjacentEdges(v) {
    return this.adj[v];
  }

  indegree(v) {
    return this.indegree[v];
  }

  V() {
    return this.V;
  }

  E() {
    return this.E;
  }
}
