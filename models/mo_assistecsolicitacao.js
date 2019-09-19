const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const AssisTecSolicitacao = sequelize.define('assisttecnica_solicitacoes', {
  id: {
    type: Sequelize.INTEGER,
    field: 'id_solicitacao',
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  empreendimentoId: { type: Sequelize.INTEGER, field: 'id_empreendimento', primaryKey: true },
  unidadeId: { type: Sequelize.INTEGER, field: 'id_unidade', primaryKey: true },
  dataSolicitacao: { type: Sequelize.DATE, field: 'dt_solicitacao' },
  dataPrevisao: { type: Sequelize.DATE, field: 'dt_previsao' },
  dataConclusao: { type: Sequelize.DATE, field: 'dt_conclusao' },
  nome : { type: Sequelize.STRING, field: 'solicitante_nome' },
  telefones : { type: Sequelize.STRING, field: 'solicitante_fones' },
  email : { type: Sequelize.STRING, field: 'solicitante_email' },
  assunto : { type: Sequelize.STRING, field: 'assunto' },
  condominio: Sequelize.INTEGER,
  observacao : { type: Sequelize.TEXT, field: 'observacao' },
  status : { type: Sequelize.INTEGER, field: 'status' }
}, {
  tableName: 'assisttecnica_solicitacoes',
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = AssisTecSolicitacao