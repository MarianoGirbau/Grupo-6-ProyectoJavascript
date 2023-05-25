let productos = []; //arreglo de productos

class Producto {
  constructor(id, nombre, precio, descripcion, imagen) {
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.imagen = imagen;
  }
}

class UI {
  constructor() {
    this.editingProductId = null;
  }

  showProducts() {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.querySelector("tbody").innerHTML = "";
    productos.forEach((producto) => {
      const tr = document.createElement("tr");
      if (producto.id === this.editingProductId) {
        //Editar producto, pregunta si editingProductID es distinto de null
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
        tr.querySelector(".save").addEventListener("click", (event) => {
          const productId = event.target.dataset.id;
          const nombre = tr.querySelector("#nombreEdit").value;
          const precio = tr.querySelector("#precioEdit").value;
          const descripcion = tr.querySelector("#descripcionEdit").value;
          const producto = productos.find((p) => p.id === productId); //busca en el arreglo de productos uno con el mismo id
          if (producto) {
            producto.nombre = nombre;
            producto.precio = precio;
            producto.descripcion = descripcion;
            this.editingProductId = null;
            this.showProducts(); // Actualizar la tabla
          }
        });
        tr.querySelector(".cancel").addEventListener("click", () => {
          this.editingProductId = null;
          this.showProducts(); // Actualizar la tabla
        });
      } else {
        //Mostrar productos
        console.log(productos);
        tr.innerHTML = `
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td>${producto.descripcion}</td>
                    <td>
                        <button class="btn btn-primary edit" data-id="${producto.id}">Editar</button>
                        <button class="btn btn-danger delete" data-id="${producto.id}">Eliminar</button>
                    </td>
                    `;
        tr.querySelector(".edit").addEventListener("click", (event) => {
          this.editingProductId = event.target.dataset.id; //Guarda el id del producto a editar
          this.showProducts(); // Actualizar la tabla
        });

        //Eliminar producto
        tr.querySelector(".delete").addEventListener("click", (event) => {
          Swal.fire({
            title: "Seguro que desea borrar el producto?",
            
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar!",
            cancelButtonText: 'Cancelar ',
          }).then((result) => {
            if (result.isConfirmed) {
              const productId = event.target.dataset.id; //Guarda el id del producto a eliminar
              const index = productos.findIndex((p) => p.id === productId);
              if (index !== -1) {
                //se fija si encontro un producto con el id
                if (this.editingProductId === productId) {
                  this.editingproductId = null;
                }
                productos.splice(index, 1); //elimina el producto del arreglo
                this.showProducts(); // Actualizar la tabla
              }
              Swal.fire("Eliminado!", "", "success");
            }
          });
        });
      }
      listaProductos.querySelector("tbody").appendChild(tr);
    });

    // Guardar los productos en el local storage
    localStorage.setItem("productos", JSON.stringify(productos));
  }

  showMessage() {}
}

//Eventos DOM

//Agregar Nuevos Productos
let tabla = new UI();

if(window.location.pathname === "/html/administracion.html"){ //pregunta si está en la pagina de administracion
    document
      .getElementById("product-form")
      .addEventListener("submit", function (event) {
        /* Obtengo los valores escritos en el formulario */
        const nombre = document.getElementById("nombre").value;
        const precio = document.getElementById("precio").value;
        const descripcion = document.getElementById("descripcion").value;
        const imagen = document.getElementById("imagen").value;
    
        if (nombre != "" && precio != "" && descripcion != "" && imagen != "") {
          const producto = new Producto(
            uuidv4(),
            nombre,
            precio,
            descripcion,
            imagen
          ); //Creo un objeto producto con los datos del formulario
    
          productos.push(producto); //agrego el producto al arreglo de productos
    
          console.log(productos);
    
          tabla.showProducts(); //Actualiza la tabla
    
          const agregarProductosForm = document.getElementById("product-form");
          agregarProductosForm.reset();
    
          Swal.fire("Producto cargado correctamente!", "", "success");
        } else {
          Swal.fire({
            icon: "error",
            title: "Algo salió mal!",
          });
        }
    
        event.preventDefault(); //hace que no se actualice la pagina al enviar el form
      });
}

// Funcion para generar un id unico

function uuidv4() {
  return crypto.randomUUID();
}

//Traigo los productos del localStorage
const productosLocalStorage = JSON.parse(localStorage.getItem("productos"));

console.log(window.location.pathname)

if (productosLocalStorage) { //pregunta si hay productos en localStorage y si está en la pagina de administracion
  productos = productosLocalStorage;
  tabla.showProducts();
}
