const PortalDoctos = require('../models/mo_poEmpreendimento')

exports.getPortalDoctosByEmpreend = (req, res, next) => {

  const id_empreendimento = req.params.id

  PortalDoctos.sequelize.query(`
  select empr.id,
  ndoc.descricao as nomeDocumento,
  empr.nome_arquivo as nomeArquivo
  from po_empreendimentos empr

  left join po_empreend_nome_docum ndoc
  on empr.id_nome_docum = ndoc.id

  where id_empreendimento = :id_empreendimento

  order by ndoc.descricao
  `,
  { replacements: { id_empreendimento } })
    .then(indices => {
      res.status(200).json(indices[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Índice não encontrado.')
    })
}

exports.getPortalPlantasByEmpreend = (req, res, next) => {

  const id_empreendimento = req.params.id

  PortalDoctos.sequelize.query(`
  select pounp.id, pounp.descricao
  from po_unidades pou

  left join po_unidades_nome_planta pounp
  on pounp.id = pou.id_nome_planta 

  where pou.id_empreendimento = :id_empreendimento

  group by pounp.id, pounp.descricao

  order by pounp.descricao 
  `,
  { replacements: { id_empreendimento } })
    .then(indices => {
      res.status(200).json(indices[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Índice não encontrado.')
    })
}

exports.getPortalDoctosByUnidade = (req, res, next) => {
  console.log('chegou post')

  const {id_empreendimento, id_nome_unidade} = req.body

  PortalDoctos.sequelize.query(`
  select array_to_json(array_agg(row_to_json(emp))) plantas
    from (
    select pla.*,
      
      (
        select array_to_json(array_agg(row_to_json(blo))) arquivos
        from (

          select pound.descricao, pound.nome_arquivo
          from po_unidades pound
          where id_empreendimento = :id_empreendimento
          and id_nome_unidade = :id_nome_unidade
          and id_nome_planta = pla.id
          order by descricao

        ) blo
      )

    from po_unidades_nome_planta pla
      order by pla.descricao
      ) emp
  `,
  { replacements: { id_empreendimento, id_nome_unidade } })
    .then(indices => {
      res.status(200).json(indices[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Índice não encontrado.')
    })
}




