function dijkstra(graph, sourceNode) {
    const distances = new Array(graph.length);
    const visited = new Array(graph.length);
    for (let i = 0; i < graph.length; i++) {
        distances[i] = Infinity;
        visited[i] = false;
    }
    distances[sourceNode] = 0;
    for (let i = 0; i < graph.length - 1; i++) {
        let minDistance = Infinity;
        let minNode = -1;
        for (let j = 0; j < graph.length; j++) {
            if (!visited[j] && distances[j] < minDistance) {
                minDistance = distances[j];
                minNode = j;
            }
        }
        if (minNode === -1) {
            break;
        }
        visited[minNode] = true;
        for (let neighbor = 0; neighbor < graph.length; neighbor++) {
            if (!visited[neighbor] && graph[minNode][neighbor] !== 0) {
                const weight = graph[minNode][neighbor];
                const newDistance = distances[minNode] + weight;
                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                }
            }
        }
    }
    return distances;
}
