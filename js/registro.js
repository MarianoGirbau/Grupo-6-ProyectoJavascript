import { Usuario } from "./usuarios.js";
//Traigo los usuarios del localStorage
const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios"));
let usuarios = [];

if (usuariosLocalStorage) { //pregunta si hay usuarios en el localStorage
    usuarios = usuariosLocalStorage;
  }

document.getElementById('reg-form')
    .addEventListener('submit', function(event){
      
    const nombre = document.getElementById('nombreReg').value
    const email = document.getElementById('emailReg').value
    const contraseña = document.getElementById('contraseñaReg').value
    let admin = false

    if (nombre != "" && email != "" && contraseña != "") {
    const usuario = new Usuario(uuidv4(),nombre,email,contraseña,admin) 
    
    usuarios.push(usuario) //agrego usuario al arreglo de usuarios
    
    console.log(usuarios)

    const registroUsuariosForm = document.getElementById("reg-form");
    registroUsuariosForm.reset()

    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    window.location.href = '../index.html';
    Swal.fire("Usuario cargado correctamente!", "", "success");
    } else {
      Swal.fire({
        icon: "error",
        title: "Algo salió mal!",
      });
    }

    event.preventDefault() //hace que no se actualice la pagina al enviar el form
    });


// Funcion para generar un id unico
function uuidv4() {
  return crypto.randomUUID();
}