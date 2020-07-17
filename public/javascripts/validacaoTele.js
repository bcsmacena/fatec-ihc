const inputTele = document.querySelector("#telefone");


inputTele.addEventListener("keypress", (e) => {
  if(telefone.value.length >= 15 || e.keyCode < 48 || e.keyCode > 57){
      e.preventDefault();
      inputTele.focus();
      return;
  }
})

function mascara( campo ) {
if (inputTele.value.length == 10) { 
        campo.value = campo.value.replace( /[^\d]/g, '' )
                                 .replace( /^(\d\d)(\d)/, '($1) $2' )
                                 .replace( /(\d{4})(\d)/, '$1-$2' );
         } else {
                 campo.value = campo.value.replace( /[^\d]/g, '' )
                                          .replace( /^(\d\d)(\d)/, '($1) $2' )
                                          .replace( /(\d{4})(\d)/, '$1-$2' );
    }
}