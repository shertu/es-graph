export type TKey = string | number | symbol;

export interface Edge {
  vertexTo: TKey;
  vertexFrom: TKey;
  weight?: number;
  directed?: boolean;
}

function reverseEdge(edge: Edge): Edge {
  const reversed: Edge = {
    vertexTo: edge.vertexFrom,
    vertexFrom: edge.vertexTo,
    weight: edge.weight,
    directed: edge.directed,
  };

  return reversed;
}

export class Graph {
  private eTo: {[v: TKey]: Edge[]} = {};
  private eFrom: {[v: TKey]: Edge[]} = {};

  public get verticies(): TKey[] {
    return Object.keys(this.eTo);
  }

  public addVertex(vertex: TKey): void {
    const edgesTo = this.to(vertex);
    const edgesFrom = this.from(vertex);

    this.eTo[vertex] = edgesTo;
    this.eFrom[vertex] = edgesFrom;
  }

  public from(vertex: TKey): Edge[] {
    return this.eFrom[vertex] ?? [];
  }

  public to(vertex: TKey): Edge[] {
    return this.eTo[vertex] ?? [];
  }

  private addEdgeSup(edge: Edge, addReverse: boolean): void {
    const {vertexTo, vertexFrom} = edge;

    const edgesTo = this.to(vertexTo);
    const edgesFrom = this.from(vertexFrom);

    edgesTo.push(edge);
    edgesFrom.push(edge);

    this.eTo[vertexTo] = edgesTo;
    this.eFrom[vertexFrom] = edgesFrom;

    if (!edge.directed && addReverse) {
      const reverse = reverseEdge(edge);
      this.addEdgeSup(reverse, false);
    }
  }

  public addEdge(edge: Edge): void {
    this.addEdgeSup(edge, true);
  }
}
