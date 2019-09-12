const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const AgendaTelefonica = sequelize.define('agenda_telefonica', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: Sequelize.STRING(100),
  contato: Sequelize.STRING(100),
  referencia_assunto: Sequelize.STRING(100),
  observavao: Sequelize.TEXT
}, {
  tableName: 'agenda_telefonica',
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = AgendaTelefonica
