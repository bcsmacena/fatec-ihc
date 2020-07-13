const { Colaborador, Contrato, Convocacao, Evento, Empresa } = require('../models')
const Sequelize = require('sequelize');
const contratoController = require('./contratoController');
const convocacaoController = require('./convocacaoController');
const eventoController = require('./eventoController');

const moment = require('moment')

const colaboradorController = {
    index: async (req, res) => {

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
            return res.render('colaborador', {colaborador, moment, msg});
        }
        catch(e){
            console.log(e)
            return res.send(e);
        }       

    }
}

module.exports = colaboradorController