//verificacion
function check(){
    var storedName = localStorage.getItem('name');
    var storedPw = localStorage.getItem('pw');

    var userName = document.getElementById('userName');
    var userPw = document.getElementById('userPw');
    var userRemember = document.getElementById("rememberMe");

    if(userName.value == storedName && userPw.value == storedPw){
        alert('Estas conectado.');
    }else{
        alert('Error en el inicio de sesion');
    }
}

function store(){

    var name = document.getElementById('name');
    var pw = document.getElementById('pw');
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;

    if(name.value.length == 0){
        alert('Por favor, introduce un email');

    }else if(pw.value.length == 0){
        alert('Por favor, introduce una contraseña');

    }else if(name.value.length == 0 && pw.value.length == 0){
        alert('Por favor, introduce una contraseña y un email');

    }}