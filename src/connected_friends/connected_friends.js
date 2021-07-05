const Queue = require("../lib/queue");

const connected = (graph, s, r) => {
    if (!Object.keys(graph).length) return false;
    if (s === r) return true;
    const enqueued = [s];
    const discovered = new Queue();
    discovered.enqueue(s);
    while (discovered.first) {
        const user = discovered.dequeue();
        for (let i = 0; i < graph[user].length; i++) {
            if (graph[user][i] === r) return true;
            if (!enqueued.includes(graph[user][i])) {
                enqueued.push(graph[user][i]);
                discovered.enqueue(graph[user][i])
            }
        }
    }
    return false;
};

module.exports = connected;
