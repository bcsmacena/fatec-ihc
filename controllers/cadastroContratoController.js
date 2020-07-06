const { Colaborador, Empresa, Contrato } = require('../models')
const Sequelize = require('sequelize');

const cadastroContratoController = {
    index: async(req,res) => {
        const idLogado = req.session.user.id;
        try
        {
            const colaboradores = await Colaborador.findAll();
            return res.render('cadastro/contrato', { colaboradores, idLogado });
        }
        catch(e)
        {   
            console.log(e);
            return res.send(e)
        }        
    },
    store: async(req,res) => {

        const { cpf, nome, telefone, email, funcao, inicioJornada, terminoJornada, valorHora, descricao, idLogado } = req.body
    
        try{
            const colaborador = await Colaborador.findOne({ where: { cpf: cpf}});

            const colaboradores = await Colaborador.findAll();

            const buscaContrato = await Contrato.findOne({ where: Sequelize.and({colaborador_id: colaborador.id },{empresa_id: idLogado } )})

            if(buscaContrato) {
                return res.render('cadastro/contrato', { msg: "CPF já possui contrato", colaboradores, idLogado})
            }

            if(colaborador){
                const novoContrato = await Contrato.create({
                    empresa_id: idLogado,
                    colaborador_id: colaborador.id,
                    nome: colaborador.nome,
                    telefone: colaborador.telefone,
                    email: colaborador.email,
                    funcao,
                    inicioJornada,
                    terminoJornada,
                    valorHora,
                    descricao
                })
                // console.log(novoContrato)
                return res.render('empresa', { msg: "Novo contrato cadastrado com sucesso"});
            } else {
                const idLogado = req.session.user.id;
                const colaboradores = await Colaborador.findAll();
                return res.render('cadastro/contrato', { msg: "CPF inválido ou ainda não foi cadastrado no sistema", colaboradores, idLogado})
            }
        }
        catch(e){
            console.log(e);
            return res.send(e);
        }        
    },
}

module.exports = cadastroContratoController;