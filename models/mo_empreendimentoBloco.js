const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const EmpreendimentoBloco = sequelize.define('empreendimentos_blocos', {
  id_bloco: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  numero: Sequelize.INTEGER,
  nome: Sequelize.STRING(40),
  id_empreendimento: Sequelize.INTEGER,
  id_empresa: Sequelize.INTEGER
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = EmpreendimentoBloco
