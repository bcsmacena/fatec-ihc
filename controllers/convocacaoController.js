const { Evento, Contrato, Colaborador, Convocacao } = require('../models')
const Sequelize = require('sequelize')

const moment = require('moment');

const convocacaoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;
        const idEvento = req.params.id;

        try{
            const evento = await Evento.findByPk(idEvento);

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
        const { id } = req.params

        const date = new Date();
        
        try {
            const convocacao = Convocacao.update({ 
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
            const convocacao = Convocacao.update({ 
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