const socket = io();

// DOM Elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const usernameInput = document.getElementById('usernameInput');

// Display incoming messages
socket.on('message', (data) => {
    const { username, message } = data;
    const messageElement = document.createElement('div');
    messageElement.textContent = `${username}: ${message}`;
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to the bottom
});

// Send message to server
sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    const username = usernameInput.value || 'Anonymous'; // Default to "Anonymous" if no username
    if (message) {
        socket.emit('message', { username, message });
        messageInput.value = ''; // Clear input field
    }
});
