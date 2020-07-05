const cadastroColaboradorController = {
    index: async(req,res) => {
        res.render('cadastro/colaborador');
    },
    store: async(req,res) => {
        const { nome, cpf, telefone, cargo, email, senha } = req.body
        const novoColaborador = {
            nome,
            cpf,
            telefone,
            cargo,
            email,
            senha
        }
        res.send(novoColaborador);
    },
}

module.exports = cadastroColaboradorController;