const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8888 });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Connection closed');
    });
});

console.log('Signaling server is running on ws://localhost:8888');