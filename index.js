const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const runTelega = require('./bot');

const app = express();

app.get('/', (_req, res) => {
  res.send('server is running');
});

//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

const telega = runTelega();

telega
  .then(api => api.on('message', message => {

    wss.clients.forEach(client => {
      if(client.readyState === WebSocket.OPEN){
        client.send(JSON.stringify(message));
      }
    })
  })
);

wss.on('connection', (ws) => {
    ws.send("socket was connected");
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
    console.log(`server was running on ${PORT} port`);
})
