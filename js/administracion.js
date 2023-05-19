let productos = []; //arreglo de productos

class Producto {
    constructor(id,nombre,precio,descripcion,imagen) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
        this.descripcion = descripcion
        this.imagen = imagen
    }
}

class UI {

    constructor() {
        this.editingProductId = null;
    }

    showProducts(){
        const listaProductos = document.getElementById('lista-productos')
        listaProductos.querySelector("tbody").innerHTML = '';
        productos.forEach((producto) => {
            const tr = document.createElement("tr");
            if (producto.id === this.editingProductId) {
                tr.innerHTML = `
                  <td>
                    <input type="text" id="nombreEdit" class="form-control" value="${producto.nombre}" required>
                  </td>
                  <td>
                    <input type="number" id="precioEdit"  class="form-control" value="${producto.precio}">
                  </td>
                  <td>
                    <input type="text" id="descripcionEdit" class="form-control" value="${producto.descripcion}">
                  </td>
                  <td>
                    <button class="btn btn-primary save" data-id="${producto.id}">Guardar</button>
                    <button class="btn btn-secondary cancel">Cancelar</button>
                  </td>
                `;
                tr.querySelector('.save').addEventListener('click', (event) => {
                  const productId = event.target.dataset.id;
                  const nombre = tr.querySelector('#nombreEdit').value;
                  const precio = tr.querySelector('#precioEdit').value;
                  const descripcion = tr.querySelector('#descripcionEdit').value;
                  const producto = productos.find((p) => p.id === productId); //busca en el arreglo de productos uno con el mismo id
                  if (producto) {
                    producto.nombre = nombre;
                    producto.precio = precio;
                    producto.descripcion = descripcion;
                    this.editingProductId = null;
                    this.showProducts(); // Actualizar la tabla
                  }
                });
                tr.querySelector('.cancel').addEventListener('click', () => {
                  this.editingProductId = null;
                  this.showProducts(); // Actualizar la tabla
                });
              }else {
                    console.log(productos)
                    tr.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.descripcion}</td>
                    <td>
                        <button class="btn btn-primary edit" data-id="${producto.id}">Editar</button>
                        <button class="btn btn-danger delete" data-id="${producto.id}">Eliminar</button>
                    </td>
                    `;
                    tr.querySelector('.edit').addEventListener('click', (event) => {
                    this.editingProductId = event.target.dataset.id;
                    this.showProducts(); // Actualizar la tabla
                    });
                    tr.querySelector('.delete').addEventListener('click', (event) => {
                        const productId = event.target.dataset.id;
                        const index = productos.findIndex((p) => p.id === productId);
                        if (index !== -1) {
                          if (this.editingProductId === productId) {
                            this.editingproductId = null;
                          }
                          productos.splice(index, 1);
                          this.showProducts(); // Actualizar la tabla
                        }
                      });
                }
                listaProductos.querySelector('tbody').appendChild(tr);   
        
        });
        
        // Guardar los productos en el local storage
        localStorage.setItem("productos", JSON.stringify(productos));
    }

    deleteProduct(){

    }

    showMessage(){

    }
}

//Eventos DOM

//Agregar Productos Predefinidos

function productosCargados () {
    let producto1 = new Producto(uuidv4(), "Msi Rtx 3060 Ventus", 200000, "La GeForce RTX 3060 te permite enfrentarte a los juegos más recientes utilizando la potencia de Ampere.", "https://i.ibb.co/3zP7r9V/ryzen3600.webp")
    let producto2 = new Producto(uuidv4(), "Procesador Amd Ryzen 5-3600x", 100000, "Termina tu trabajo a toda velocidad y sin esfuerzo con los procesadores Ryzen 5 de tercera generación.", "https://i.ibb.co/3zP7r9V/ryzen3600.webp")
    let producto3 = new Producto(uuidv4(), "Mother B450m Pro-vdh Max", 52767, "Placa base AMD AM4 inspirada en el diseño arquitectónico, con Core Boost, DDR4 Boost, Audio Boost, Turbo M.2.", "https://i.ibb.co/kcPTCCr/mothermsi.jpg")
    let producto4 = new Producto(uuidv4(), "Memoria ram Hyper x Fury", 29720, "Tecnología DDR4 SDRAM. Memoria con formato UDIMM. Alcanza una velocidad de 2666MHz.", "https://i.ibb.co/SJ5Whx6/memoriaram.jpg")

    productos.push(producto1,producto2,producto3,producto4) //agrego los productos al arreglo

    localStorage.setItem("productos", JSON.stringify(productos))// agrego el arreglo al localStorage
}

//Agregar Nuevos Productos 
let tabla = new UI()

document.getElementById('product-form')
    .addEventListener('submit', function(event){
        /* Obtengo los valores escritos en el formulario */    
        const nombre = document.getElementById('nombre').value
        const precio = document.getElementById('precio').value
        const descripcion = document.getElementById('descripcion').value
        const imagen = document.getElementById('imagen').value

        const producto = new Producto(uuidv4(),nombre,precio,descripcion,imagen) //Creo un objeto producto con los datos del formulario
        
        productos.push(producto) //agrego el producto al arreglo de productos
        
        console.log(productos)

        tabla.showProducts() //Actualiza la tabla

        const agregarProductosForm = document.getElementById("product-form");
        agregarProductosForm.reset()
        
        event.preventDefault() //hace que no se actualice la pagina al enviar el form
    });

// Funcion para generar un id unico

function uuidv4() {
    return crypto.randomUUID();
  }

//Cargo los productos
productosCargados();

//Traigo los productos del localStorage  
const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));

if (productosLocalStorage) {
    productos = productosLocalStorage;
    tabla.showProducts()
  }