//Control de sesion
const sesion = JSON.parse(localStorage.getItem('sesion')) || false
if(!sesion){
    document.getElementById("boton-adm").style = "display: none;"
    document.getElementById("boton-usu").style = "display: none;"
    document.getElementById("boton-login").style = "display: block;"
    document.getElementById("boton-logout").style = "display: none;"
}else if (sesion.admin) {
    document.getElementById("boton-adm").style = "display: block;"
    document.getElementById("boton-usu").style = "display: block;"
    document.getElementById("boton-login").style = "display: none;"
    document.getElementById("boton-logout").style = "display: block;"
}else if (!sesion.admin) {
    document.getElementById("boton-adm").style = "display: none;"
    document.getElementById("boton-usu").style = "display: none;"
    document.getElementById("boton-login").style = "display: none;"
    document.getElementById("boton-logout").style = "display: block;"
}

//Logueo

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    const email = document.querySelector('#email').value
    const contraseña = document.querySelector('#contraseña').value
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.contraseña === contraseña)

    if(!usuarioValido){   
        //loginForm.reset();     
        Swal.fire({
            icon: 'error',
            title: 'Usuario y/o contraseña incorrectos!',
            confirmButtonColor: '#C10001',
            background: '#31302F',
            color: 'white'           
          })            
    }else if(usuarioValido.admin){ //ver si el usuario es admin                 
        localStorage.setItem('sesion', JSON.stringify(usuarioValido)) //guardo la sesion en el LS
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido ${usuarioValido.nombre}`,
            showConfirmButton: false
            })
        setTimeout(function(){
            document.getElementById("boton-adm").style = "display: block;"
            document.getElementById("boton-usu").style = "display: block;"
            document.getElementById("boton-login").style = "display: none;"
            document.getElementById("boton-logout").style = "display: block;"
            location.reload();
        }, 1000);           
    }else if (!usuarioValido.admin){        
        localStorage.setItem('sesion', JSON.stringify(usuarioValido)) //guardo la sesion en el LS  
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido ${usuarioValido.nombre}`,
            showConfirmButton: false
            })
        setTimeout(function(){
            document.getElementById("boton-adm").style = "display: none;"
            document.getElementById("boton-usu").style = "display: none;"
            document.getElementById("boton-login").style = "display: none;"
            document.getElementById("boton-logout").style = "display: block;"
            location.reload();
        }, 1000);           
    }
});

function logout() {
    Swal.fire({
        icon: 'warning',
        title: 'Cerrar Sesión?',
        showCancelButton: true,
        confirmButtonText: 'Aceptar', 
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#C10001',
        cancelButtonColor: '#9A9693',
        background: '#31302F',
        color: 'white',
        backdrop: `rgba(0,0,14,0.4)` 
      }).then((result) => {        
        if (result.isConfirmed) {
            localStorage.removeItem('sesion')
            location.reload();
        } else if (result.isDenied) {
          return
        }
      })
}