const _ = require('lodash');
const WebSocket = require('ws');

const commandParser = require('./commandParser');

const port = process.env.PORT||1337;
const wss = new WebSocket.Server({port});

const sockets = {};

function addSocket(socketId, socket) {
    console.log("Add socket: " + socketId);
    sockets[socketId] = socket;
}

function removeSocket(socketId) {
    delete sockets[socketId];
}

function sendToAllSockets(obj) {
    _.forOwn(sockets, function (socket, socketId) {
        const strObj = JSON.stringify(obj);
        console.log("send to socket " + socketId + ": " + strObj);
        socket.send(strObj);
    })
}

function sendCommandToAllSockets(commandString) {
    const command = commandParser.parse(commandString);
    console.log("send to all sockets:");
    console.log(command);

    sendToAllSockets(command);
}

wss.on('connection', function(ws) {
    const socketId = ws._ultron.id;
    addSocket(socketId, ws);

    ws.on('message', function(commandString) {
        sendCommandToAllSockets(commandString);
    });

    ws.send('connected: ' + socketId);
});
