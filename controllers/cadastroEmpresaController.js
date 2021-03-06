const { Empresa } = require("../models");
const bcrypt = require("bcrypt");

const cadastroEmpresaController = {
    index: async(req,res) => {
        res.render('cadastro/empresa');
    },
    store: async(req,res) => {
        const { cnpj, razaoSocial, nomeFantasia, atuacao, cep, endereco, numero, complemento, bairro, cidade, estado, telefone, responsavel, email, senha } = req.body

        const hashPassword = bcrypt.hashSync(senha, 10);

        cnpjSemMascara = cnpj.replace(/[^\d]/g, '')

        try{
            const empresa = await Empresa.create({
                cnpj: cnpjSemMascara,
                razaoSocial,
                nomeFantasia,
                atuacao,
                cep,
                endereco,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                telefone,
                responsavel,
                email,
                senha: hashPassword
            })
            return res.render('auth/login', { msg: "Empresa cadastrada com sucesso!"});
        }
        catch(e){
            return res.send(e);
        }
    },
}

module.exports = cadastroEmpresaController;