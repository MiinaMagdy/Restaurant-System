document.addEventListener("DOMContentLoaded", function () {
const userRole = localStorage.getItem('userRole');

const chatToggle = document.querySelector(".chat-toggle");
const chatSubMenu = document.querySelector(".ch");
const customAlert = document.getElementById("customAlert");
const closeAlert = document.getElementById("closeAlert");

closeAlert.addEventListener("click", function() {
    customAlert.style.display = "none";
});

if (!userRole) {
    chatSubMenu.style.display = 'none';
} else if (userRole === 'staff' || userRole === 'client') {
    chatSubMenu.style.display = 'none';
}

chatToggle.addEventListener("click", function() {
    if (!userRole) {
        customAlert.style.display = "block";
        return;
    }

    if (userRole === 'admin') {
        chatSubMenu.style.display = (chatSubMenu.style.display === 'none' || chatSubMenu.style.display === '') ? 'block' : 'none';
    }else if (userRole === 'staff' || userRole === 'client') {
        window.location.href = "/chat";
        }
    });

});

var chatOptions = document.querySelectorAll("[data-room]");
chatOptions.forEach(function(option) {
    option.addEventListener("click", function () {
        localStorage.setItem('whichRoom', this.getAttribute("data-room"));
    });
});