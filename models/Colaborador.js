module.exports = (sequelize, DataTypes) => {
    const Colaborador = sequelize.define(
      "Colaborador",
      {
        id: 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cpf: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        nome: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dataNascimento:
        {
            type: DataTypes.DATE,
            allowNull: false,
        },
        sexo:
        {
            type: DataTypes.STRING,
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
        numero:
        {
            type: DataTypes.INTEGER,
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
        telefone:         
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },

      },
      {
        timestamps: false,
        tableName: "colaboradores",
        freezeTableName: true,
        modelName: 'singularName',
      }
    );
  
    Colaborador.associate = (models) => {
        Colaborador.hasMany(models.Contrato, {
        foreignKey: "colaborador_id",
        });
        // Colaborador.belongsTo(models.Contrato, {
        //     foreignKey: "id",
        // });
    };
  
    return Colaborador;
  };
  