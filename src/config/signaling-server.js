const WebSocket = require('ws');

const wsscr = new WebSocket.Server({ port: 8887 }); // consult request
const wss = new WebSocket.Server({ port: 8888 }); // videopage - WebRTC
const wsssl = new WebSocket.Server({ port: 8889 }); // suggestion list
const wsspb = new WebSocket.Server({ port: 8890 }); // progress bar

wsscr.on('connection', (ws) => {
  ws.on('message', (message) => {
    wsscr.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Connection closed');
  });
});

console.log(
  'WebSocket server for consult request is running on ws://localhost:8887'
);

wss.on('connection', (ws, req) => {
  const channel = req.url.split('/').pop();

  ws.channel = channel;

  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.channel === channel
      ) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('port 8888 Connection closed');
  });
});

wsssl.on('connection', (ws, req) => {
  const channel = req.url.split('/').pop();

  console.log(req.url);
  ws.channel = channel;

  console.log(`New Connection to Channel: ${ws.channel}`);
  ws.on('message', (message) => {
    wsssl.clients.forEach((client) => {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.channel === channel
      ) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('port 8889 Connection closed');
  });
});

wsspb.on('connection', (ws, req) => {
  const channel = req.url.split('/').pop();

  ws.channel = channel;

  ws.on('message', (message) => {
    wsspb.clients.forEach((client) => {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.channel === channel
      ) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('port 8890 Connection closed');
  });
});
