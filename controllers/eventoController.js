const { Evento } = require('../models')
const Sequelize = require('sequelize')

const eventoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;

        try{
            const eventos = await Evento.findAll({ 
                where: { empresa_id: idLogado },
                // include:
                //         [{
                //             model: Empresa,
                //             required: true,
                //         }],
                })

            return res.render('empresa/eventos', {eventos});
        }
        catch(e){
            return res.render(e);
        }
    }
}

module.exports = eventoController