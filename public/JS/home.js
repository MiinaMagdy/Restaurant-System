document.addEventListener('DOMContentLoaded', async () => {

    const userName = localStorage.getItem('userName'); // Assuming you're storing the user's name with the key 'userName'
    const loginButton = document.getElementById('loginButton');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const userNameSpan = document.getElementById('userName');

    const logoutBtn = document.querySelector("#logout");

    if (userName) {
        loginButton.style.display = 'none'; // Hide the login button
        userNameSpan.textContent = userName; // Set the user's name in the welcome message
        welcomeMessage.style.display = 'block'; // Show the welcome message
        logoutBtn.style.display = "inline";
    }

    logoutBtn.addEventListener("click", async () => {
        localStorage.setItem('userName', "");
        localStorage.setItem('userRole', "");
        window.location = "http://localhost:3000/"
    });
});