const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

const graph = [
    [0, 2, 4, 0, 0],
    [0, 0, 1, 7, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0]
];
assert(JSON.stringify(dijkstra(graph)) == (0, [0, 2, 3, 9, 6]);

const graph = [
    [0, 2, 0, 0, 0],
    [0, 0, 0, 7, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
assert(JSON.stringify(dijkstra(graph)) == (0, [0, 2, Infinity, Infinity, Infinity]);

const graph = [
    [0, 2, -1, 0, 0],
    [0, 0, 1, 7, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0]
];
assert(JSON.stringify(dijkstra(graph)) == (0, [0, 2, -1, 0, 0]);
