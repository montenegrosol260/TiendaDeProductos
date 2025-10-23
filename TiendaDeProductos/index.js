let tableContent = ''; //este va a ser el acumulador que concatena cada tr
const tableBodyElement = document.querySelector('#tableBody');
let totalProducts = JSON.parse(window.localStorage.getItem('totalProducts'))|| [];
const searchInputElem = document.querySelector('#searchInput');

searchInputElem.addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredProducts = totalProducts.filter(product => 
        product.title.toLowerCase().includes(searchValue)
    );
    renderTable(filteredProducts);
});

const goToProductDetails = (productId) => {
    const selectedProduct = totalProducts.find(product => product.id === productId);
    //console.log(selectProduct);(
    //stremificamos y se parsea con el json.
    window.localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct))
    window.location.href = `product_details.html?id=${productId}`;
};


if(totalProducts.length === 0){
fetch('https://fakestoreapi.com/products')
.then(Response => Response.json())
.then(products => { 
    totalProducts = products; //variable que apunta a los 20 productos que traemos, candidato como localstorage
    window.localStorage.setItem('totalProducts', JSON.stringify(products)); //guardamos en localstorage
    products.forEach(product => {
        tableContent += ` 
            <tr> 
                <td><a href="#" onclick="goToProductDetails('${product.id}')">${product.title}</a></td>
                <td>${product.price}</td>
                <td><img src="${product.image}" alt="${product.title}" width="100"></td>
            </tr>
            `;


    });

    const renderTable = (products) => {
        tableContent = ''; //reiniciamos el contenido de la tabla
        products.forEach(product => {
            tableContent += ` 
                <tr> 
                    <td><a href="#" onclick="goToProductDetails('${product.id}')">${product.title}</a></td>
                    <td>${product.price}</td>
                    <td><img src="${product.image}" alt="${product.title}" width="100"></td>
                </tr>
                `;
        });

    tableBodyElement.innerHTML = htmlContent;

}});
}else{
    renderTable(totalProducts);
}