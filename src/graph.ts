import {TKey, Vertex} from './graph-vertex';

import {Edge} from './graph-edge';

export class Graph {
  private v: {[v: TKey]: Vertex} = {};
  private eTo: {[v: TKey]: Edge[]} = {};
  private eFrom: {[v: TKey]: Edge[]} = {};

  public get vertex(): Vertex[] {
    return Object.values(this.v);
  }

  public addVertex(vertex: Vertex): void {
    this.v[vertex.id] = vertex;
    this.eTo[vertex.id] = this.to(vertex);
    this.eFrom[vertex.id] = this.from(vertex);
  }

  public from(vertex: Vertex): Edge[] {
    return this.eFrom[vertex.id] ?? [];
  }

  public to(vertex: Vertex): Edge[] {
    return this.eTo[vertex.id] ?? [];
  }

  public addEdge(edge: Edge): void {
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
}
