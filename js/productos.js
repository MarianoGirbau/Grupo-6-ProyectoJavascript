let productos = []; //arreglo de productos

export class Producto {
  constructor(id, nombre, precio, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}

//Agregar Productos Predefinidos
function productosCargados() {
    const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));
    if (!productosLocalStorage) {
      let producto1 = new Producto(
        uuidv4(),
        "Msi Rtx 3060 Ventus",
        200000,
        "La GeForce RTX 3060 te permite enfrentarte a los juegos más recientes utilizando la potencia de Ampere.",
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
        "Placa base AMD AM4 inspirada en el diseño arquitectónico, con Core Boost, DDR4 Boost, Audio Boost, Turbo M.2.",
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
  
      localStorage.setItem("productos", JSON.stringify(productos)); // agrego el arreglo al localStorage
    }
  }

  function uuidv4() {
    return crypto.randomUUID();
  }

  productosCargados();
