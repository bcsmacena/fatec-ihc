const { Evento, Convocacao } = require('../models')
const Sequelize = require('sequelize')

const moment = require('moment')

const eventoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;

        try{
            const eventos = await Evento.findAll({ 
                where: { empresa_id: idLogado },
                include: 
                [{
                    model: Convocacao,
                    require: true
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