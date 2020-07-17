const { Evento, Contrato, Colaborador, Convocacao } = require('../models')
const Sequelize = require('sequelize')
const { Op } = require("sequelize");

const moment = require('moment');

const convocacaoController = {
    index: async (req, res) => {

        const idLogado = req.session.user.id;
        const idEvento = req.params.id;
        const msg = req.session.msg;

        req.session.msg = undefined;

        try{
            const evento = await Evento.findByPk(idEvento);

            // if(req.query.search && req.query.sexo) {
            //     const contratos = await Contrato.findAll({ 
            //         where: { empresa_id: idLogado },
            //         include:
            //             [{
            //                     model: Colaborador,
            //                     required: true,
            //                     where: Sequelize.and({ nome: {[Op.like]: req.query.search + '%'}}, { sexo: req.query.sexo })
            //             }]
            //     })
            //     const convocacao = await Convocacao.findAll({
            //              where: { evento_id: idEvento}
            //      })

            //     return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})
            // }
            // else if(!req.query.search && req.query.sexo){
            //     const contratos = await Contrato.findAll({ 
            //         where: { empresa_id: idLogado },
            //         include:
            //             [{
            //                     model: Colaborador,
            //                     required: true,
            //                     where: { sexo: req.query.sexo }
            //             }]
            //     })
            //     const convocacao = await Convocacao.findAll({
            //              where: { evento_id: idEvento}
            //      })

            //     return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})

            // }
            // else if(req.query.search && !req.query.sexo){
            //     const contratos = await Contrato.findAll({ 
            //         where: { empresa_id: idLogado },
            //         include:
            //             [{
            //                     model: Colaborador,
            //                     required: true,
            //                     where: { nome: {[Op.like]: req.query.search + '%'} }
            //             }]
            //     })
            //     const convocacao = await Convocacao.findAll({
            //              where: { evento_id: idEvento}
            //      })

            //     return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})

            // } else {
            //     const contratos = await Contrato.findAll({ 
            //         where: { empresa_id: idLogado },
            //         include:
            //             [{
            //                     model: Colaborador,
            //                     required: true,
            //             }]
            //     })
            //     const convocacao = await Convocacao.findAll({
            //              where: { evento_id: idEvento}
            //      })

            //     return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})

            // }


            if(req.query.search && req.query.sexo && req.query.funcao) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado,  funcao: req.query.funcao },
                    include:
                            [{
                                model: Colaborador,
                                // where:{ id: Sequelize.col('colaborador_id') },
                                required: true,
                                where: Sequelize.and({ nome: {[Op.like]: req.query.search + '%'}}, { sexo: req.query.sexo }),
                                // right: true
                            }],
                    })
                    
                const convocacao = await Convocacao.findAll({
                    where: { evento_id: idEvento}
                })
                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})

            }
            else if(req.query.search && !req.query.sexo && !req.query.funcao) {
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

                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})
            }
            else if(req.query.search && req.query.sexo && !req.query.funcao) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado },
                    include:
                            [{
                                model: Colaborador,
                                // where:{ id: Sequelize.col('colaborador_id') },
                                required: true,
                                where: Sequelize.and({ nome: {[Op.like]: req.query.search + '%'}}, { sexo: req.query.sexo }),
                                // right: true
                            }],
                    })

                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})
            }  
            else if(!req.query.search && req.query.sexo && !req.query.funcao) {
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

                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})
            }
             else if(!req.query.search && !req.query.sexo && req.query.funcao) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado, funcao: req.query.funcao },
                    include:
                            [{
                                model: Colaborador,
                                required: true,
                            }],
                    })

                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg}) 
            } else if(req.query.search && !req.query.sexo && req.query.funcao) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado, funcao: req.query.funcao },
                    include:
                            [{
                                model: Colaborador,
                                required: true,
                                where:  { nome: {[Op.like]: req.query.search + '%'} },
                            }],
                    })


                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg}) 
            }else if(!req.query.search && req.query.sexo && req.query.funcao) {
                const contratos = await Contrato.findAll({ 
                    where: { empresa_id: idLogado, funcao: req.query.funcao },
                    include:
                            [{
                                model: Colaborador,
                                required: true,
                                where: { sexo: req.query.sexo },
                            }],
                    })

                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg}) 
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

                    const convocacao = await Convocacao.findAll({
                        where: { evento_id: idEvento}
                    })

                    
                return res.render('empresa/convoca', { idLogado, evento, convocacao, contratos, moment, msg})
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
            // const buscaConvocacao = await Convocacao.findOne({
            //     where: Sequelize.and({evento_id: eventoId },{contrato_id: contratoId })
            // })

            // if(buscaConvocacao){ 
            //     const eventos = await Evento.findAll({ 
            //         where: { empresa_id: idLogado },
            //         include: 
            //         [{
            //             model: Convocacao,
            //             require: true
            //         }]
            //     })
    
            //     return res.render('empresa/eventos', {eventos, moment, msg:'Colaborador já convocado'});
            
            const convoca = await Convocacao.create({
                evento_id: eventoId,
                contrato_id: contratoId,
                dataConvocacao: date
            })
            // const eventos = await Evento.findAll({ 
            //     where: { empresa_id: idLogado },
            //     include: 
            //     [{
            //         model: Convocacao,
            //         require: true
            //     }]
            // })

            req.session.msg = 'Colaborador convocado com sucesso'

            return res.redirect('/convoca/evento/' + eventoId)
        }
        catch(e){
            return res.send(e);
        }
    },
    lote: async(req,res) => {

        const { eventoId } = req.params;
        const { checkbox } = req.body
        const idLogado = req.session.user.id;
        const date = new Date();

        console.log(checkbox);

        if(typeof checkbox != 'undefined' ){

            checkbox.forEach(async contratoId =>  {

            try{
                const convoca = await Convocacao.create({
                    evento_id: eventoId,
                    contrato_id: contratoId,
                    dataConvocacao: date
                })
                // console.log("convocou" + contratoId )
            }
            catch(e){
                console.log(e)
            }})

            req.session.msg = 'Colaboradores convocados com sucesso'
        } else {
            req.session.msg = undefined
        }

        try{

            const eventos = await Evento.findAll({ 
                where: { empresa_id: idLogado },
                include: 
                [{
                    model: Convocacao,
                    require: true
                }]
            })


            return res.redirect('/convoca/evento/' + eventoId)
            //return res.render('empresa/eventos', {eventos, moment, msg});
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
            
            

           // if(convocados.length > 0){

                const convocacao = await Convocacao.update({ 
                    dataAceitacao: date,
                    filaDeEspera: 0
                },{
                    where: { id: id },
                
                })

                const evento = await Evento.findOne({ where: { id: eventoId }})

                console.log('-------------------')
                console.log(convocados.length)
                console.log((convocados.length + 1) >= evento.qtdeProfissionais)
                console.log('-------------------')

                if((convocados.length + 1) >= evento.qtdeProfissionais){
                    //req.session.msg = "As vagas para esse evento já foram preenchidas!"
                    const convocacao = await Convocacao.update({ 
                        filaDeEspera: 1 
                    },{
                        where: Sequelize.and({dataAceitacao: null },{dataRecusa: null }, Sequelize.or({filaDeEspera: {[Op.ne]: 0 }},{filaDeEspera: {[Op.is]: null }}), {evento_id: eventoId}),
                        
                    })
                    console.log(convocacao)
                    return res.redirect('/colaborador/notificacoes')
                }
                

            //}

            
            return res.redirect('/colaborador/notificacoes')
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
            return res.redirect('/colaborador/notificacoes')
        }
        catch(e){
            console.log(e);
            return res.send(e);
        }
    },
    desiste: async(req,res) => {
        const { id } = req.params;
        
        const date = new Date();

        try {
            const convocacao = await Convocacao.update({ 
                dataRecusa: date 
            },{
                where: { id : id} ,
            })
            const limpaEspera = await Convocacao.update({ 
                filaDeEspera: null 
            },{
                where: { id : {[Op.ne]:id}} ,
            })
            return res.redirect("/colaborador/eventos")
        }
        catch(e){
            console.log(e);
            return res.send(e);
        }

    }
}

module.exports = convocacaoController;