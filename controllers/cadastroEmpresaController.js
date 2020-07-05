const cadastroEmpresaController = {
    index: async(req,res) => {
        res.render('cadastro/empresa');
    },
    store: async(req,res) => {
        const { nome, cnpj, telefone, email, senha } = req.body
        const novaEmpresa = {
            nome,
            cnpj,
            telefone,
            email,
            senha
        }
        res.send(novaEmpresa);
    },
}

module.exports = cadastroEmpresaController;