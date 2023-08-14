var socket = io();

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');

const name = prompt('What is your name?');
const role = prompt('What is your role? (admin/staff/client)');

const room1 = 'admin-staff';
const room2 = 'admin-client';

let whichRoom = '';

if (role === 'admin') {  // admin is able to join both room so you have to choose one
  whichRoom = prompt('Which room do you want to join? (1 for admin-staff, 2 for admin-client)');
}

// choosing a room to emit on
const roomSelection = role === 'admin' ? (whichRoom === '1' ? room1 : room2) : (role === 'staff' ? room1 : room2);

socket.emit('new-user', { name, role, whichRoom });

form.addEventListener('submit', function(e) {
    e.preventDefault();
    var message = input.value;
    if (input.value) {
        const data = {message, name};
        socket.emit(roomSelection, data);
        appendMsg(name, `${input.value}`, true);
        input.value = '';
    }
});

socket.on('chat message', data => {
    appendMsg(data.name, `${data.message}`, false);
});

socket.on('user-connected', username => {
    appendMsg(username, `${username} joined the chat`, false);
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

