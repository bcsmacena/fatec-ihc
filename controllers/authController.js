const { Colaborador, Empresa } = require("../models");

const bcrypt = require("bcrypt");

const authController = {
  create: (_req, res) => {
    return res.render("auth/login");
  },
  store: async (req, res) => {
    const { email, senha, radioLogin } = req.body;

    if(radioLogin == "radioColaborador"){

      const colaborador = await Colaborador.findOne({
          where: { email: email}
      });

      if (!colaborador || !bcrypt.compareSync(senha, colaborador.senha)) {
        console.log("errou");
        return res.render("auth/login", {
          msg: "Email ou senha errados!",
        });
      }

      req.session.user = {
        id: colaborador.id,
        name: colaborador.nome,
        email: colaborador.email,
      };

      return res.redirect("/colaborador");
    } else {
      
      const empresa = await Empresa.findOne({
        where: { email: email}
      });

      if (!empresa || !bcrypt.compareSync(senha, empresa.senha)) {
        console.log("errou");
        return res.render("auth/login", {
          msg: "Email ou senha errados!",
        });
      }

      req.session.user = {
        id: empresa.id,
        name: empresa.nome,
        email: empresa.email,
      };
      
      return res.render("empresa");
    }
  },

  destroy: (req, res) => {
    req.session.user = "";
    console.log(req.session)
    return res.redirect("/");
  },
};

module.exports = authController;
