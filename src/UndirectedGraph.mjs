export default class UndirectedGraph {
  constructor(V) {
    this.V = V;
    this.E = 0;
    this.adj = new Array(V);
    for (let i = 0; i < V; i += 1) {
      this.adj[i] = [];
    }
  }

  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
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
