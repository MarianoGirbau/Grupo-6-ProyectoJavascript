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
    this.editingData = {}; // Agregamos un objeto para almacenar los datos editados temporalmente
  }

  showProducts() {
    const listaUsuarios = document.getElementById('lista-usuarios');
    listaUsuarios.querySelector('tbody').innerHTML = '';
    usuarios.forEach((Usuario) => {
      const tr = document.createElement('tr');
      if (Usuario.id === this.editingUserId) {
        const nombreActual = this.editingData.nombre || Usuario.nombre;
        const emailActual = this.editingData.email || Usuario.email;
        const contraseñaActual = this.editingData.contraseña || Usuario.contraseña;

        tr.innerHTML = `
          <td>
            <input type="text" id="nombre-${Usuario.id}" class="form-control" value="${nombreActual}">
          </td>
          <td>
            <input type="text" id="email-${Usuario.id}" class="form-control" value="${emailActual}">
          </td>
          <td>
            <input type="password" id="contraseña-${Usuario.id}" class="form-control" value="****">
          </td>
          <td>
            <button class="btn btn-primary save" data-id="${Usuario.id}">Guardar</button>
            <button class="btn btn-secondary cancel" data-id="${Usuario.id}">Cancelar</button>
          </td>
        `;
        
        tr.querySelector('.save').addEventListener('click', (event) => {
          const userId = event.target.dataset.id;
          const nombre = document.getElementById(`nombre-${userId}`).value;
          const email = document.getElementById(`email-${userId}`).value;
          const contraseña = document.getElementById(`contraseña-${userId}`).value;
          const usuario = usuarios.find((u) => u.id === userId);
          if (usuario) {
            usuario.nombre = nombre;
            usuario.email = email;
            usuario.contraseña = contraseña;
            this.editingUserId = null;
            this.editingData = {}; // Restablecemos los datos editados temporalmente
            this.showProducts(); // Actualizar la tabla
            Swal.fire('Cambios guardados', '', 'success'); // Mostramos el mensaje de "Cambios guardados"
          }
        });

        tr.querySelector('.cancel').addEventListener('click', (event) => {
          const userId = event.target.dataset.id;
          const usuario = usuarios.find((u) => u.id === userId);
          if (usuario) {
            if (this.editingUserId === userId) {
              this.editingUserId = null;
              this.editingData = {}; // Restablecemos los datos editados temporalmente
            }
            this.showProducts(); // Actualizar la tabla
          }
        });
      } else {
        tr.innerHTML = `
          <td>${Usuario.nombre}</td>
          <td>${Usuario.email}</td>
          <td>${Usuario.contraseña}</td>
          <td>
            <button class="btn btn-primary edit" data-id="${Usuario.id}">Editar</button>
            <button class="btn btn-danger delete" data-id="${Usuario.id}">Eliminar</button>
          </td>
        `;
        
        tr.querySelector('.edit').addEventListener('click', (event) => {
          this.editingUserId = event.target.dataset.id;
          this.editingData = {}; // Restablecemos los datos editados temporalmente
          this.showProducts(); // Actualizar la tabla
        });

        tr.querySelector('.delete').addEventListener('click', (event) => {
          const userId = event.target.dataset.id;
          Swal.fire({
            title: 'Seguro que desea borrar el usuario?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
          }).then((result) => {
            if (result.isConfirmed) {
              const index = usuarios.findIndex((u) => u.id === userId);
              if (index !== -1) {
                if (this.editingUserId === userId) {
                  this.editingUserId = null;
                  this.editingData = {}; // Restablecemos los datos editados temporalmente
                }
                usuarios.splice(index, 1);
                this.showProducts(); // Actualizar la tabla
              }
              Swal.fire(
                'Eliminado!',
                '',
                'success'
              );
            }
          });
        });
      }
      listaUsuarios.querySelector('tbody').appendChild(tr);
    });

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

    deleteProduct(){

    }

    showMessage(){

    }
}


let tabla = new UI()

document.getElementById('user-form')
    .addEventListener('submit', function(event){
        
      
    const nombre = document.getElementById('nombre').value
    const email = document.getElementById('email').value
    const contraseña = document.getElementById('contraseña').value

    if (nombre != "" && email != "" && contraseña != "") {
      const usuario = new Usuario(
        uuidv4(),
        nombre,
        email,
        contraseña,

      ); //Creo un objeto producto con los datos del formulario

      usuarios.push(usuario); //agrego el producto al arreglo de productos

      console.log(usuarios);

      tabla.showProducts(); //Actualiza la tabla

      const agregarUsuariosForm = document.getElementById("user-form");

      agregarUsuariosForm.reset();

      Swal.fire("Usuario cargado correctamente!", "", "success");
    }else {
      
      Swal.fire({
        icon: 'error',
        title: 'Algo salió mal!',
      })
    }

    event.preventDefault(); //hace que no se actualice la pagina al enviar el form
  });



function uuidv4() {
    return crypto.randomUUID();
  }


const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios"));

if (usuariosLocalStorage) {
    usuarios = usuariosLocalStorage;
    tabla.showProducts()
  }



 