import { Usuario } from "./usuarios.js";
const usuariosLocalStorage = JSON.parse(localStorage.getItem("usuarios"));
let usuarios = []; //arreglo usuarios

function usuariosCargados() {
    if (!usuariosLocalStorage) {
        
      let admin = new Usuario(
        uuidv4(),
        "admin",
        "admin@admin.com",
        "admin",
        true
      );

      let guest = new Usuario(
        uuidv4(),
        "guest",
        "guest@guest.com",
        "guest",
        false
      );
        
      usuarios.push(admin,guest); //agrego el admin al arreglo
      console.log(usuarios)
      localStorage.setItem("usuarios", JSON.stringify(usuarios)); // agrego el arreglo al localStorage
    }
  }

function uuidv4() {
    return crypto.randomUUID();
}
  
//Genero el usuario admin
usuariosCargados()