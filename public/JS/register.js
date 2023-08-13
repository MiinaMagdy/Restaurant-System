document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(signupForm);

        const formObject = {};
        formData.forEach((value, key) => {
            formObject[key] = value;
        });

        try {
            const response = await axios.post('http://localhost:3000/users/register', formObject);

            // Handle the response here (e.g., redirect to another page)
            console.log('Register successful:', response.data);
            localStorage.setItem('token', response.data.token);
            window.location.href = "http://localhost:5500/views/home.html";
        } catch (error) {
            const errorElement = document.querySelector('.signup .container .form .error');
            errorElement.innerHTML = error.response.data.message;
            errorElement.style.display = 'block';
        }
    });
});
