const { Contrato, Empresa, Colaborador } = require('../models')
const Sequelize = require('sequelize')

const contratoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;

        try{
            const contratos = await Contrato.findAll({ 
                where: { empresa_id: idLogado },
                include:
                        [{
                            model: Colaborador,
                            // where:{ id: Sequelize.col('colaborador_id') },
                            required: true,
                            // right: true
                        }],
                })

            return res.render('empresa/colaboradores', { contratos });
        }
        catch(e){
            return res.render(e);
        }
    }
}

module.exports = contratoController