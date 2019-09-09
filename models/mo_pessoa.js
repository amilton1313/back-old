const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const Pessoa = sequelize.define('pessoas', {
  id_pessoa: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nome: Sequelize.STRING(70),
  endereco: Sequelize.STRING(50),
  complemento: Sequelize.STRING(50),
  bairro: Sequelize.STRING(20),
  municipio: Sequelize.STRING(30),
  uf: Sequelize.STRING(2),
  cep: Sequelize.STRING(9),
  tipo_pessoa: Sequelize.INTEGER,
  cpf_cnpj: Sequelize.STRING(30),
  correspondencia: Sequelize.INTEGER,
  cod_msm: Sequelize.INTEGER,
  codigo_contabilidade: Sequelize.INTEGER,
  apelido: Sequelize.STRING(20),
  codigo_cobcaixa: Sequelize.INTEGER,
  bloqueio: Sequelize.INTEGER,
  edicao_bloqueada: Sequelize.INTEGER,
  observacao: Sequelize.TEXT,
  ctb_conta: Sequelize.INTEGER,
  ctb_enviado: Sequelize.INTEGER,
  dt_enviotabelas: Sequelize.DATEONLY,
  senha: Sequelize.STRING(20),
  facebook: Sequelize.STRING(70),
  pinterest: Sequelize.STRING(70),
  instagram: Sequelize.STRING(70),
  num_creci: Sequelize.STRING(20),
  adm: Sequelize.BOOLEAN,
  admin: Sequelize.INTEGER,
}, {
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = Pessoa
