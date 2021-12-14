import {TKey, Vertex} from './graph-vertex';

import {Edge} from './graph-edge';

export class Graph<vT extends Vertex, eT extends Edge<vT>> {
  private v: {[v: TKey]: vT} = {};
  private eTo: {[v: TKey]: eT[]} = {};
  private eFrom: {[v: TKey]: eT[]} = {};

  public get vertex(): vT[] {
    return Object.values(this.v);
  }

  public pushVertex(vertex: vT): void {
    this.v[vertex.id] = vertex;
    this.eTo[vertex.id] = this.toVertex(vertex);
    this.eFrom[vertex.id] = this.fromVertex(vertex);
  }

  public fromVertex(vertex: vT): eT[] {
    return this.from(vertex.id);
  }

  public toVertex(vertex: vT): eT[] {
    return this.to(vertex.id);
  }

  public from(vertex: TKey): eT[] {
    return this.eFrom[vertex] ?? [];
  }

  public to(vertex: TKey): eT[] {
    return this.eTo[vertex] ?? [];
  }

  public pushEdge(edge: eT): void {
    const {vertexTo, vertexFrom} = edge;

    this.pushVertex(edge.vertexTo);
    this.pushVertex(edge.vertexFrom);

    const edgesTo = this.toVertex(vertexTo);
    const edgesFrom = this.fromVertex(vertexFrom);

    edgesTo.push(edge);
    edgesFrom.push(edge);

    this.eTo[vertexTo.id] = edgesTo;
    this.eFrom[vertexFrom.id] = edgesFrom;
  }
}
