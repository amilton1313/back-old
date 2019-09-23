const Sequelize = require('sequelize')

const sequelize = require('../util/DBconnection')

const PessoaComplemento = sequelize.define('pessoas_complemento', {
  id_dados: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  data_nascimento: Sequelize.DATEONLY,
  nacionalidade: Sequelize.STRING(20),
  sexo: Sequelize.INTEGER,
  data_casamento: Sequelize.DATEONLY,
  profissao: Sequelize.STRING(30),
  numero_dependentes: Sequelize.INTEGER,
  rg: Sequelize.STRING(20),
  data_expedicao: Sequelize.DATEONLY,
  orgao_emissor_uf: Sequelize.STRING(15),
  tempo_empresa: Sequelize.STRING(10),
  cargo: Sequelize.STRING(20),
  remuneracao: Sequelize.DECIMAL(10, 2),
  outras_rendas_origem: Sequelize.STRING(50),
  outras_rendas_valor: Sequelize.DECIMAL(10, 2),
  id_empresa: Sequelize.INTEGER,
  id_pessoa: Sequelize.INTEGER,
  estado_civil: Sequelize.INTEGER,
  regime_casamento: Sequelize.INTEGER,
  pacto_nupcial: Sequelize.TEXT,
  id_conjuge: Sequelize.INTEGER,
  nome_conjuge: Sequelize.STRING(50),
  empresa_nome: Sequelize.STRING(50),
  financ_descricao: Sequelize.STRING(50),
  financ_valor: Sequelize.DECIMAL(10, 2),
  financ_prazo: Sequelize.STRING(30),
  companheiro_nome: Sequelize.STRING(50),
  conjuge_cpf: Sequelize.STRING(14),
  uniao_estavel: Sequelize.INTEGER
}, {
  tableName: 'pessoas_complemento',
  timestamp: false,
  createdAt: false,
  updatedAt: false
});

module.exports = PessoaComplemento
