import {Vertex} from './graph-vertex';

export interface Edge {
  vertexTo: Vertex;
  vertexFrom: Vertex;
}
