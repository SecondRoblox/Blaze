const socket = io();
const messagesContainer = document.getElementById('messages');
const usernameInput = document.getElementById('usernameInput');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');

// Store the username and verified status
let username = '';
let isVerified = false; // Track if the user is verified

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
        socket.emit('message', { username, message, isVerified });
        messageInput.value = ''; // Clear the input
    }
}

// Listen for incoming messages
socket.on('message', (data) => {
    const { username, message, isVerified } = data;
    const messageElement = document.createElement('div');

    // Create the username display
    const usernameDisplay = document.createElement('span');
    usernameDisplay.textContent = username;

    // If the user is verified, add the verified badge
    if (isVerified) {
        const badgeImg = document.createElement('img');
        badgeImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e4/20221106164002%21Twitter_Verified_Badge.svg/120px-Twitter_Verified_Badge.svg.png';
        badgeImg.classList.add('verified-badge');
        usernameDisplay.appendChild(badgeImg);
    }

    // Append username and message
    messageElement.appendChild(usernameDisplay);
    messageElement.innerHTML += `: ${message}`;
    messagesContainer.appendChild(messageElement);
});

// Handle Shift + V for the verified badge
document.addEventListener('keydown', (event) => {
    if (event.shiftKey && event.key === 'V') {
        isVerified = true; // Set user as verified
        addVerifiedBadge(); // Optionally show it in the UI
    }
});

// Optional function to add the verified badge in the UI next to the username input
function addVerifiedBadge() {
    const existingBadge = document.querySelector('.verified-badge');
    if (!existingBadge) {
        const badgeImg = document.createElement('img');
        badgeImg.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/archive/e/e4/20221106164002%21Twitter_Verified_Badge.svg/120px-Twitter_Verified_Badge.svg.png';
        badgeImg.classList.add('verified-badge');
        usernameInput.parentNode.insertBefore(badgeImg, usernameInput.nextSibling); // Place it next to the username input
    }
}
