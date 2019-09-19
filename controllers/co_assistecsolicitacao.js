const Sequelize = require('sequelize');

const AssisTecSolicitacao = require('../models/mo_assistecsolicitacao')

exports.addAssisTecSolicitacao = (req, res, next) => {
  const assistecsolicitacao = req.body
  AssisTecSolicitacao.create(assistecsolicitacao)
    .then(assistecsolicitacao => {
      res.status(200).json(assistecsolicitacao)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Cadastro não encontrado.')
    })
}

exports.updAssisTecSolicitacao = (req, res, next) => {
  const id = req.params.id
  const body = req.body

  AssisTecSolicitacao.findByPk(id)
    .then(assistecsolicitacao => {
      assistecsolicitacao.update(body)
    })
    .then(assistecsolicitacao => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Cadastro não encontrado.')
    })
}

exports.delAssisTecSolicitacao = (req, res, next) => {
  const id = req.params.id

  AssisTecSolicitacao.findByPk(id)
    .then(assistecsolicitacao => {
      assistecsolicitacao.destroy(assistecsolicitacao)
    })
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Cadastro não encontrado.')
    })
}

exports.getAssisTecSolicitacaoById = (req, res, next) => {
  const id_solicitacao = req.params.id
  AssisTecSolicitacao.findByPk(id_solicitacao)
    .then(assistecsolicitacao => {
      res.status(200).json(assistecsolicitacao)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Cadastro não encontrado.')
    })
}

exports.getAssisTecSolicitacoesByIdUnidade = (req, res, next) => {
  const id_unidade = req.params.id
  console.log('chegouuuuu')
  AssisTecSolicitacao.findAll({
    attributes: {
        include: [
            [Sequelize.literal(`CASE 
        WHEN status=1 THEN 'Em análise' 
        WHEN status=2 THEN 'Em serviço' 
        WHEN status=3 THEN 'Concluído' 
        WHEN status=4 THEN 'Fora da garantia' 
        ELSE 'Novo'
        END`), 'status']
        ],
        exclude: ['status']
    },
    where: { id_unidade: id_unidade }
  })
    .then(assistecsolicitacao => {
      res.status(200).json(assistecsolicitacao)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Cadastro não encontrado.')
    })
}





