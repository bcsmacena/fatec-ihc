module.exports = (sequelize, DataTypes) => {
    const Contrato = sequelize.define(
      "Contrato",
      {
        id: 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        empresa_id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        colaborador_Id: 
        {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        funcao: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: 
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        inicioJornada: 
        {
            type: DataTypes.TIME,
            allowNull: false,
        },
        terminoJornada:
        {
            type: DataTypes.TIME,
            allowNull: false,
        },
        valorHora:
        {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
      },
      {
        timestamps: false,
        tableName: "contratos",
        freezeTableName: true,
        modelName: 'singularName',
      }
    );
  
    Contrato.associate = (models) => {
        Contrato.belongsTo(models.Colaborador, {
            foreignKey: "id",
        });
        Contrato.belongsTo(models.Empresa, {
            foreignKey: "id",
        });
    };
  
    return Contrato;
  };
  