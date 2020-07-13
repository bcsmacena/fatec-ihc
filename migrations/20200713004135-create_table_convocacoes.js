'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.createTable('convocacoes',
      {
        id:
        {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          unique: true
        },
        evento_id:
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'eventos',
            key: 'id'
          }
        },
        contrato_id:
        {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: 
          { 
            model:'contratos',
            key: 'id'
          }
        },
        dataConvocacao:
        {
          type: Sequelize.DATE,
          allowNull: false
        },
        dataAceitacao:
        {
          type: Sequelize.DATE,
          allowNull: true
        },
      })
    },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable('convocacoes');
  }
};
