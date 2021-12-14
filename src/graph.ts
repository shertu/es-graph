import {TKey, Vertex} from './graph-vertex';

import {Edge} from './graph-edge';

export class Graph<vT extends Vertex, eT extends Edge<vT>> {
  private v: {[v: TKey]: vT} = {};
  private eTo: {[v: TKey]: eT[]} = {};
  private eFrom: {[v: TKey]: eT[]} = {};

  public get vertex(): vT[] {
    return Object.values(this.v);
  }

  public addVertex(vertex: vT): void {
    this.v[vertex.id] = vertex;
    this.eTo[vertex.id] = this.to(vertex);
    this.eFrom[vertex.id] = this.from(vertex);
  }

  public from(vertex: vT): eT[] {
    return this.eFrom[vertex.id] ?? [];
  }

  public to(vertex: vT): eT[] {
    return this.eTo[vertex.id] ?? [];
  }

  public addEdge(edge: eT): void {
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
