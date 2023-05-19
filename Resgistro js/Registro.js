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
              <input type="text" id="nombre" class="form-control" value="${Usuario.nombre}" required>
            </td>
            <td>
              <input type="text" id="email" class="form-control" value="${Usuario.email}">
            </td>
            <td>
              <input type="password" id="contraseña" class="form-control" value="****">
            </td>
            <td>
              <button class="btn btn-primary save" data-id="${Usuario.id}">Guardar</button>
              <button class="btn btn-secondary cancel">Cancelar</button>
            </td>
          `;
          tr.querySelector('.save').addEventListener('click', (event) => {
            const userId = event.target.dataset.id;
            const nombre = tr.querySelector('#nombre').value;
            const email = tr.querySelector('#email').value;
            const contraseña = tr.querySelector('#contraseña').value;
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
            <td>
              <button class="btn btn-primary edit" data-id="${Usuario.id}">Editar</button>
              <button class="btn btn-danger delete" data-id="${Usuario.id}">Eliminar</button>
            </td>
          `;
          tr.querySelector('.edit').addEventListener('click', (event) => {
            this.editingUserId = event.target.dataset.id;
            this.showProducts(); // Actualizar la tabla
          });
          tr.querySelector('.delete').addEventListener('click', (event) => {
            const userId = event.target.dataset.id;
            const index = usuarios.findIndex((u) => u.id === userId);
            if (index !== -1) {
              if (this.editingUserId === userId) {
                this.editingUserId = null;
              }
              usuarios.splice(index, 1);
              this.showProducts(); // Actualizar la tabla
            }
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


    const usuario = new Usuario(uuidv4(),nombre,email,contraseña,false) 
    
    usuarios.push(usuario) 
    
    console.log(usuarios)

    tabla.showProducts() 


    const agregarUsuariosForm = document.getElementById("user-form");
    agregarUsuariosForm.reset()
    
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



 