const { Colaborador, Contrato, Convocacao, Evento, Empresa } = require('../models')
const Sequelize = require('sequelize');
const { Op } = require('sequelize')
const moment = require('moment')

const colaboradorController = {
    index: async(req, res) => {
        res.render('colaborador');  
    },

    notificacoes: async (req, res) => {

        const idLogado = req.session.user.id;
        const msg = req.session.msg;
        req.session.msg = "";
        
        try{
            const colaborador = await Colaborador.findByPk(idLogado,{ 
            include: 
            [{
                model: Contrato,
                require: true,
                include: [{
                    model: Convocacao,
                    require: true,
                    include: [{
                        model: Evento,
                        require: true,
                        include: [{
                            model: Empresa,
                            require: true
                        }]
                    }]
                }]
            }]}    
                
            );
            return res.render('colaboradorNotificacoes', {colaborador, moment, msg});
        }
        catch(e){
            console.log(e)
            return res.send(e);
        }       

    },

    contratos: async (req, res) => {

        const idLogado = req.session.user.id;

        try{
            const colaborador = await Colaborador.findByPk(idLogado,{ 
            include: 
            [{
                model: Contrato,
                require: true,
                include: [{
                    model: Empresa,
                    require: true,
                }]
            }]
        })
            
            return res.render('colaboradorContratos', { colaborador })

        } 
        catch(e){
            console.log(e)
            return res.send(e);
        }  
    },

    eventos: async(req,res) => {
        const { id } = req.session.user

        try{
            const colaborador = await Colaborador.findByPk(id, {
                include: [{
                    model: Contrato,
                    require: true,
                    include: [{
                        model: Convocacao,
                        require: true,
                        where: {dataAceitacao: {[Op.not]: null}},
                        include: [{
                            model: Evento,
                            require: true
                        }]
                    }]
                }]
            })
            return res.render('colaboradorEventos', { colaborador, moment })
        }
        catch(e){
            return res.send(e);
        }
       
    }
}

module.exports = colaboradorController