const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const IndiceData = sequelize.define('indices_datas', {
  id_indice: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  indice_data: {
    type: Sequelize.INTEGER,
    autoIncrement: false,
    allowNull: false,
    primaryKey: true
  },
  indice_data_valor: Sequelize.DATEONLY,
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = IndiceData
