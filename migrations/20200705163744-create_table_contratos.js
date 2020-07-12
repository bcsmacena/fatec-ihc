'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('contratos',
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
        colaborador_id:
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'colaboradores',
            key: 'id'
          }
        },
        funcao:
        {
          type: Sequelize.STRING(100),
          allowNull: false
        },
        descricao:
        {
          type: Sequelize.STRING(100),
          allowNull: true
        },
        valorHora:
        {
          type: Sequelize.DECIMAL(10,2),
          allowNull: false
        },
      })

    },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('contratos');
  }
};
