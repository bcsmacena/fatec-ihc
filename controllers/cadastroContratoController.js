const cadastroContratoController = {
    index: async(req,res) => {
        res.render('cadastro/contrato');
    },
    store: async(req,res) => {
        const { nome, cpf, telefone, cargo, email, senha } = req.body
        const novoContrato = {
            nome,
            cpf,
            telefone,
            cargo,
            email,
            senha
        }
        res.send(novoContrato);
    },
}

module.exports = cadastroContratoController;