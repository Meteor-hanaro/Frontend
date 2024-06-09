const WebSocket = require('ws');

const wsscr = new WebSocket.Server({ port: 8887 }); // consult request
const wss = new WebSocket.Server({ port: 8888 }); // videopage - WebRTC
const wsssl = new WebSocket.Server({ port: 8889 }); // suggestion list
const wsspb = new WebSocket.Server({ port: 8890 }); // progress bar

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

console.log(
  'WebSocket server for consult request is running on ws://localhost:8887'
);


let pbId = '';
let vipId = '';
let isVip = false;
let isPb = false;
let isOpen = false;
let usingVip = false;
let usingPb = false;
let vipOverflow = false;
let pbOverflow = false;
wss.on('connection', (ws, req) => {

  ws.on('message', message => {
    const jsonString = message.toString();
    const parsedObject = JSON.parse(jsonString);
    console.log(parsedObject);

    isOpen = parsedObject.isOpen;
    isVip = parsedObject.isVip;
    isPb = parsedObject.isPb;
    vipId = parsedObject.vipId;
    pbId = parsedObject.pbId;

    if(isOpen && isVip) {
      if(!usingVip) {
        usingVip = true;
        participants++;
      } else {
        vipOverflow = true;
      }
    }
    else if(isOpen && isPb) {
      if(!usingPb) {
        usingPb = true;
        participants++;
      } else {
        pbOverflow = true;
      }
    }
    else if(!isOpen) {
      if(!vipOverflow && !pbOverflow) {
        participants--;
        usingVip = false;
        usingPb = false;
      }
      participants = participants < 0 ? 0 : participants;
      vipOverflow = false;
      pbOverflow = false;
    }

    ws.send(JSON.stringify({ count: participants, isVip, isPb, vipOverflow, pbOverflow })); 
  }) 

  const channel = req.url.split('/').pop();
  
  console.log("channel", channel, vipId, pbId, isVip, isPb);

  ws.channel = channel;

  console.log("url:", req.url);
  
  
  // broadcastParticipants();
  console.log('New connection. Participants:', participants, vipId, pbId, isVip, isPb, usingVip, usingPb);

  
  ws.send(JSON.stringify({ type: 'participants', count: participants }));
  console.log("send msg");
  

  
  // wss.clients.forEach((client) => {
  //   if (client.readyState === WebSocket.OPEN && client.channel === channel) {
  //     try {
  //       client.send(JSON.stringify({ type: 'participants', count: participants }));
  //     } catch (error) {
  //       console.error('Error broadcasting participants count:', error);
  //     }
  //   }
  // });

  ws.on('close', () => {
    console.log('Connection closed. Participants:', participants);

    wss.clients.forEach((client) => {
      if (
        client !== ws &&
        client.readyState === WebSocket.OPEN &&
        client.channel === channel
      ) {
        client.send(JSON.stringify({ type: 'participants', count: participants }));

        // client.send(message);
      }
    });
  });
});


function broadcastParticipants() {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify({ type: 'participants', count: participants }));
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
