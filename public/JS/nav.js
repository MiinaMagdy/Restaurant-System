// Fetch the user role from local storage
const userRole = localStorage.getItem('userRole');

document.addEventListener("DOMContentLoaded", function () {
    
    // References to UI elements
    const chatToggle = document.querySelector(".chat-toggle");
    const chatSubMenu = document.querySelector(".ch");
    const dashboardLink = document.getElementById('dashboardLink');
    const menuLink = document.getElementById('menuLink');
    const bookLink = document.getElementById('bookLink');
    const bookTableBtn = document.getElementById('bookTableBtn');
    const customAlert = document.getElementById("customAlert");
    const closeAlert = document.getElementById("closeAlert");
    
    // Close the alert
    closeAlert.addEventListener("click", function() {
        customAlert.style.display = "none";
    });

    // If no user role is found or the user is not an admin, hide the chat submenu
    if (!userRole || ['chief', 'staff', 'delivery', 'client'].includes(userRole)) {
        chatSubMenu.style.display = 'none';
    }

    // Toggle chat menu display for admins, or redirect others to chat
    chatToggle.addEventListener("click", function() {
        if (!userRole) {
            customAlert.style.display = "block";
            return;
        }

        if (userRole === 'admin') {
            chatSubMenu.style.display = (chatSubMenu.style.display === 'none' || chatSubMenu.style.display === '') ? 'block' : 'none';  //if user admin and submenu hidden show it
        } else {
            window.location.href = "/chat";
        }
    });
    
    // Set which chat room is active and save it to local storage
    var chatOptions = document.querySelectorAll("[data-room]");
    chatOptions.forEach(function(option) {
        option.addEventListener("click", function () {
            localStorage.setItem('whichRoom', this.getAttribute("data-room"));
        });
    });

    // If the user is not an admin, hide the dashboard link
    if (userRole !== 'admin') {
        dashboardLink.style.display = 'none';
    }
        

    // Function to handle link clicks for non-logged-in users (any that uses this will show alert block)
    function handleLinkClick(event) {
        if (!userRole) {
            event.preventDefault();  // Prevent the link from navigating
            customAlert.style.display = "block";
        }
    }
    
    // Add event listeners to menu and book links to handle click events
    menuLink.addEventListener("click", handleLinkClick);
    bookLink.addEventListener("click", handleLinkClick);
    bookTableBtn.addEventListener("click", handleLinkClick);
});
