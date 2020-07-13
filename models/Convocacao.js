module.exports = (sequelize, DataTypes) => {
    const Convocacao = sequelize.define(
      "Convocacao",
      {
        id: 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        evento_id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        contrato_id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        dataConvocacao: 
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        dataAceitacao: 
        {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: false,
        tableName: "convocacoes",
        freezeTableName: true,
        modelName: 'singularName',
      }
    );
  
    Convocacao.associate = (models) => {
        Convocacao.belongsTo(models.Evento, {
            foreignKey: "evento_id",
        });
        Convocacao.belongsTo(models.Contrato, {
            foreignKey: "contrato_id",
        });
    };
  
    return Convocacao;
  };
  