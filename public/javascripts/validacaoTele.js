const inputTele = document.querySelector("#telefone");

inputTele.addEventListener("keypress", (e) => {
  if(telefone.value.length >= 11|| e.keyCode < 48 || e.keyCode > 57){
      e.preventDefault();
      inputTele.focus();
      return;
  }
})

inputTele.addEventListener("focusout", (e) => {
    const telefone = inputTele.value;
    const validaTele = validatePhone(telefone)

if (!validaTele){
    alert("Insira telefone válido.");

    }
})

function validatePhone (phone) {
    var regex = new RegExp('^((1[1-9])|([2-9][0-9]))((3[0-9]{3}[0-9]{4})|(9[0-9]{3}[0-9]{5}))$'); 
    return regex.test(phone);
}