const { Colaborador } = require("../models");
const bcrypt = require("bcrypt");

const cadastroColaboradorController = {
    index: async(req,res) => {
        res.render('cadastro/colaborador');
    },
    store: async(req,res) => {
        const { cpf, nome, dataNascimento, sexo, cep, endereco, numero, complemento, bairro, cidade, estado, telefone, email, senha } = req.body

        const hashPassword = bcrypt.hashSync(senha, 10);

        if(sexo == "Feminino"){
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
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                telefone,
                email,
                senha: hashPassword
            })
            return res.render('auth/login', {msg: "Colaborador cadastrado com sucesso!"});
        }
        catch(e){
            if(e.name == "SequelizeUniqueConstraintError"){
                return res.render('cadastro/colaborador', {msg: "Já possui cadastro"}) 
            }
            res.send(e);
        }
    },
}

module.exports = cadastroColaboradorController;