const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const AgendaTelefonicaContato = sequelize.define('agenda_telefonica_contato', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  agenda_telefonia_id: Sequelize.INTEGER,
  contato: Sequelize.STRING(100),
  id_tipo_contato: Sequelize.INTEGER,
  observavao: Sequelize.STRING(50),
}, {
  tableName: 'agenda_telefonica_contato',
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = AgendaTelefonicaContato
