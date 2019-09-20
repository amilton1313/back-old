const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const PO_Empreendimento = sequelize.define('po_empreendimentos', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  id_nome_documento: Sequelize.INTEGER,
  id_empreendimento: Sequelize.INTEGER,
  nome_arquivo: Sequelize.STRING(150),
  diretorio: Sequelize.STRING(100),
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = PO_Empreendimento
