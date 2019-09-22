
const EmpreendimentoUnidade = require('../models/mo_empreendimentoUnidade')

exports.addEmpreendimentoUnidade = (req, res, next) => {
  const empreendimentoUnidade = req.body
  EmpreendimentoUnidade.create(empreendimentoUnidade)
    .then(empreendimentoUnidade => {
      res.status(200).json(empreendimentoUnidade)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.updEmpreendimentoUnidade = (req, res, next) => {

  const id_unidade = req.params.id
  const body = req.body
  console.log('alter ', id_unidade)

  EmpreendimentoUnidade.findByPk(id_unidade)
    .then(empreendimentoUnidade => {
      empreendimentoUnidade.update(body)
    })
    .then(empreendimentoUnidade => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Unidade não encontrado.')
    })
}

exports.delEmpreendimentoUnidade = (req, res, next) => {

  const id_unidade = req.params.id

  EmpreendimentoUnidade.findByPk(id_unidade)
    .then(empreendimentoUnidade => {
      empreendimentoUnidade.destroy(empreendimentoUnidade)
    })
    .then(id => {
      res.status(200).json(id_unidade)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Unidade não encontrado.')
    })
}

exports.getEmpreendimentoUnidadeById = (req, res, next) => {
  
  const id_unidade = req.params.id

  EmpreendimentoUnidade.sequelize.query(`
  select emp.nome as nomeempreendimento,
blo.*,
und.*
from empreendimentos_unidades und

left join empreendimentos_blocos blo
on blo.id_bloco = und.id_bloco

left join empreendimentos emp
on emp.id_empreendimento = blo.id_empreendimento

where und.id_unidade = :id_unidade

  `,
  { replacements: { id_unidade } })
    .then(empreendimentoUnidades => {
      res.status(200).json(empreendimentoUnidades[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Unidade não encontrada.')
    })
}

exports.getEmpreendimentoUnidadeByNumero = (req, res, next) => {

  const { id_bloco, numero } = req.body
  const busca = '%' + numero.toLowerCase() + '%'

  EmpreendimentoUnidade.sequelize.query(`select *
  from empreendimentos_Unidades
  where lower(numero) like :busca
  and id_bloco = :id_bloco`,
  { replacements: { busca, id_bloco } })
    .then(empreendimentoUnidade => {
      res.status(200).json(empreendimentoUnidade[0])
    })
    .catch(err => {
      res.status(500).send({ message: "Ocorreu um erro ao buscar os registros" });
    });
}

exports.getEmpreendimentoUnidadesByBloco = (req, res, next) => {

  const id_bloco = req.params.id

  EmpreendimentoUnidade.sequelize.query(`
  select array_to_json(array_agg(row_to_json(blo))) unidades
    from(
      select id_bloco, nome as nomebloco,
      (
        select array_to_json(array_agg(row_to_json(emp)))
        from (
          select id_empreendimento, nome as nomeempreendimento,
          (
            select array_to_json(array_agg(row_to_json(und)))
            from (
              select unid.*
              from empreendimentos_unidades unid
              where id_bloco = blo.id_bloco
              order by id_unidade
              ) und
          
          ) unidades
          from empreendimentos emp
          where id_empreendimento = blo.id_empreendimento
        ) emp
      ) empreendimento
      from empreendimentos_blocos blo
      where id_bloco = :id_bloco
    ) blo
  `,
  { replacements: { id_bloco } })
    .then(empreendimentoUnidades => {
      res.status(200).json(empreendimentoUnidades[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Unidade não encontrada.')
    })
}

exports.getEmpreendimentoUnidadesByEmpreendimento = (req, res, next) => {

  const id_empreendimento = req.params.id

  EmpreendimentoUnidade.sequelize.query(`
  select array_to_json(array_agg(row_to_json(emp))) unidades
    from(
      select id_empreendimento, nome,
      (
        select array_to_json(array_agg(row_to_json(blo)))
        from (
          select id_bloco, nome,
          (
            select array_to_json(array_agg(row_to_json(und)))
            from (
              select unid.*
              from empreendimentos_unidades unid
              where id_bloco = blo.id_bloco
              order by id_unidade
              ) und
          
          ) unidades
          from empreendimentos_blocos blo
          where id_empreendimento = emp.id_empreendimento
          order by id_bloco
        ) blo
      ) blocos
      from empreendimentos emp
      where id_empreendimento = :id_empreendimento
      order by id_empreendimento
    ) emp
  `,
  { replacements: { id_empreendimento } })
    .then(empreendimentoUnidades => {
      res.status(200).json(empreendimentoUnidades[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Unidade não encontrada.')
    })
}



