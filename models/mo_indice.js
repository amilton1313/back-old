const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const Indice = sequelize.define('indices', {
  id_indice: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  indice_descricao: Sequelize.STRING(20),
  indice_periodo: Sequelize.INTEGER,
  indice_calculo: Sequelize.INTEGER,
  indice_tipo: Sequelize.INTEGER,
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Indice
