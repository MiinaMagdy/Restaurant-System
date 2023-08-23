document.addEventListener('DOMContentLoaded', async () => {

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
    
        const response = await axios.get('http://localhost:3000/api/v1/users', config);
        console.log('Complete response:', response);
        console.log(localStorage)
    
        // Handle the response here (e.g., redirect to another page)
          console.log(response);
        let users = response.data.result
        const usersList = document.querySelector('tbody')
        console.log(usersList)
    
        for (let user of users) {
            const div = `<tr><td><img src="/images/avatars/defaultAvatar.png"><p>${user.fullname}</p></td><td>${user.email}</td><td><span class="status completed">${user.role}</span></td></tr>`
            usersList.innerHTML += div
        }
    });

    /*
      <tr>
          <td>
              <img src="/images/avatars/defaultAvatar.png">
              <p>veronica</p>
          </td>
          <td>sunday 7 Am</td>
          <td><span class="status completed">Completed</span></td>
      </tr>
    */