campoDataEvento = document.getElementById('date');

campoDataEvento.addEventListener('change', () => {

    date = new Date(campoDataEvento.value)
    today = new Date();
    if(date <= today){
        alert('Você não pode criar um evento com uma data anterior a atual');
        campoDataEvento.value = today.getFullYear() + "-" + (today.getMonth() < 9 ? ('0' + (today.getMonth() + 1)) : (today.getMonth() + 1)) +  "-" + (today.getDate() + 1)
        campoDataEvento.focus();
    }

})