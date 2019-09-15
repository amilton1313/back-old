const bcrypt = require('bcryptjs')

const Pessoa = require('../models/mo_pessoa')

exports.addPessoa = (req, res, next) => {
  const pessoa = req.body
  Pessoa.create(pessoa)
    .then(pessoa => {
      res.status(200).json(pessoa)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.updPessoa = (req, res, next) => {
  const id = req.params.id
  const body = req.body

  Pessoa.findByPk(id)
    .then(pessoa => {
      pessoa.update(body)
    })
    .then(pessoa => {
      res.status(200).json(body)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.delPessoa = (req, res, next) => {
  const id = req.params.id

  Pessoa.findByPk(id)
    .then(pessoa => {
      pessoa.destroy(pessoa)
    })
    .then(id => {
      res.status(200).json(id)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.getPessoaById = (req, res, next) => {
  const id = req.params.id
  Pessoa.findByPk(id)
    .then(pessoa => {
      res.status(200).json(pessoa)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.getPessoaByNome = (req, res, next) => {
  const { nome } = req.params
  const busca = '%' + nome.toLowerCase() + '%'

  Pessoa.sequelize.query(`select id_pessoa, nome
  from pessoas
  where lower(nome) like :busca`,
  { replacements: { busca } })
    .then(pessoa => {
      res.status(200).json(pessoa[0])
    })
    .catch(err => {
      res.status(500).send({ message: "Ocorreu um erro ao buscar os registros" });
    });
}


exports.getPessoas = (req, res, next) => {
  Pessoa.sequelize.query(`
  select id_pessoa, nome
  from pessoas
  order by nome`)
    .then(pessoas => {
      res.status(200).json(pessoas[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}

exports.getPessoaByCnpj = (req, res, next) => {
  const { cnpj } = req.params

  Pessoa.sequelize.query(`select *
  from pessoas
  where cpf_cnpj = :cnpj`,
  { replacements: { cnpj } })
    .then(pessoa => {
      res.status(200).json(pessoa[0])
    })
    .catch(err => {
      res.status(500).send({ message: "Ocorreu um erro ao buscar o registro" });
    });
}

exports.getPessoaByCpf = (req, res, next) => {

  const { cpf } = req.params

  Pessoa.sequelize.query(`
  select row_to_json (p) as pessoa 
  from 
  (select pes.id_pessoa, pes.cpf_cnpj, pes.senha, pes.nome as nomecliente,
          pes.endereco, pes.complemento, pes.bairro, pes.municipio, pes.uf, pes.cep, 
              
              
              (select array_to_json(array_agg(row_to_json(fon))) 
              from (select id_pessoa, id_contato, id_tipo, contato, observavao, whatsapp from pessoas_contatos) fon  
              where id_pessoa = pes.id_pessoa and id_tipo = 1 ) as telefones, 

              
              (select array_to_json(array_agg(row_to_json(ema))) 
              from (select id_pessoa, id_contato, id_tipo, contato, observavao from pessoas_contatos) ema  
              where id_pessoa = pes.id_pessoa and id_tipo = 2 ) as emails, 
      
              
              (select row_to_json (red) as redes 
              from (select id_pessoa, facebook, pinterest, instagram 
              from pessoas  
              where id_pessoa = pes.id_pessoa ) as red), 
      
              
              (select array_to_json(array_agg(row_to_json(emp))) 
              from (select crec.id_contrato, empr.id_empreendimento, empr.nome as nomeempreendimento, empr.nagarantia,
                  
                          
                          (select array_to_json(array_agg(row_to_json(arq)))  
                          from (select poe.id, poe.id_nome_docum, poe.id_empreendimento, poend.descricao, poe.nome_arquivo as path_arquivo from po_empreendimentos poe  

                          left join po_empreend_nome_docum poend 
                          on poend.id = poe.id_nome_docum 

                          where poe.id_empreendimento = crec.id_empreendimento order by poend.descricao) arq  
                          ) as arquivos, 
                                  
                                  (select array_to_json(array_agg(row_to_json(uni))) 
                                  from (select eu.id_unidade, 
                                        case ubl.nome
                                        when 'BLOCO ÚNICO'
                                        then ''
                                        when 'GARAGENS'
                                        then ''
                                        when 'DEPÓSITOS'
                                        then ''
                                        else ubl.nome
                                        end as nomebloco
                                        
                                        , eu.numero, tipund.descricao as tipounidade,

                                          
                                          (select array_to_json(array_agg(row_to_json(gr))) 
                                          from (select 
                                          popl.id, popl.descricao as descricaoGrupo, 

                                                          
                                                      (select array_to_json(array_agg(row_to_json(unar))) 
                                                      from (select 
                                                      pou2.id, pou2.descricao as descricaoArquivo, pou2.nome_arquivo as path_arquivo 
                                                      from po_unidades pou2 
                                                      where eu.id_po_unidades_nome_unidade = pou2.id_nome_unidade and pou2.id_nome_planta = popl.id and pou2.id_empreendimento = crec.id_empreendimento) as unar) as unid_arquivos 
                  
                                  from po_unidades pou 

                                  left join po_unidades_nome_planta popl 
                                  on popl.id = pou.id_nome_planta 
                                                
                                                

                                  where pou.id_nome_unidade = eu.id_po_unidades_nome_unidade 

                                  group by popl.id, popl.descricao 
                                  order by popl.descricao ) as gr) as grupo 

              from cre_contratos contr 

              left join cre_contratos_unidades cun 
              on cun.id_contrato = contr.id_contrato 

              left join empreendimentos_unidades eu 
              on eu.id_unidade = cun.id_unidade 
                                        
              left join empreendimentos_unidades_tipos tipund
              on tipund.id_tipo = eu.tipo						  

              left join empreendimentos_blocos ubl 
              on ubl.id_bloco = eu.id_bloco 

              where id_cliente = pes.id_pessoa) as uni 
              ) as unidades 
                  
                  
  from cre_contratos crec 
  left join empreendimentos empr 
  on empr.id_empreendimento = crec.id_empreendimento 
  where crec.id_cliente = pes.id_pessoa ) emp 
  ) as empreendimentos 

from pessoas pes 
where pes.cpf_cnpj = :cpf) as p
  `,
  { replacements: { cpf } })
    .then(pessoas => {
      const pes = pessoas[0]
      res.status(200).json(pes[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}


exports.getGrupoPessoas = (req, res, next) => {

  Pessoa.sequelize.query(`
  select

        pes.id_pessoa, pes.cpf_cnpj, pes.nome as nomecliente,
        empr.id_empreendimento, empr.nome as nomeempreendimento
        
        
        from cre_contratos contr
        
        left join pessoas pes
        on pes.id_pessoa = contr.id_cliente
        
        left join empreendimentos empr
        on empr.id_empreendimento = contr.id_empreendimento
        
        where contr.id_empreendimento = 42
  `)
    .then(pessoas => {
      res.status(200).json(pessoas[0])
    })
    .catch(err => {
      console.log(err)
      res.status(500).json('Usuário não encontrado.')
    })
}



