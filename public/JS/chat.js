var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var disconnectBtn = document.getElementById('disconnect-btn');

const userName = localStorage.getItem('userName');
const userRole = localStorage.getItem('userRole');
console.log('Retrieved from localStorage:', userName, userRole);


const room1 = 'admin-staff';
const room2 = 'admin-client';

const whichRoom = localStorage.getItem('whichRoom');
console.log('room choice is: ', whichRoom);

const userData = {
    name: userName,
    role: userRole, 
    whichRoom
};

// choosing a room to emit on
const roomSelection = userRole === 'admin' ? (whichRoom === '1' ? room1 : room2) : (userRole === 'staff' ? room1 : room2);

socket.emit('new-user', { name: userName, role: userRole, whichRoom });

form.addEventListener('submit', function(e) {
    e.preventDefault();
    var message = input.value;
    if (input.value) {
        const data = {message, name: userName, role: userRole};
        socket.emit(roomSelection, data);
        appendMsg(userName, `${input.value}`, true);
        input.value = '';
    }
});

disconnectBtn.addEventListener('click', function() {
    // Manually disconnect the socket from the client side
    socket.disconnect();

    // Redirect to the home page after disconnecting
    window.location.href = "/";
});


socket.on('chat message', data => {
    if(data.role === 'admin') {
        appendMsg(data.name + ' (ADMIN)', `${data.message}`, false);
    }
    else {
        appendMsg(data.name, `${data.message}`, false);
    }
});

socket.on('user-connected', data => {
    if(data.role === 'admin') {
        appendMsg(data.name + ' (ADMIN)', `${data.name} joined the chat`, false);
    }
    else {
        appendMsg(data.name, `${data.name} joined the chat`, false);
    }
});

socket.on('user-disconnected', data => {
    if(data.role === 'admin') {
        appendMsg(data.name + ' (ADMIN)', `${data.name} left the chat`, false);
    }
    else {
        appendMsg(data.name, `${data.name} left the chat`, false);
    }
});

function appendMsg(senderName, msg, isSender) {
    var messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper');

    var nameDiv = document.createElement('div');
    nameDiv.textContent = senderName;
    nameDiv.classList.add('sender-name');

    var item = document.createElement('li');
    item.textContent = msg;
    item.classList.add('message');

    if (isSender) {
        item.classList.add('sent');
        messageWrapper.appendChild(item);
    } else {
        nameDiv.classList.add('received');
        item.classList.add('received');
        messageWrapper.appendChild(nameDiv);
        messageWrapper.appendChild(item);
    }

    messages.appendChild(messageWrapper);
    messages.scrollTop = messages.scrollHeight; // auto-scroll to the bottom
}

