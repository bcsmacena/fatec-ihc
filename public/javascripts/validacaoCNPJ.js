const inputCnpj = document.querySelector("#cnpj");
const alertaCNPJ = document.getElementById("alertaCNPJ");

inputCnpj.addEventListener("keypress", (e) => {
  if(cnpj.value.length == 18 || e.keyCode < 48 || e.keyCode > 57 ){
      e.preventDefault();
      inputCnpj.focus();
      return;
  } 
   mascaraCNPJ(inputCnpj);
})

function mascaraCNPJ(campo) {
       campo.value = campo.value.replace(/^(\d{2})(\d)/, '$1.$2')
                      .replace(/^(\d{2}.\d{3})(\d)/, '$1.$2')
                      .replace(/^(\d{2}.\d{3}\.\d{3})(\d)/, '$1/$2')
                      .replace(/^(\d.*\/\d{4})(\d)/, '$1-$2')
}


inputCnpj.addEventListener("focusout", (e) => {
    const cnpj = inputCnpj.value;
    const validacnpj = validarCNPJ(cnpj)
    mascaraCNPJ(inputCnpj);
    
    if (!validacnpj){
        //alert("CNPJ Inválido.");
        addAlerta(inputCnpj)
        inputCnpj.focus();
    } else {
        removeAlerta(inputCnpj)
    }


    
})

function addAlerta(campo){
    campo.style.background = '#fff0f0'
    alertaCNPJ.innerText = "Inválido!"
    alertaCNPJ.style.color = '#dc3545'
}
function removeAlerta(campo){
    campo.style.background = '#ffffff'
    alertaCNPJ.innerText = ""
}




function validarCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g,'');
 
    if(cnpj == '') return true;
     
    if (cnpj.length != 14)
        return false;
 
    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" || 
        cnpj == "11111111111111" || 
        cnpj == "22222222222222" || 
        cnpj == "33333333333333" || 
        cnpj == "44444444444444" || 
        cnpj == "55555555555555" || 
        cnpj == "66666666666666" || 
        cnpj == "77777777777777" || 
        cnpj == "88888888888888" || 
        cnpj == "99999999999999")
        return false;
         
    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0,tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;
         
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
          return false;

    return true;
    
}