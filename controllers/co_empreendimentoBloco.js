
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

  const id_bloco = req.params.id

  EmpreendimentoBloco.sequelize.query(`
  select emp.nome as nomeempreendimento,
    blo.*
    from empreendimentos_blocos blo

    left join empreendimentos emp
    on emp.id_empreendimento = blo.id_empreendimento

    where blo.id_bloco = :id_bloco
  `,
  { replacements: { id_bloco } })
    .then(empreendimentoBlocos => {
      res.status(200).json(empreendimentoBlocos[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Bloco não encontrado.')
    })
}

exports.getEmpreendimentoBlocos = (req, res, next) => {

  const id_empreendimento = req.params.id

  EmpreendimentoBloco.sequelize.query(`
  select array_to_json(array_agg(row_to_json(emp))) blocos
from(
	select id_empreendimento, nome,
	(
		select array_to_json(array_agg(row_to_json(blo)))
		from (
			select id_bloco, nome from empreendimentos_blocos
			where id_empreendimento = emp.id_empreendimento
			order by id_bloco
		) blo
	) blocos
	from empreendimentos emp
	where id_empreendimento = :id_empreendimento
	order by id_empreendimento
) emp`,
  { replacements: { id_empreendimento } })
    .then(empreendimentoBlocos => {
      res.status(200).json(empreendimentoBlocos[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Bloco não encontrado.')
    })
}



