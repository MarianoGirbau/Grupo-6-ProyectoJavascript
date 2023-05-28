const btnCart = document.querySelector('.container-cart-icon')

const containerCartProducts = document.querySelector('.container-cart-products')

btnCart.addEventListener('click', () => {

    containerCartProducts.classList.toggle('hidden-cart')

})

// division

const cartInfo = document.querySelector('.cart-product')
const rowProduct = document.querySelector('.row-product')

// Productos a agregar

const productsList = document.querySelector('.container-items')
// .container-items es la clase de los productos a agregar

// Variable de arreglos de productos

let allProducts = []


productsList.addEventListener('click', e => {

    if (e.target.classList.contains('btn btn-primary')) {
        const product = e.target.parentElement

        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h5').textContent,
            price: product.querySelector('p1').textContent,
        }

        allProducts = [...allProducts, infoProduct]

        showHTML()
    }

//     // console.log(allProducts)

})

// Funcion para mostrar html

const showHTML = () => {

    // Limpiar HTML
    rowProduct.innerHTML = '';

    allProducts.forEach(product => {
        const containerProduct = document.createElement('div')
        containerProduct.classList.add('cart-product')

        containerProduct.innerHTML = `              
        
        <div class="info-cart-product">

            <span class="cantidad-producto-carrito"> ${product.quantity} </span>
            <p class="titulo-producto-carrito"> ${product.title} </p>
            <span class="precio-producto-carrito"> ${product.price}</span>

        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-close"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>

    `
        rowProduct.append(containerProduct);
    })
}