// Computes the topological sort order of the directed graph
// if one is present, otherwise returns null.
export const topologicalSort = (directedGraph) => {
  const indegree = { ...directedGraph.indegree };
  const order = [];
  const queue = [];
  let count = 0;

  // Init queue to have all vertices with indegree 0
  Object.keys(indegree)
    .filter((v) => indegree[v] === 0)
    .forEach((v) => queue.push(v));

  while (queue.length > 0) {
    const v = queue.shift();
    order.push(v);
    count++;
    for (const w of directedGraph.getAdjacentEdges(v)) {
      indegree[w]--;
      if (indegree[w] === 0) {
        queue.push(w);
      }
    }
  }

  return count === directedGraph.V() ? order : null;
};
