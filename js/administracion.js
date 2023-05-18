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
    }

    deleteProduct(){

    }

    showMessage(){

    }
}

//Eventos DOM

//Agregar Productos

document.getElementById('product-form')
    .addEventListener('submit', function(event){
    const nombre = document.getElementById('nombre').value
    const precio = document.getElementById('precio').value
    const descripcion = document.getElementById('descripcion').value
    const imagen = document.getElementById('imagen').value

    const producto = new Producto(uuidv4(),nombre,precio,descripcion,imagen)
    console.log(producto)
    
    event.preventDefault() //hace que no se actualice la pagina al enviar el form
    });

// Funcion para generar un id unico

function uuidv4() {
    return crypto.randomUUID();
  }