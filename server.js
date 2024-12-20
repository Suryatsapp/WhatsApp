const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const crypto = require('crypto');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// A simple AES encryption key
const secretKey = 's3cr3tkeyforencryption';

function encryptMessage(message) {
  const cipher = crypto.createCipher('aes-256-cbc', secretKey);
  let encrypted = cipher.update(message, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
}

function decryptMessage(encryptedMessage) {
  const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = decipher.update(encryptedMessage, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('New user connected');

  // Listen for incoming messages
  socket.on('message', (msg) => {
    const encryptedMessage = encryptMessage(msg);
    // Broadcast the encrypted message to all clients
    io.emit('message', encryptedMessage);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
