const inputCpf = document.querySelector("#cpf");
const alertaCPF = document.getElementById("alertaCPF");

inputCpf.addEventListener("keypress", (e) => {
  if(cpf.value.length >= 13 || e.keyCode < 48 || e.keyCode > 57 ){
      e.preventDefault();
      inputCpf.focus();
      return;
  }
  mascaraCPF(inputCpf)
})


function mascaraCPF(campo) {
       campo.value = campo.value.replace(/^(\d{3})(\d)/, '$1.$2')
                                .replace(/^(\d{3}\.\d{3})(\d)/, '$1.$2')
                                .replace(/^(\d{3}\.\d{3}\.\d{3})(\d)/, '$1-$2')
}


inputCpf.addEventListener("focusout", (e) => {
    const cpf = inputCpf.value;
    const validacpf = TestaCPF(cpf)
    mascaraCPF(inputCpf);
    inputCpf.style.background = '#ffffff'
    alertaCPF.innerText = ""

    if (!validacpf){
        // alert("CPF Inválido.");
        inputCpf.style.background = '#fff0f0'
        alertaCPF.innerText = "Inválido!"
        alertaCPF.style.color = '#dc3545'
        inputCpf.focus();
       
    }
})

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    strCPF = strCPF.replace(/[^\d]+/g,'');
    console.log(strCPF)

    // Elimina CPFs invalidos conhecidos
    if (strCPF == "00000000000" || 
        strCPF == "11111111111" || 
        strCPF == "22222222222" || 
        strCPF == "33333333333" || 
        strCPF == "44444444444" || 
        strCPF == "55555555555" || 
        strCPF == "66666666666" || 
        strCPF == "77777777777" || 
        strCPF == "88888888888" || 
        strCPF == "99999999999")
        return false;
     
  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
   
  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;
   
    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true;
}