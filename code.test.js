const fs = require('fs');
const assert = require('assert');

eval(fs.readFileSync('code.js')+'');

function testDijkstra(graph, sourceNode, expectedDistances) {
    const result = dijkstra(graph, sourceNode);
    for (let i = 0; i < result.length; i++) {
        assert.equal(result[i], expectedDistances[i]);
    }
}

const connectedGraph = [
    [0, 2, 4, 0, 0],
    [0, 0, 1, 7, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0]
];
testDijkstra(connectedGraph, 0, [0, 2, 3, 9, 6]);

const disconnectedGraph = [
    [0, 2, 0, 0, 0],
    [0, 0, 0, 7, 0],
    [0, 0, 0, 0, 2],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];
testDijkstra(disconnectedGraph, 0, [0, 2, Infinity, Infinity, Infinity]);

const negativeWeightGraph = [
    [0, 2, -1, 0, 0],
    [0, 0, 1, 7, 0],
    [0, 0, 0, 2, 0],
    [0, 0, 0, 0, 3],
    [0, 0, 0, 0, 0]
];
testDijkstra(negativeWeightGraph, 0, [0, 2, -1, 0, 0]);
