const { Evento, Convocacao, Contrato, Colaborador } = require('../models')
const Sequelize = require('sequelize')

const moment = require('moment');
const { ExclusionConstraintError } = require('sequelize');

const eventoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;

        try{
            const eventos = await Evento.findAll({ 
                where: { empresa_id: idLogado },
                include: 
                [{
                    model: Convocacao,
                    require: true,
                    include: [{
                        model: Contrato,
                        require: true,
                        include: [{
                            model: Colaborador,
                            require: true
                        }]
                    }]
                }]
            })

            return res.render('empresa/eventos', {eventos, moment});
        }
        catch(e){
            return res.render(e);
        }
    }
}

module.exports = eventoController