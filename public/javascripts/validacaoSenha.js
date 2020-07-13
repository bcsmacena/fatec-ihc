const inputSenha = document.querySelector("#senha");
const inputConfirma = document.querySelector("#confirmaSenha");


inputConfirma.addEventListener("focusout", (e) => {
    const senha = inputSenha.value;
    const confirma = inputConfirma.value;

    if (senha != confirma){
        alert("Senhas diferentes");
    }
    else{
        // alert("Senhas iguais");
    }
})

