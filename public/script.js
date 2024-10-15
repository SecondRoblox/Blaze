const socket = io();

// DOM Elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');

// Display incoming messages
socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

// Send message to server
sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.emit('message', message);
        messageInput.value = ''; // Clear the input
    }
});
