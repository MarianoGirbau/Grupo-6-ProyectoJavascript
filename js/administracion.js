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
    ShowProducts(){
        const listaProductos = document.getElementById('lista-productos')
        listaProductos.querySelector("tbody").innerHTML = "";
        productos.forEach((producto) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
            <td>${producto.descripcion}</td>
            <td>
            <button class="btn btn-primary edit" data-id="${producto.id}">Editar</button>
            <button class="btn btn-danger delete" data-id="${producto.id}">Eliminar</button>
            </td>
            `;
            listaProductos.querySelector("tbody").appendChild(tr);
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

//Agregar Productos
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

    tabla.ShowProducts() //Actualiza la tabla

    const agregarProductosForm = document.getElementById("product-form");
    agregarProductosForm.reset()
    
    event.preventDefault() //hace que no se actualice la pagina al enviar el form
    });

// Funcion para generar un id unico

function uuidv4() {
    return crypto.randomUUID();
  }

// let producto = new Producto (00,"perro",340,"sexo","www.com")

// productos.push(producto)
const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));

if (productosLocalStorage) {
    productos = productosLocalStorage;
    tabla.ShowProducts()
  }
