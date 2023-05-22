const btnCart = document.querySelector('.container-icon')

const containerCartProducts = document.querySelector('.containerCartProducts')

btnCart.addEventListener('click' , () => {

    containerCartProducts.classList.toggle ('hidden-cart')

})