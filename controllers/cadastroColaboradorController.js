const { Colaborador } = require("../models");
const bcrypt = require("bcrypt");

const cadastroColaboradorController = {
    index: async(req,res) => {
        res.render('cadastro/colaborador');
    },
    store: async(req,res) => {
        const { cpf, nome, dataNascimento, sexo, cep, endereco, complemento, bairro, cidade, estado, telefone, email, senha } = req.body

        try{
            const colaborador = await Colaborador.create({
                cpf,
                nome,
                dataNascimento,
                sexo,
                cep,
                endereco,
                complemento,
                bairro,
                cidade,
                estado,
                telefone,
                email,
                senha
            })
            res.send(colaborador);
        }
        catch(e){
            res.send(e);
        }
    },
}

module.exports = cadastroColaboradorController;