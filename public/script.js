const socket = io();

// DOM Elements
const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const usernameInput = document.getElementById('usernameInput');

// Send message to server (also on Enter key)
function sendMessage() {
    const message = messageInput.value;
    const username = usernameInput.value || 'Anonymous'; // Default to "Anonymous" if no username
    if (message) {
        socket.emit('message', { username, message });
        messageInput.value = ''; // Clear input field
    }
}

// Listen for Enter key
messageInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Send message when button is clicked
sendMessageButton.addEventListener('click', sendMessage);

// Display incoming messages
socket.on('message', (data) => {
    const { username, message } = data;

    // Create message element with clickable username
    const messageElement = document.createElement('div');
    const usernameElement = document.createElement('span');
    usernameElement.textContent = username;
    usernameElement.style.color = 'blue';
    usernameElement.style.cursor = 'pointer';
    usernameElement.addEventListener('click', () => {
        window.location.href = `/profile.html?username=${username}`; // Redirect to profile page
    });

    messageElement.appendChild(usernameElement);
    messageElement.append(`: ${message}`);
    messagesDiv.appendChild(messageElement);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
});
