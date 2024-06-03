const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8888 }); // videopage - WebRTC
const wsssl = new WebSocket.Server({ port: 8889 }); // suggestion list
const wsspb = new WebSocket.Server({ port: 8890 }); // progrss bar

wss.on("connection", (ws) => {
  ws.on("message", (message) => {


    const data = JSON.parse(message);

    switch (data.type) {
        case 'join':
            const room = data.room;
            const isPb = data.isPb;

            if (!rooms[room]) {
                rooms[room] = { pb: null, users: [] };
            }
 
            const roomInfo = rooms[room];
            if (isPb) {
                if (roomInfo.pb) {
                    ws.send(JSON.stringify({ type: 'room_full', message: 'PB already in the room.' }));
                } else {
                    roomInfo.pb = ws;
                    ws.room = room;
                    ws.isPb = true;
                    ws.send(JSON.stringify({ type: 'joined', room }));
                    broadcastToRoom(room, { type: 'user_joined', isPb: true });
                }
            } else {
                if (roomInfo.users.length >= 1) {
                    ws.send(JSON.stringify({ type: 'room_full', message: 'Room already has a user.' }));
                } else {
                    roomInfo.users.push(ws);
                    ws.room = room;
                    ws.isPb = false;
                    ws.send(JSON.stringify({ type: 'joined', room }));
                    broadcastToRoom(room, { type: 'user_joined', isPb: false });
                }
            }
            break;

        case 'leave':
            leaveRoom(ws);
            break;

        default:
            break;
    }

    // wss.clients.forEach((client) => {
    //   if (client !== ws && client.readyState === WebSocket.OPEN) {
    //     client.send(message);
    //   }
    // });
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
