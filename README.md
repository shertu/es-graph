# graffin

A simple directed graph library with TypeScript support.

```JS
import {Edge, Graph, Vertex} from 'graffin';

enum Hands {
  rock = 0,
  paper = 1,
  scissors = 2,
}

const vR: Vertex = {id: Hands.rock};
const vP: Vertex = {id: Hands.paper};
const vS: Vertex = {id: Hands.scissors};

interface WeightedEdge extends Edge<Vertex> {
  weight: number;
}

const standardRPS = new Graph<Vertex, WeightedEdge>();

standardRPS.pushEdge({
  vertexTo: vR,
  vertexFrom: vP,
  weight: 1,
});
standardRPS.pushEdge({
  vertexTo: vP,
  vertexFrom: vS,
  weight: 1,
});
standardRPS.pushEdge({
  vertexTo: vS,
  vertexFrom: vR,
  weight: 1,
});


// find a rule which says rock beats scissors
const rule = standardRPS
    .from(Hands.rock)
    .find(edge => edge.vertexTo.id == Hands.scissors);
```
