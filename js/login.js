const loginForm = document.querySelector('#loginForm');

// loginForm.addEventListener('submit', (e)=>{
    const login = () => {
    //e.preventDefault()
    //const email = document.querySelector('#email').value
    //const contraseña = document.querySelector('#contraseña').value
    //const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []

    //const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.contraseña === contraseña)

    //const admin = false
    //const usuarioValido = {admin}//para probar
    const usuarioValido = false //para probar

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
        localStorage.setItem('login_exitoso', JSON.stringify(usuarioValido))
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido ${usuarioValido.name}`,
            showConfirmButton: false
            })
        setTimeout(function(){
            document.getElementById("boton-adm").style = "display: block;"
            document.getElementById("boton-usu").style = "display: block;"
        }, 1000);           
    }else if (!usuarioValido.admin){        
        localStorage.setItem('login_exitoso', JSON.stringify(usuarioValido))    
        Swal.fire({
            position: 'top',
            icon: 'success',
            title: `Bienvenido ${usuarioValido.name}`,
            showConfirmButton: false
            })
        setTimeout(function(){
            document.getElementById("boton-adm").style = "display: none;"
        }, 1000);             
    }
};