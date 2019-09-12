const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const PessoaContato = sequelize.define('pessoas_contatos', {
  id_contato: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  contato: Sequelize.STRING(50),
  observavao: Sequelize.STRING(50),
  id_pessoa: Sequelize.INTEGER,
  id_tipo: Sequelize.INTEGER,
  whatsapp: Sequelize.INTEGER,
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = PessoaContato
