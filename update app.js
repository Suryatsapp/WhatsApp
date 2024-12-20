const socket = io();

document.addEventListener("DOMContentLoaded", function() {
  const sendButton = document.getElementById('send-btn');
  const messageInput = document.getElementById('message-input');
  const chatBox = document.getElementById('chat-box');

  // Send message to server when the user clicks "Send"
  sendButton.addEventListener('click', () => {
    const userMessage = messageInput.value.trim();
    if (userMessage) {
      // Display user message
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add('message', 'sent');
      userMessageElement.textContent = userMessage;
      chatBox.appendChild(userMessageElement);
      chatBox.scrollTop = chatBox.scrollHeight;

      // Send the message to the server
      socket.emit('message', userMessage);
      messageInput.value = ''; // Clear input
    }
  });

  // Listen for incoming messages from server
  socket.on('message', (encryptedMessage) => {
    const decryptedMessage = decryptMessage(encryptedMessage);
    const aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'received');
    aiMessage.innerHTML = `Rishi AI: ${decryptedMessage}`;
    chatBox.appendChild(aiMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  });
});
