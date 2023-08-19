document.addEventListener('DOMContentLoaded', async () => {

    const token = localStorage.getItem('token');
    const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

    const response = await axios.get('http://localhost:3000/api/v1/cuisines', config);
    console.log('Complete response:', response);
    console.log(localStorage)

    // Handle the response here (e.g., redirect to another page)

    let {cuisines} = response.data.message
    const productList = document.getElementById('productList')
    console.log(productList)

    for (let cuisine of cuisines) {
        const div = `<div class="card"><img src="${cuisine.image}" alt="Product Image"><div class="card-body"><h3 class="card-title">${cuisine.name}</h3><p>${cuisine.description}</p></div><p class="card-price">$${cuisine.price}</p></div>`
        productList.innerHTML += div
    }
        
});