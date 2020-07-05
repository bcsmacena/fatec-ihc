'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('colaboradores',
      {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        cpf: 
        {
          type: Sequelize.STRING(11),
          allowNull: false,
          unique: true
        },
        nome:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        dataNascimento:
        {
          type: Sequelize.DATE,
          allowNull: false
        },
        sexo:
        {
          type: Sequelize.STRING(1),
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
    return await queryInterface.dropTable('colaboradores');
  }
};
