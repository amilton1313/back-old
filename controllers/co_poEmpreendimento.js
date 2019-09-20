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




