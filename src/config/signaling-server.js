const WebSocket = require('ws');

const wsscr = new WebSocket.Server({ port: 8887 }); // consult request
const wss = new WebSocket.Server({ port: 8888 }); // videopage - WebRTC
const wsssl = new WebSocket.Server({ port: 8889 }); // suggestion list
const wsspb = new WebSocket.Server({ port: 8890 }); // progress bar
const wsssg = new WebSocket.Server({ port: 8891 }); // Signaling-server ws

let participants = 0;
// let usingVip = null;
// let usingPb = null;

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

// console.log(
//   'WebSocket server for consult request is running on ws://localhost:8887'
// );

let pbId = '';
let vipId = '';
let isVip = false;
let isPb = false;
// let isOpen = false;
// let usingVip = false;
// let usingPb = false;
// let vipOverflow = false;
// let pbOverflow = false;

const channels = {};

wss.on('connection', (ws, req) => {
  const channel = req.url.split('/').pop();
  ws.channel = channel;

  // 채널이 존재하지 않는다면 초기화
  if (!channels[ws.channel]) {
    channels[channel] = {
      participants: 0,
      usingVip: false,
      usingPb: false,
      vipOverflow: false,
      pbOverflow: false,
    };
  }

  const channelData = channels[ws.channel];

  ws.on('message', (message) => {
    const jsonString = message.toString();
    const parsedObject = JSON.parse(jsonString);
    console.log(parsedObject);

    const { isOpen, isVip, isPb, vipId, pbId } = parsedObject;

    if (isOpen && isVip) {
      if (!channelData.usingVip) {
        channelData.usingVip = true;
        channelData.participants++;
      } else {
        channelData.vipOverflow = true;
      }
    } else if (isOpen && isPb) {
      if (!channelData.usingPb) {
        channelData.usingPb = true;
        channelData.participants++;
      } else {
        channelData.pbOverflow = true;
      }
    } else if (!isOpen) {
      if (!channelData.vipOverflow && !channelData.pbOverflow) {
        channelData.participants--;
        channelData.usingVip = false;
        channelData.usingPb = false;
      }
      channelData.participants = Math.max(0, channelData.participants);
      channelData.vipOverflow = false;
      channelData.pbOverflow = false;
    }

    ws.send(
      JSON.stringify({
        count: channelData.participants,
        isVip,
        isPb,
        vipOverflow: channelData.vipOverflow,
        pbOverflow: channelData.pbOverflow,
      })
    );
  });

  console.log('channel', channel, vipId, pbId, isVip, isPb);

  ws.send(
    JSON.stringify({
      type: 'participants',
      count: channels[ws.channel].participants,
    })
  );

  ws.on('close', () => {
    console.log(
      'Connection closed. Participants:',
      ws.channel,
      channels[ws.channel].participants
    );

    wss.clients.forEach((client) => {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.channel === channel
      ) {
        client.send(
          JSON.stringify({
            type: 'participants',
            count: channels[ws.channel].participants,
          })
        );

        // client.send(message);

        // console.log("send msg");

        // wss.clients.forEach((client) => {
        //   if (client.readyState === WebSocket.OPEN && client.channel === channel) {
        //     try {
        //       client.send(JSON.stringify({ type: 'participants', count: participants }));
        //     } catch (error) {
        //       console.error('Error broadcasting participants count:', error);
        //     }
        //   }
        // });

        // console.log("url:", req.url);

        // broadcastParticipants();
        // console.log('New connection. Participants:', participants, vipId, pbId, isVip, isPb, usingVip, usingPb);
      }
    });
  });
});

function broadcastParticipants() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(
          JSON.stringify({ type: 'participants', count: participants })
        );
      } catch (error) {
        console.error('Error broadcasting participants count:', error);
      }
    }
  });
}

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

wsssg.on('connection', (ws, req) => {
  const channel = req.url.split('/').pop();

  ws.channel = channel;

  ws.on('message', (message) => {
    wsssg.clients.forEach((client) => {
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
    console.log('port 8891 Connection closed');
  });
});
