const { Evento, Contrato, Colaborador, Convocacao } = require('../models')
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const moment = require('moment');

const convocacaoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;
        const idEvento = req.params.id;

        try{
            const evento = await Evento.findByPk(idEvento);

            if(req.query.search && req.query.sexo) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                        [{
                                model: Colaborador,
                                required: true,
                                where: Sequelize.and({ nome: {[Op.like]: req.query.search + '%'}}, { sexo: req.query.sexo })
                        }]
                })
                const convocacao = await Convocacao.findAll({
                         where: { evento_id: idEvento}
                 })

                return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment})
            }
            else if(!req.query.search && req.query.sexo){
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                        [{
                                model: Colaborador,
                                required: true,
                                where: { sexo: req.query.sexo }
                        }]
                })
                const convocacao = await Convocacao.findAll({
                         where: { evento_id: idEvento}
                 })

                return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment})

            }
            else if(req.query.search && !req.query.sexo){
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                        [{
                                model: Colaborador,
                                required: true,
                                where: { nome: {[Op.like]: req.query.search + '%'} }
                        }]
                })
                const convocacao = await Convocacao.findAll({
                         where: { evento_id: idEvento}
                 })

                return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment})

            } else {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                        [{
                                model: Colaborador,
                                required: true,
                        }]
                })
                const convocacao = await Convocacao.findAll({
                         where: { evento_id: idEvento}
                 })

                return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment})

            }

        }
        catch(e){
            return res.send(e);
        }
    },
    store: async(req, res) => {
        const { eventoId, contratoId } = req.params;
        const idLogado = req.session.user.id;
        const date = new Date();

        try{
            const buscaConvocacao = await Convocacao.findOne({
                where: Sequelize.and({evento_id: eventoId },{contrato_id: contratoId })
            })

            if(buscaConvocacao){ 
                const eventos = await Evento.findAll({ 
                    where: { empresa_id: idLogado },
                    include: 
                    [{
                        model: Convocacao,
                        require: true
                    }]
                })
    
                return res.render('empresa/eventos', {eventos, moment, msg:'Colaborador já convocado'});
            }
            const convoca = await Convocacao.create({
                evento_id: eventoId,
                contrato_id: contratoId,
                dataConvocacao: date
            })
            const eventos = await Evento.findAll({ 
                where: { empresa_id: idLogado },
                include: 
                [{
                    model: Convocacao,
                    require: true
                }]
            })

            return res.render('empresa/eventos', {eventos, moment, msg:'Colaborador convocado com sucesso'});
        }
        catch(e){
            return res.send(e);
        }
    },
    aceita: async(req,res) => {
        const { id, eventoId } = req.params

        const date = new Date();
        
        try {
            const convocados = await Convocacao.findAll({ where: Sequelize.and({evento_id: eventoId},{dataAceitacao: {[Op.not]: null}})})
            
            console.log(convocados.length)

            if(convocados.length > 0){

                const evento = await Evento.findOne({ where: { id: eventoId }})

                if(convocados.length >= evento.qtdeProfissionais){
                    req.session.msg = "As vagas para esse evento já foram preenchidas!"
                    const convocacao = await Convocacao.update({ 
                        dataRecusa: date 
                    },{
                        where: Sequelize.and({dataAceitacao: null },{dataRecusa: null }, {evento_id: eventoId}),
                        
                    })
                    return res.redirect('/colaborador')
                }
                

            }
            const convocacao = await Convocacao.update({ 
                    dataAceitacao: date 
                },{
                    where: { id: id },
                    
            })
            
            return res.redirect('/colaborador')
        }
        catch(e){
            console.log(e);
            return res.send(e);
        }
    },
    recusa: async(req,res) => {
        const { id } = req.params

        const date = new Date();
        
        try {
            const convocacao = await Convocacao.update({ 
                dataRecusa: date 
            },{
                where: { id: id },
                
            })
            return res.redirect('/colaborador')
        }
        catch(e){
            console.log(e);
            return res.send(e);
        }
    }
}

module.exports = convocacaoController;