import {TKey, Vertex} from './graph-vertex';

import {Edge} from './graph-edge';

function reverse(edge: Edge): Edge {
  const reversed: Edge = {
    ...edge,
    vertexFrom: edge.vertexTo,
    vertexTo: edge.vertexFrom,
  };

  return reversed;
}

export class Graph {
  private v: {[v: TKey]: Vertex} = {};
  private eTo: {[v: TKey]: Edge[]} = {};
  private eFrom: {[v: TKey]: Edge[]} = {};

  public get vertex(): Vertex[] {
    return Object.values(this.v);
  }

  public addVertex(vertex: Vertex): void {
    const edgesTo = this.to(vertex);
    const edgesFrom = this.from(vertex);

    this.v[vertex.id] = vertex;
    this.eTo[vertex.id] = edgesTo;
    this.eFrom[vertex.id] = edgesFrom;
  }

  public from(vertex: Vertex): Edge[] {
    return this.eFrom[vertex.id] ?? [];
  }

  public to(vertex: Vertex): Edge[] {
    return this.eTo[vertex.id] ?? [];
  }

  private addEdgeSup(edge: Edge): void {
    const {vertexTo, vertexFrom} = edge;

    this.addVertex(edge.vertexTo);
    this.addVertex(edge.vertexFrom);

    const edgesTo = this.to(vertexTo);
    const edgesFrom = this.from(vertexFrom);

    edgesTo.push(edge);
    edgesFrom.push(edge);

    this.eTo[vertexTo.id] = edgesTo;
    this.eFrom[vertexFrom.id] = edgesFrom;
  }

  public addEdge(edge: Edge, directed: boolean = false): void {
    this.addEdgeSup(edge);

    if (!directed) {
      const reversed = reverse(edge);
      this.addEdgeSup(reversed);
    }
  }
}
