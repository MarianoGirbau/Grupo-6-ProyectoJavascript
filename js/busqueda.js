const productos = JSON.parse(localStorage.getItem("productos"));

//Busqueda
function buscar(){
    const productosBuscados = document.getElementById("modal-busqueda")
    productosBuscados.innerHTML = ""
    var cadenaBusqueda = document.getElementById("busqueda").value;
    console.log(cadenaBusqueda)
    var productosFiltrados = productos.filter(function(producto) {
      var nombreProducto = producto.nombre.toLowerCase();
      console.log(nombreProducto)
      var cadenaBusquedaMinusculas = cadenaBusqueda.toLowerCase();
      console.log(cadenaBusquedaMinusculas)
      return nombreProducto.includes(cadenaBusquedaMinusculas);
    });
    console.log(productosFiltrados.length)
    if(cadenaBusqueda != "" && productosFiltrados.length > 0) {
        console.log(productosFiltrados.length)  
        productosFiltrados.forEach((producto)=>{
          const tarjetaHTML= `
          <div class="col-11 my-1 p-1">
              <div class="card mb-4" style="border: 5px solid #ccc; height:100%;">
                  <img src="${producto.imagen}" class="card-img-top" alt="Producto 1">
                  <div class="card-body d-flex flex-column" style="color: black !important;">
                      <h5 class="card-title mb-auto">${producto.nombre}</h5>
                      <p class="card-text d-none d-lg-block">${producto.descripcion}</p>
                      <p class="card-text font-weight-bold" style="color: rgb(226, 124, 0);">$${producto.precio}</p>
                      <div class="text-center container-fluid px-0">
                          <button class="btn bottom-0 btn-agregar agregarCarrito" data-id="${producto.id}">Comprar</button> 
                      </div>
                  </div>
              </div>
          </div>
          `;
          productosBuscados.innerHTML+=tarjetaHTML;
        })
    }else if(cadenaBusqueda === "" || productosFiltrados.length === 0){
        productosBuscados.innerHTML = `<p class="text-center">No se encontraron productos</p>`
    }
  }