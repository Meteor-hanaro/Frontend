const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8888 }); // videopage - WebRTC
const wsssl = new WebSocket.Server({ port: 8889 }); // suggestion list
const wsspb = new WebSocket.Server({ port: 8890 }); // progrss bar

wss.on("connection", (ws) => {
  ws.on("message", (message) => {
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});

wsssl.on("connection", (ws) => {
  ws.on("message", (message) => {
    wsssl.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});

console.log("suggestion list socket server is running on ws://localhost:8889");

wsspb.on("connection", (ws) => {
  ws.on("message", (message) => {
    wsspb.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Connection closed");
  });
});

console.log("progress bar socket server is running on ws://localhost:8889");
