document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                email,
                password
            });

            // Handle the response here (e.g., redirect to another page)
            console.log('Login successful:', response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = "http://localhost:5500/views/home.html";
        } catch (error) {
            const errorElement = document.querySelector('.login .container .form .error');
            errorElement.innerHTML = error.response.data.message;
            errorElement.style.display = 'block';
        }
    });
});
