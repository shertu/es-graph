# graffin

A simple directed graph library with TypeScript support.

```JS
import { Graph } from './graffin';
const graph = new Graph();
graph.addEdge({vertexTo: {id: 'rock'}, vertexFrom: {id: 'scissors'}});
graph.addEdge({vertexTo: {id: 'paper'}, vertexFrom: {id: 'rock'}});
graph.addEdge({vertexTo: {id: 'scissors'}, vertexFrom: {id: 'paper'}});
```

