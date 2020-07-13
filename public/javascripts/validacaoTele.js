const inputTele = document.querySelector("#telefone");

inputTele.addEventListener("keypress", (e) => {
  if(telefone.value.length >= 15){
      e.preventDefault();
      inputTele.focus();
      return;
  }
})

inputTele.addEventListener("focusout", (e) => {
    const telefone = inputTele.value;
    const validaTele = validatePhone(telefone)

if (!validaTele){
    alert("Insira um telefone válido.");

    }
})

function validatePhone (telefone) {
    var regex = new RegExp(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/g); 
    return regex.test(telefone);
}