module.exports = (sequelize, DataTypes) => {
    const Empresa = sequelize.define(
      "Empresa",
      {
        id: 
        {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cnpj: 
        {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        razaoSocial: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nomeFantasia: 
        {
            type: DataTypes.STRING,
            allowNull: false,
        },
        atuacao: 
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
        responsavel:
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
        tableName: "empresas",
        freezeTableName: true,
        modelName: 'singularName',
      }
    );
  
    Empresa.associate = (models) => {
        Empresa.hasMany(models.Contrato, {
        foreignKey: "empresa_id",
        });
    };
  
    return Empresa;
  };
  