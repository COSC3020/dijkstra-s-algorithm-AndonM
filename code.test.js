const fs = require('fs');
const jsc = require('jsverify');
const assert = require('assert');

eval(fs.readFileSync('code.js') + '');

const test = jsc.forall("array (pair nat nat)", function(edges) {
    if (edges.length === 0) {
        return true;
    }
    const max = edges.reduce(function(a, b) {
        return Math.max(a, Math.max(b[0], b[1]));
    }, 0);
    const graph = [];
    for (let i = 0; i <= max; i++) {
        graph[i] = [];
        for (let j = 0; j <= max; j++) {
            graph[i][j] = 0;
        }
    }
    for (const element of edges) {
        const [start, end] = element;
        graph[start][end] = 1;
    }
    const expected = JSON.stringify(dijkstra(graph, 0));
    const actual = JSON.stringify(expectedShortestDistances(graph, 0));
    assert.equal(actual, expected, 'Dijkstra algorithm failed.');
    return true;
});

jsc.assert(test, { tests: 1000 });


// NOT SURE HOW TO DO WITHOUT THIS HELPER FUNCTION? I FED CHATGPT THE ALGORITHM FROM CODE.JS AND ASKED IT TO REFACTOR AS THERE'S
// NO POINT IN HAVING AN EXPECTED ANSWER CALCULATION THAT'S GOING TO WORK THE SAME AS WHAT'S COMING FROM CODE.JS

function expectedShortestDistances(graph, sourceNode) {
    const distances = new Array(graph.length).fill(Infinity);
    const visited = new Array(graph.length).fill(false);

    distances[sourceNode] = 0;

    const priorityQueue = [];
    priorityQueue.push({ node: sourceNode, distance: 0 });

    while (priorityQueue.length > 0) {
        // Dequeue the node with the minimum distance
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node, distance } = priorityQueue.shift();

        // Skip this node if it has been visited already
        if (visited[node]) continue;

        visited[node] = true;

        // Update distances to neighbors
        for (let neighbor = 0; neighbor < graph.length; neighbor++) {
            if (graph[node][neighbor] !== 0) {
                const weight = graph[node][neighbor];
                const newDistance = distance + weight;

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    priorityQueue.push({ node: neighbor, distance: newDistance });
                }
            }
        }
    }

    return distances;
}
