const IndiceData = require('../models/mo_indiceData')

exports.addIndiceData = (req, res, next) => {
  const indiceData = req.body
  IndiceData.create(indiceData)
    .then(indiceData => {
      res.status(200).json(indiceData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}

exports.updIndiceData = (req, res, next) => {
  const id = req.params.id
  const body = req.body

  IndiceData.findByPk(id)
    .then(indiceData => {
      indiceData.update(body)
    })
    .then(indiceData => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}

exports.delIndiceData = (req, res, next) => {
  const id = req.params.id

  IndiceData.findByPk(id)
    .then(indiceData => {
      indiceData.destroy(indiceData)
    })
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}

exports.getIndiceDataByData = (req, res, next) => {
  const data = req.params.data
  IndiceData.findByPk(data)
    .then(indiceData => {
      res.status(200).json(indiceData)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}

exports.getIndiceDatas = (req, res, next) => {
  IndiceData.sequelize.query(`
  select id_indice, indice_data, indice_data_valor
  from indices_datas
  order by indice_data`)
    .then(indiceDatas => {
      res.status(200).json(indiceDatas[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}

exports.getIndicesIntranet = (req, res, next) => {
  const hoje = new Date()
  const dataAtual = hoje.getFullYear() + '-' + (hoje.getMonth() + 1) + '-01'

  IndiceData.sequelize.query(`
  select array_to_json(array_agg(row_to_json(emp))) resultado
from(
	select 
	(
		select array_to_json(array_agg(row_to_json(rv))) resvalor
		from(
			select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 60
			and indice_data = :dataAtual
		) rv
	
	),
	(
		select array_to_json(array_agg(row_to_json(ri))) resindice
		from(
			select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 61
			and indice_data = :dataAtual
		) ri
	
	),
	(
		select array_to_json(array_agg(row_to_json(cv))) comvalor
		from(
			select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 62
			and indice_data = :dataAtual
		) cv
	
	),
	(
		select array_to_json(array_agg(row_to_json(ci))) comindice
		from(
			select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 63
			and indice_data = :dataAtual
		) ci
	
	)
	
	) emp
  `,
  { replacements: { dataAtual } })
    .then(indiceDatas => {
      res.status(200).json(indiceDatas[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}

exports.getIndicesIntranetPeriodo = (req, res, next) => {

  const body = req.body

  const {dataOne, dataTwo} = req.body

  // const hoje = new Date()
  // const dataAtual = hoje.getFullYear() + '-' + (hoje.getMonth() + 1) + '-01'

  IndiceData.sequelize.query(`
    select id1.indice_data, id1.indice_data_valor as resValor,
    id2.indice_data_valor as resIndice, id3.indice_data_valor as comValor,
    id4.indice_data_valor as comIndice
    from indices_datas id1

    left join indices_datas id2
    on id1.indice_data = id2.indice_data 
    and id2.id_indice = 61

    left join indices_datas id3
    on id1.indice_data = id3.indice_data 
    and id3.id_indice = 62

    left join indices_datas id4
    on id1.indice_data = id4.indice_data 
    and id4.id_indice = 63

    where id1.indice_data between :dataOne and :dataTwo
    and id1.id_indice = 60
    order by indice_data desc
  `,
  { replacements: { dataOne, dataTwo } })
    .then(indiceDatas => {
      res.status(200).json(indiceDatas[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Data não encontrada.')
    })
}




