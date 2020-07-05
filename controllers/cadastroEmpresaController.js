const { Empresa } = require("../models");
const bcrypt = require("bcrypt");

const cadastroEmpresaController = {
    index: async(req,res) => {
        res.render('cadastro/empresa');
    },
    store: async(req,res) => {
        const { cnpj, razaoSocial, nomeFantasia, atuacao, cep, endereco, complemento, bairro, cidade, estado, telefone, responsavel, email, senha } = req.body

        try{
            const empresa = await Empresa.create({
                cnpj,
                razaoSocial,
                nomeFantasia,
                atuacao,
                cep,
                endereco,
                complemento,
                bairro,
                cidade,
                estado,
                telefone,
                responsavel,
                email,
                senha
            })
            res.send(empresa);
        }
        catch(e){
            res.send(e);
        }
    },
}

module.exports = cadastroEmpresaController;