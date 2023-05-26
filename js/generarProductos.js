const productosLocalStorage = JSON.parse(localStorage.getItem("productos"))
console.log(productosLocalStorage)


const listaProductos = document.getElementById("productos");
productosLocalStorage.forEach((producto) => {
const tarjetaHTML= `
<div class="col-md-4">
    <div class="card mb-4" style="border: 5px solid #ccc;">
        <img src="${producto.imagen}" class="card-img-top" alt="Producto 1">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text">${producto.descripcion}</p>
            <p class="card-text font-weight-bold" style="color: rgb(226, 124, 0);">$${producto.precio}</p>
            <div class="text-center">
                <a href="#" class="btn btn-primary">Comprar</a>
            </div>
        </div>
    </div>
</div>
`;
listaProductos.innerHTML+=tarjetaHTML;
});
