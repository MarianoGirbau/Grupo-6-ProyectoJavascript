import { Producto } from "./productos.js";
const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
let productos = []; //arreglo de productos

//Agregar Productos Predefinidos
function productosCargados() {

    if (!productosLocalStorage) {
        
      let producto1 = new Producto(
        uuidv4(),
        "Msi Rtx 3060 Ventus",
        200000,
        "La GeForce RTX 3060 te permite enfrentarte a los juegos más recientes utilizando la potencia de...",
        "https://i.ibb.co/yRxGqM1/msi3060.webp"
      );
      let producto2 = new Producto(
        uuidv4(),
        "Procesador Amd Ryzen 5-3600x",
        100000,
        "Termina tu trabajo a toda velocidad y sin esfuerzo con los procesadores Ryzen 5 de tercera generación.",
        "https://i.ibb.co/3zP7r9V/ryzen3600.webp"
      );
      let producto3 = new Producto(
        uuidv4(),
        "Mother B450m Pro-vdh Max",
        52767,
        "Placa base AMD AM4 inspirada en el diseño arquitectónico, con Core Boost, DDR4 Boost, Audio...",
        "https://i.ibb.co/kcPTCCr/mothermsi.jpg"
      );
      let producto4 = new Producto(
        uuidv4(),
        "Memoria ram Hyper x Fury",
        29720,
        "Tecnología DDR4 SDRAM. Memoria con formato UDIMM. Alcanza una velocidad de 2666MHz.",
        "https://i.ibb.co/SJ5Whx6/memoriaram.jpg"
      );
        
      productos.push(producto1, producto2, producto3, producto4); //agrego los productos al arreglo
      console.log(productos)
      localStorage.setItem("productos", JSON.stringify(productos)); // agrego el arreglo al localStorage
    }
  }

function uuidv4() {
  return crypto.randomUUID();
}

productosCargados();

//Para buscador deberia establecer un valor de mostrado, y que dentro del foreach vea con un if si el nombre coincide con lo buscado y mostrarlo, si no, no entra en el if

const listaProductos = document.getElementById("productos");
productosLocalStorage.forEach((producto) => {
const tarjetaHTML= `
<div class="col-6 col-md-4">
    <div class="card mb-4" style="border: 5px solid #ccc;">
        <img src="${producto.imagen}" class="card-img-top" alt="Producto 1">
        <div class="card-body">
            <h5 class="card-title">${producto.nombre}</h5>
            <p class="card-text d-none d-lg-block">${producto.descripcion}</p>
            <p class="card-text font-weight-bold" style="color: rgb(226, 124, 0);">$${producto.precio}</p>
            <div class="text-center ">
                <button class="btn btn-primary bottom-0 comprar" data-id="${producto.id}">Comprar</button> 
            </div>
        </div>
    </div>
</div>
`;
listaProductos.innerHTML+=tarjetaHTML;
});
