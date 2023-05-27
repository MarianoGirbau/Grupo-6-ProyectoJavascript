let usuarios = []; 

class Usuario {
    constructor(id,nombre,email,contraseña,admin) {
        this.id = id
        this.nombre = nombre
        this.email = email
        this.contraseña = contraseña
        this.admin = admin
    }
}

class UI {
    constructor() {
      this.editingUserId = null;
    }
  
    showProducts() {
      const listaUsuarios = document.getElementById('lista-usuarios');
      listaUsuarios.querySelector('tbody').innerHTML = '';
      usuarios.forEach((Usuario) => {
        const tr = document.createElement('tr');
        if (Usuario.id === this.editingUserId) {
          tr.innerHTML = `
            <td>
              <input type="text" id="nombreEdit" placeholder="Nombre del usuario" class="form-control" value="${Usuario.nombre}" required>
            </td>
            <td>
              <input type="text" id="emailEdit" placeholder="ejemplo@mail.com" class="form-control" value="${Usuario.email}">
            </td>
            <td>
              <input type="password" id="contraseñaEdit" placeholder="contraseña" class="form-control" value="${Usuario.contraseña}">
            </td>
            <td>
              ${Usuario.admin}
            </td>
            <td>
              <button class="btn btn-primary save" data-id="${Usuario.id}">Guardar</button>
              <button class="btn btn-secondary cancel">Cancelar</button>
            </td>
          `;
          tr.querySelector('.save').addEventListener('click', (event) => {
            const userId = event.target.dataset.id;
            const nombre = tr.querySelector('#nombreEdit').value;
            const email = tr.querySelector('#emailEdit').value;
            const contraseña = tr.querySelector('#contraseñaEdit').value;
            const usuario = usuarios.find((u) => u.id === userId);
            if (usuario) {
              usuario.nombre = nombre;
              usuario.email = email;
              usuario.contraseña = contraseña;
              this.editingUserId = null;
              this.showProducts(); // Actualizar la tabla
            }
          });
          tr.querySelector('.cancel').addEventListener('click', () => {
            this.editingUserId = null;
            this.showProducts(); // Actualizar la tabla
          });
        } else {
          tr.innerHTML = `
            <td>${Usuario.nombre}</td>
            <td>${Usuario.email}</td>
            <td>${Usuario.contraseña}</td>
            <td>${Usuario.admin}</td>
            <td>
              <button class="btn btn-primary edit" data-id="${Usuario.id}">Editar</button>
              <button class="btn btn-danger delete" data-id="${Usuario.id}">Eliminar</button>
            </td>
          `;
          tr.querySelector('.edit').addEventListener('click', (event) => {
            this.editingUserId = event.target.dataset.id;
            this.showProducts(); // Actualizar la tabla
          });

          //Eliminar producto
          tr.querySelector('.delete').addEventListener('click', (event) => {

            Swal.fire({ //alerta de borrado
              title: "Seguro que desea eliminar éste usuario?",
              
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Si, eliminar!",
              cancelButtonText: 'Cancelar ',
            }).then((result) => {
              if (result.isConfirmed) {
                const userId = event.target.dataset.id; //Guarda el id del usuario a eliminar
                const index = usuarios.findIndex((u) => u.id === userId);
                if (index !== -1) {
                  //se fija si encontro un producto con el id
                  if (this.editingUserId === userId) {
                    this.editingUserId = null;
                  }
                  usuarios.splice(index, 1); //elimina el producto del arreglo
                  this.showProducts(); // Actualizar la tabla
                }
                Swal.fire("Eliminado!", "", "success");
              }
            });
          });
        }
        listaUsuarios.querySelector('tbody').appendChild(tr);
      });
  
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
}

let tabla = new UI()

//Agregar nuevos usuarios
document.getElementById('user-form')
    .addEventListener('submit', function(event){
      
    const nombre = document.getElementById('nombre').value
    const email = document.getElementById('email').value
    const contraseña = document.getElementById('contraseña').value
    let admin = document.getElementById('admin').checked  //se fija si el checkbox está activo

    if (nombre != "" && email != "" && contraseña != "") {
    const usuario = new Usuario(uuidv4(),nombre,email,contraseña,admin) 
    
    usuarios.push(usuario) //agrego usuario al arreglo de usuarios
    
    console.log(usuarios)

    tabla.showProducts() //Actualiza la tabla


    const agregarUsuariosForm = document.getElementById("user-form");
    agregarUsuariosForm.reset()

    Swal.fire("Usuario cargado correctamente!", "", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
      });
    }

    event.preventDefault() 
    });



function uuidv4() {
    return crypto.randomUUID();
  }


const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios"));

if (usuariosLocalStorage) {
    usuarios = usuariosLocalStorage;
    tabla.showProducts()
  }



 