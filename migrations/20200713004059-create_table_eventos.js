'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('eventos',
      {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        empresa_id:
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'empresas',
            key: 'id'
          }
        },
        nome: 
        {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        qtdeProfissionais: 
        {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        data:
        {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        inicioJornada:
        {
          type: Sequelize.TIME,
          allowNull: false
        },
        terminoJornada:
        {
          type: Sequelize.TIME,
          allowNull: false
        },
        descricao:
        {
          type: Sequelize.STRING(2000),
          allowNull: true
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
        numero:
        {
          type: Sequelize.INTEGER,
          allowNull: true
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
      })

    },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('eventos');
  }
};
