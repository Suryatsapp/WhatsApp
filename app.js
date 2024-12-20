document.addEventListener("DOMContentLoaded", function() {
  const sendButton = document.getElementById('send-btn');
  const messageInput = document.getElementById('message-input');
  const chatBox = document.getElementById('chat-box');
  const callControls = document.getElementById('call-controls');
  const startCallButton = document.getElementById('start-call');
  const endCallButton = document.getElementById('end-call');

  // Mock AI response function
  function aiRespond(userMessage) {
    const aiMessage = document.createElement('div');
    aiMessage.classList.add('message', 'received');
    aiMessage.innerHTML = `Rishi AI: You said "${userMessage}". How can I assist you more?`;
    chatBox.appendChild(aiMessage);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Handle send button click
  sendButton.addEventListener('click', () => {
    const userMessage = messageInput.value.trim();

    if (userMessage) {
      // Display user message
      const userMessageElement = document.createElement('div');
      userMessageElement.classList.add('message', 'sent');
      userMessageElement.textContent = userMessage;
      chatBox.appendChild(userMessageElement);
      chatBox.scrollTop = chatBox.scrollHeight;

      // Clear input field
      messageInput.value = '';

      // AI responds after a short delay
      setTimeout(() => {
        aiRespond(userMessage);
      }, 1000);
    }
  });

  // Handle enter key press for sending message
  messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      sendButton.click();
    }
  });

  // Call controls for starting and ending video calls
  startCallButton.addEventListener('click', () => {
    alert("Video call started!");
    // You would initiate a WebRTC call here
  });

  endCallButton.addEventListener('click', () => {
    alert("Call ended.");
    // End WebRTC call here
  });

  // Simulate AI system for a start
  aiRespond("Hello, I'm Rishi AI. How can I assist you?");
});
