const btnPesquisarCEP = document.querySelector("#btnPesquisar");
const inputCep = document.querySelector("#cep");
const numero = document.getElementById('numero');

inputCep.addEventListener("keypress", (e) => {
  if(inputCep.value.length >= 8 || e.keyCode < 48 || e.keyCode > 57 ){
      e.preventDefault();
  }
})

numero.addEventListener("keypress", (e) => {
  if(numero.value.length >= 8 || e.keyCode < 48 || e.keyCode > 57 ){
      e.preventDefault();
  }
})

// inputCep.addEventListener("focusout", (e) => {
//   preencheCep();
// })


btnPesquisarCEP.addEventListener("click", event =>{
  event.preventDefault();
  preencheCep();
})

function preencheCep(){

  const inputDoCep = document.querySelector("#cep");
  const valorDoCep = inputDoCep.value;
  const url = `https://viacep.com.br/ws/${valorDoCep}/json/`;
  fetch(url).then(response =>{
    return response.json();
      }).then(data =>
    {
    if(data.erro)
    {
    alert("O CEP DIGITADO ESTÁ INVÁLIDO");
    inputCep.value = "";
    inputCep.focus();
    limpaCampos(data);
    return ;
    }
    atribuirCampos(data);
   })

  function atribuirCampos(data){
        
    const bairro = document.querySelector("#bairro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");
    const endereco = document.querySelector("#endereco");
    
    bairro.value = data.bairro;
    cidade.value = data.localidade;
    estado.value = data.uf;
    endereco.value = data.logradouro;
        
  }

  function limpaCampos(data){
        
    const bairro = document.querySelector("#bairro");
    const cidade = document.querySelector("#cidade");
    const estado = document.querySelector("#estado");
    const endereco = document.querySelector("#endereco");
    
    bairro.value = "";
    cidade.value = "";
    estado.value = "";
    endereco.value = "";
        
  }

}