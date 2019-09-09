
const Empreendimento = require('../models/mo_empreendimento')

exports.addEmpreendimento = (req, res, next) => {
  const empreendimento = req.body
  Empreendimento.create(empreendimento)
    .then(empreendimento => {
      res.status(200).json(empreendimento)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.updEmpreendimento = (req, res, next) => {
  const id = req.params.id
  const body = req.body

  Empreendimento.findByPk(id)
    .then(empreendimento => {
      empreendimento.update(body)
    })
    .then(empreendimento => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.delEmpreendimento = (req, res, next) => {
  const id = req.params.id

  Empreendimento.findByPk(id)
    .then(empreendimento => {
      empreendimento.destroy(empreendimento)
    })
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.getEmpreendimentoById = (req, res, next) => {
  const id = req.params.id
  Empreendimento.findByPk(id)
    .then(empreendimento => {
      res.status(200).json(empreendimento)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Empreendimento não encontrado.')
    })
}

exports.getEmpreendimentoByNome = (req, res, next) => {
  const { nome } = req.params
  const busca = '%' + nome.toLowerCase() + '%'

  Empreendimento.sequelize.query(`select id_empreendimento, nome
  from empreendimentos
  where lower(nome) like :busca`,
  { replacements: { busca } })
    .then(empreendimento => {
      res.status(200).json(empreendimento[0])
    })
    .catch(err => {
      res.status(500).send({ message: "Ocorreu um erro ao buscar os registros" });
    });
}


exports.getEmpreendimentos = (req, res, next) => {
  Empreendimento.sequelize.query(`
  select id_empreendimento, nome
  from empreendimentos
  order by nome`)
    .then(empreendimentos => {
      res.status(200).json(empreendimentos[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Empreendimento não encontrado.')
    })
}



