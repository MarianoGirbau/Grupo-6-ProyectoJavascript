const btnCart = document.querySelector('.container-cart-icon')

const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click' , () => {

    containerCartProducts.classList.toggle ('hidden-cart')

})

// division

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// Productos a agregar

const productsList = document.querySelector('.container-items')
// .container-items es la clase de los productos a agregar

// Variable de arreglos de productos
let allProducts =[]


productsList.addEventListener('click', e => {
    console.log(e.target.classList.contains('btn-add-cart'))
})