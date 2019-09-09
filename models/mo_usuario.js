const Sequelize = require('sequelize');

const sequelize = require('../util/DBconnection');

const pessoa = require('./mo_pessoa')

const Usuario = sequelize.define('usuario', {
  id_usuario: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nm_nick: Sequelize.STRING,
  pw_usuario: Sequelize.STRING,
  id_perfil: Sequelize.INTEGER,
  id_pessoa: Sequelize.INTEGER
}, {
  tableName: 'usuario',
  timestamp: false,
  createdAt: false,
  updatedAt: false
})

// Usuario.belongsTo(pessoa.Pessoa, { foreignKey: 'id_pessoa' })

module.exports = Usuario


