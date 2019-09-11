const Indice = require('../models/mo_indice')

exports.addIndice = (req, res, next) => {
  const indice = req.body
  Indice.create(indice)
    .then(indice => {
      res.status(200).json(indice)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.updIndice = (req, res, next) => {
  const id = req.params.id
  const body = req.body

  Indice.findByPk(id)
    .then(indice => {
      indice.update(body)
    })
    .then(indice => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.delIndice = (req, res, next) => {
  const id = req.params.id

  Indice.findByPk(id)
    .then(indice => {
      indice.destroy(indice)
    })
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.getIndiceById = (req, res, next) => {
  const id = req.params.id
  Indice.findByPk(id)
    .then(indice => {
      res.status(200).json(indice)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.getIndiceByNome = (req, res, next) => {
  const { nome } = req.params
  const busca = '%' + nome.toLowerCase() + '%'

  Indice.sequelize.query(`select id_indice, nome
  from indices
  where lower(nome) like :busca`,
  { replacements: { busca } })
    .then(indice => {
      res.status(200).json(indice[0])
    })
    .catch(err => {
      res.status(500).send({ message: "Ocorreu um erro ao buscar os registros" });
    });
}


exports.getIndices = (req, res, next) => {
  Indice.sequelize.query(`
  select id_indice, indice_descricao
  from indices
  order by indice_descricao`)
    .then(indices => {
      res.status(200).json(indices[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Índice não encontrado.')
    })
}




