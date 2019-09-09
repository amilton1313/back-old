
const EmpreendimentoBloco = require('../models/mo_empreendimentoBloco')

exports.addEmpreendimentoBloco = (req, res, next) => {
  const empreendimentoBloco = req.body
  EmpreendimentoBloco.create(empreendimentoBloco)
    .then(empreendimentoBloco => {
      res.status(200).json(empreendimentoBloco)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.updEmpreendimentoBloco = (req, res, next) => {
  const id = req.params.id
  const body = req.body

  EmpreendimentoBloco.findByPk(id)
    .then(empreendimentoBloco => {
      empreendimentoBloco.update(body)
    })
    .then(empreendimentoBloco => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Bloco não encontrado.')
    })
}

exports.delEmpreendimentoBloco = (req, res, next) => {
  const id = req.params.id

  EmpreendimentoBloco.findByPk(id)
    .then(empreendimentoBloco => {
      empreendimentoBloco.destroy(empreendimentoBloco)
    })
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Bloco não encontrado.')
    })
}

exports.getEmpreendimentoBlocoById = (req, res, next) => {
  const id = req.params.id
  EmpreendimentoBloco.findByPk(id)
    .then(empreendimentoBloco => {
      res.status(200).json(empreendimentoBloco)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Bloco não encontrado.')
    })
}

exports.getEmpreendimentoBlocoByNome = (req, res, next) => {
  const { nome } = req.params
  const busca = '%' + nome.toLowerCase() + '%'

  EmpreendimentoBloco.sequelize.query(`select id_bloco, nome
  from empreendimentos_blocos
  where lower(nome) like :busca`,
  { replacements: { busca } })
    .then(empreendimentoBloco => {
      res.status(200).json(empreendimentoBloco[0])
    })
    .catch(err => {
      res.status(500).send({ message: "Ocorreu um erro ao buscar os registros" });
    });
}


exports.getEmpreendimentoBlocos = (req, res, next) => {
  EmpreendimentoBloco.sequelize.query(`
  select id_bloco, nome
  from empreendimentos
  order by nome`)
    .then(empreendimentoBlocos => {
      res.status(200).json(empreendimentoBlocos[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Bloco não encontrado.')
    })
}



