document.addEventListener("DOMContentLoaded", function () {
  // Abrir y cerrar carrito
  const btnCart = document.querySelector(".container-cart-icon");

  const containerCartProducts = document.querySelector(
    ".container-cart-products"
  );

  btnCart.addEventListener("click", () => {
    containerCartProducts.classList.toggle("hidden-cart");
  });

  var btnsComprar = document.querySelectorAll(".compra");
  const contadorProductos = document.getElementById("contador-productos");
  const cartProducts = document.querySelector(".container-cart-products");
  const cartProductList = document.querySelector(".row-product");
  const totalPagar = document.querySelector(".total-pagar");
  const closeModalBtn = document.querySelector(".icon-close");

  // Inicializar contador de productos y arreglo de productos en el carrito
  let productosEnCarrito = [];
  let contador = 0;

  // Agregar evento click a los botones de compra
  btnsComprar.forEach((btn) => {
    btn.addEventListener("click", agregarAlCarrito);
  });

  // Agregar producto al carrito
  function agregarAlCarrito(e) {
    const productoCard = e.target.closest(".card");
    const titulo = productoCard.querySelector(".card-title").textContent;
    const precio = productoCard.querySelector(".font-weight-bold").textContent;

    // Crear objeto producto
    const producto = {
      titulo,
      precio,
    };

    // Agregar producto al arreglo de productos en el carrito
    productosEnCarrito.push(producto);

    // Actualizar contador de productos
    contador++;
    contadorProductos.textContent = contador;

    // Mostrar carrito y productos en el modal
    mostrarCarrito();

    // Evitar que el enlace del botón se active
    e.preventDefault();
  }

  // Mostrar carrito y productos en el modal
  function mostrarCarrito() {
    // Limpiar lista de productos en el carrito
    cartProductList.innerHTML = "";

    // Mostrar productos en el carrito
    productosEnCarrito.forEach((producto) => {
      const productoHTML = `
      <div class="cart-product">
        <div class="info-cart-product">
          <span class="cantidad-producto-carrito sangria text-withe"> 1 </span>
          <p class="titulo-producto-carrito">${producto.titulo}</p>
          <span class="precio-producto-carrito">${producto.precio}</span>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="icon-close" viewBox="0 0 16 16">
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </div>
    `;
      cartProductList.innerHTML += productoHTML;
    });

    // Calcular y mostrar el total a pagar
    const total = productosEnCarrito.reduce((suma, producto) => {
      const precio = Number(producto.precio.replace("$", ""));
      return suma + precio;
    }, 0);
    totalPagar.textContent = `$${total}`;

    // Mostrar el carrito y actualizar la clase CSS
    cartProducts.classList.remove("hidden-cart");
  }

  // Cerrar el modal al hacer clic en el botón de cerrar
  closeModalBtn.addEventListener("click", () => {
    cartProducts.classList.add("hidden-cart");
  });

  // Agregar evento click a los botones de cerrar producto
  cartProductList.addEventListener("click", eliminarProducto);

  // Eliminar producto del carrito
  function eliminarProducto(e) {
    if (e.target.classList.contains("icon-close")) {
      const productoElement = e.target.closest(".cart-product");
      const tituloProducto = productoElement.querySelector(
        ".titulo-producto-carrito"
      ).textContent;

      // Encontrar el índice del producto a eliminar
      const index = productosEnCarrito.findIndex(
        (producto) => producto.titulo === tituloProducto
      );
      if (index !== -1) {
        // Eliminar el producto del arreglo
        productosEnCarrito.splice(index, 1);

        // Actualizar contador de productos y mostrar el carrito actualizado
        contador = productosEnCarrito.length;
        contadorProductos.textContent = contador;
        mostrarCarrito();
      }
    }
  }
});
