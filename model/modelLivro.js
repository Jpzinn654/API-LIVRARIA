/*Importação do módulo do Sequelize*/
const Sequelize = require('sequelize');

/*Importação da conexão com o banco de dados*/
const connection = require('../database/database');

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
const modelCategoria = require('./modelCategorias');

const modelLivro = connection.define(
    'tbl_livro',
    {
        cod_livro:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        titulo:{
            type: Sequelize.STRING,
            allowNull: false
        },
        preco:{
            type: Sequelize.STRING,
            allowNull: false
        },
        imagen_peq:{
            type: Sequelize.STRING,
            allowNull: false
        },
        imagen_grd:{
            type: Sequelize.STRING,
            allowNull: false
        },
        detalhes:{
            type: Sequelize.TEXT,
            allowNull: false
        }
    }
);

/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/
modelCategoria.hasMany(modelLivro);

/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/
modelLivro.belongsTo(modelCategoria);

//modelLivro.sync({force:true});

module.exports = modelLivro;