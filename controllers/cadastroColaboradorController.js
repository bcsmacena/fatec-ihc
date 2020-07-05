const { Colaborador } = require("../models");
const bcrypt = require("bcrypt");

const cadastroColaboradorController = {
    index: async(req,res) => {
        res.render('cadastro/colaborador');
    },
    store: async(req,res) => {
        const { cpf, nome, dataNascimento, sexo, cep, endereco, complemento, bairro, cidade, estado, telefone, email, senha } = req.body

        const hashPassword = bcrypt.hashSync(senha, 10);

        if(sexo == "feminino"){
            attrSexo = "f";
        } else {
            attrSexo = "m";
        }

        try{
            const colaborador = await Colaborador.create({
                cpf,
                nome,
                dataNascimento,
                sexo: attrSexo,
                cep,
                endereco,
                complemento,
                bairro,
                cidade,
                estado,
                telefone,
                email,
                senha: hashPassword
            })
            res.send(colaborador);
        }
        catch(e){
            res.send(e);
        }
    },
}

module.exports = cadastroColaboradorController;