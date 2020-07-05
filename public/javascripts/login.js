const btnEntrar = document.getElementById('btn-entrar');
const login = document.getElementById('email');
const password = document.getElementById('password');
const msg = document.getElementById('mensagem');

btnEntrar.onclick = (e) => {
    if(!login.value || !password.value){
        e.preventDefault();
        msg.classList.remove('d-none');
    }
}