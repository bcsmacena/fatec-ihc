const { Contrato, Empresa, Colaborador } = require('../models')
const Sequelize = require('sequelize')
const { Op } = require('sequelize');

const moment = require('moment');

const contratoController = {
    index: async (req, res) => {

        console.log("Seach query")
        console.log(req.query)
        
        const idLogado = req.session.user.id;

        try{

            if(req.query.search && req.query.sexo) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                            [{
                                model: Colaborador,
                                // where:{ id: Sequelize.col('colaborador_id') },
                                required: true,
                                where: Sequelize.and({ nome: {[Op.like]: req.query.search + '%'}}, { sexo: req.query.sexo })
                                // right: true
                            }],
                    })
                    return res.render('empresa/colaboradores', { contratos });
            }  
            else if(!req.query.search && req.query.sexo) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                            [{
                                model: Colaborador,
                                // where:{ id: Sequelize.col('colaborador_id') },
                                required: true,
                                where: { sexo: req.query.sexo }
                                // right: true
                            }],
                    })
                    return res.render('empresa/colaboradores', { contratos, moment });
            }
            else if(req.query.search && !req.query.sexo) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                            [{
                                model: Colaborador,
                                // where:{ id: Sequelize.col('colaborador_id') },
                                required: true,
                                where: { nome: {[Op.like]: req.query.search + '%'} }
                                // right: true
                            }],
                    })
                    return res.render('empresa/colaboradores', { contratos, moment });
            }
            else {
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
                return res.render('empresa/colaboradores', { contratos, moment });
            }
            
        }
        catch(e){
            return res.render(e);
        }
    }
}

module.exports = contratoController