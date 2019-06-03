function Graph() {
    this.vertices = [];
    this.vertexMap = new Map();
    this.adjList = new Map();
    this.addVertex = function(v) {
        return this.vertexMap.has(v.id) ? null : (v.status = 0, this.vertexMap.set(v.id, v), this.vertices.push(v),this.adjList.set(v.id, new Set()), v);
    };
    this.addEdge = function(sourceId, targetId) {
        if (this.vertexMap.has(sourceId) && this.vertexMap.has(targetId)) {
            this.adjList.get(sourceId).add(this.vertexMap.get(targetId));
            this.adjList.get(targetId).add(this.vertexMap.get(sourceId));
        }
        return this;
    };
    this.getVertex = function(id) {
        return this.vertexMap.get(id);
    };
    this.getVertexAdj = function(id) {
        return this.adjList.get(id) || [];
    };
    this.toString = function() {
        this.adjList.forEach((value, key) => {
            console.log(key + ':' + Array.from(value).map(e => e.id).join(',') + '\n');
        });
    };
}

function BFS(graph, root, callback) {
    var queue = [];
    if (root == null) return null;
    root.status = 1 && queue.push(root);
    while(queue.length) {
        var curVertex = queue.shift();
        // 将相邻节点入队
        var adjVertexs = graph.getVertexAdj(curVertex.id);
        adjVertexs.forEach(e => {
            // 忽略已经入队或已经被访问过的节点
            if (e.status === 0) {
                e.status = 1 && queue.push(e);
            }
        });
        // 节点被访问
        callback(curVertex);
        curVertex.status = 2;
    }
}

function DFS(graph, callback) {
    var stack = [];
    var vertexs = graph.vertices;
    // 遍历每个节点，若节点未被访问，则入栈
    // 若栈非空，出栈
    // 继续遍历其相邻未被访问的子节点
    for (var i = 0, length = vertexs.length; i < length; i++) {
        if (vertexs[i].status === 0) {
            vertexs[i].status = 1;
            stack.push(vertexs[i]);
            while(stack.length) {
                var v = stack.pop();
                v.status = 2; 
                callback(v);
                var adjVertexs = graph.getVertexAdj(v.id);
                adjVertexs.forEach(e => {
                    if (e.status === 0) {
                        e.status = 1;
                        stack.push(e);
                    }
                });
            }
        }
    }
}

// function DFS(v, callback) {
//     if (v == null) return;
//     callback(v);
//     v.status = 2;
//     var adjVertexs = graph.getVertexAdj(v.id);
//     adjVertexs.forEach(e => {
//         if (e.status === 0) DFS(e, callback);
//     });
// }

var graph = new Graph();
graph.addVertex({id: 'A'});
graph.addVertex({id: 'B'});
graph.addVertex({id: 'C'});
graph.addVertex({id: 'D'});
graph.addVertex({id: 'E'});
graph.addVertex({id: 'F'});
graph.addVertex({id: 'G'});
graph.addVertex({id: 'H'});
graph.addVertex({id: 'I'});
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('E', 'I');

// console.log('BFS:\n');
// BFS(graph, graph.getVertex('A'), e => {
//     console.log(e.id);
// });
console.log('DFS:\n');
DFS(graph, e => {
    console.log(e.id);
});
// DFS( graph.getVertex('A'), e => {
//     console.log(e.id);
// });