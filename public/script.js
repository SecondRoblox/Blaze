const socket = io();
const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('usernameInput');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');

// Store the username
let username = '';

// Update username on input
usernameInput.addEventListener('input', (event) => {
    username = event.target.value;
});

// Send message on button click
sendMessageButton.addEventListener('click', sendMessage);

// Send message on pressing enter
messageInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Send message function
function sendMessage() {
    const message = messageInput.value;
    if (message && username) {
        socket.emit('message', { username, message });
        messageInput.value = ''; // Clear the input
    }
}

// Listen for incoming messages
socket.on('message', (data) => {
    const { username, message } = data;
    const messageElement = document.createElement('div');
    messageElement.innerHTML = `${username} : ${message}`;
    messagesContainer.appendChild(messageElement);
});

// Handle Shift + V for the verified badge
document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'V') {
        addVerifiedBadge();
    }
});

// Function to add the verified badge
function addVerifiedBadge() {
    const existingBadge = document.querySelector('.verified-badge');
    if (!existingBadge) {
        const badgeImg = document.createElement('img');
        badgeImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e4/20221106164002%21Twitter_Verified_Badge.svg/120px-Twitter_Verified_Badge.svg.png';
        badgeImg.classList.add('verified-badge');
        usernameInput.parentNode.insertBefore(badgeImg, usernameInput.nextSibling); // Place it next to the username input
    }
}
