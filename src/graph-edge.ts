import {Vertex} from './graph-vertex';

export interface Edge<T extends Vertex> {
  vertexTo: T;
  vertexFrom: T;
}
