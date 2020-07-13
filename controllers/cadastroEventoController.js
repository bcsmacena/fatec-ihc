const { Evento } = require('../models')
const Sequelize = require('sequelize');

const cadastroEventoController = {
    index: async(req,res) => {
        const idLogado = req.session.user.id;
        return res.render('cadastro/evento', { idLogado });  
    },
    store: async(req,res) => {

        const { nome, qtdeProfissionais, cep, endereco, numero, complemento, bairro, cidade, estado, data, inicioJornada, terminoJornada, descricao, idLogado } = req.body
    
        try{
            const novoEvento = await Evento.create({
                empresa_id: idLogado,
                qtdeProfissionais,
                nome,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                data,
                inicioJornada,
                terminoJornada,
                descricao
            })
            return res.render('empresa', { msg: "Novo evento cadastrado com sucesso"});
        }
        catch(e){
            console.log(e);
            return res.send(e);
        }        
    },
}

module.exports = cadastroEventoController;