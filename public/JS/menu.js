document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

    const response = await axios.get('http://localhost:3000/api/v1/cuisines', config);
    console.log('Complete response:', response);
    console.log(localStorage)

    // Handle the response here (e.g., redirect to another page)

    let cuisines = response.data.message.cuisines
    const productList = document.querySelector('.productList')[0]
    

    for (cuisine of cuisines) {
        const div = `<div class="card"><img src="images/menu-1.jpg" alt="Product Image"><div class="card-body"><h3 class="card-title">${cuisine.name}</h3><p>${cuisine.description}</p></div><p class="card-price">$${cuisine.price}</p></div>`
        productList.appendChild(div)
    }



    /*<div class="card">
            <img src="images/menu-1.jpg" alt="Product Image">
            <div class="card-body">
              <h3 class="card-title">Grilled Chicken</h3>
              <p>Ipsum ipsum clita erat amet dolor justo diam</p>
            </div>
            <p class="card-price">$120.50</p>
          </div>
          */
        
});