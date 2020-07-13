module.exports = (sequelize, DataTypes) => {
    const Evento = sequelize.define(
      "Evento",
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
        nome: 
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        descricao: 
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        data: 
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        cep: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco:
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        complemento:
        {
            type: DataTypes.STRING,
            allowNull: true,
        },
        bairro: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cidade:         
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        estado:         
        {
            type: DataTypes.STRING,
            allowNull: false,
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
      },
      {
        timestamps: false,
        tableName: "eventos",
        freezeTableName: true,
        modelName: 'singularName',
      }
    );
  
    Evento.associate = (models) => {
        Evento.belongsTo(models.Empresa, {
            foreignKey: "empresa_id",
        });
        Evento.hasMany(models.Convocacao, {
            foreignKey: "evento_id",
        });
    };
  
    return Evento;
  };
  