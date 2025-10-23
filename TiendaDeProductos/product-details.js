const productDetailsElem = document.querySelector('#productDetails');
const selectProduct = JSON.parse(window.localStorage.getItem('selectedProduct'));
productDetailsElem.textContent = JSON.stringify(selectProduct, null, 2)
//si esta vacio el localstorage que lo traiga del servidor (para practicar)