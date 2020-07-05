'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('empresas',
      {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        cnpj: 
        {
          type: Sequelize.STRING(14),
          allowNull: false,
          unique: true
        },
        razaoSocial:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        nomeFantasia:
        {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        atuacao:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        cep:
        {
          type: Sequelize.STRING(8),
          allowNull: false
        },
        endereco:
        {
          type: Sequelize.STRING(150),
          allowNull: false
        },
        complemento:
        {
          type: Sequelize.STRING(150),
          allowNull: true
        },
        bairro:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        cidade:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        estado:
        {
          type: Sequelize.STRING(2),
          allowNull: false
        },
        telefone:
        {
          type: Sequelize.STRING(11),
          allowNull: false
        },
        responsavel:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        email:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        senha:
        {
          type: Sequelize.STRING(45),
          allowNull: false
        },
      })

    },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('empresas');
  }
};
