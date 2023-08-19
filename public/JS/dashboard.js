document.addEventListener('DOMContentLoaded', async () => {

        const token = localStorage.getItem('token');
        const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
    
        const response = await axios.get('http://localhost:3000/api/v1/users', config);
        console.log('Complete response:', response);
        console.log(localStorage)
    
        // Handle the response here (e.g., redirect to another page)
    
        let {users} = response.data.message
        const productList = document.getElementById('productList')
        console.log(productList)
    
        for (let user of users) {
            const div = `<div class="card"><img src="${user.image}" alt="Product Image"><div class="card-body"><h3 class="card-title">${cuisine.name}</h3><p>${cuisine.description}</p></div><p class="card-price">$${cuisine.price}</p></div>`
            productList.innerHTML += div
        }
            
    });