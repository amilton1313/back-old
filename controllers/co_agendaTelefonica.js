const AgendaTelefonica = require('../models/mo_agendaTelefonica')

exports.getTelefonesByNome = (req, res, next) => {

	const { nome } = req.params
	const busca = "%" + nome.toUpperCase() + "%"

	AgendaTelefonica.sequelize.query(`
	select array_to_json(array_agg(row_to_json(emp))) contatos
	from (
		select nome,
			
			(
				select array_to_json(array_agg(row_to_json(blo)))
				from (
					select contato, observavao as observacao from pessoas_contatos
					where id_pessoa = pes.id_pessoa and id_tipo = 1
				) blo
			) contatos

		from pessoas pes
		where upper(nome) like :busca

		union all

		select nome,
			
			(
				select array_to_json(array_agg(row_to_json(blo)))
				from (
					select contato, observacao from agenda_telefonica_contato
					where agenda_telefonica_id = pesage.id

				) blo
			) contatos

		from agenda_telefonica pesage
		where upper(nome) like :busca
		or upper(contato) like :busca
		or upper(referencia_assunto) like :busca
		or upper(observacao) like :busca
		order by nome
		
	) emp
	`,
		{ replacements: { busca } })
		.then(contatos => {
			res.status(200).json(contatos[0])
		})
		.catch(err => {
			console.log(err)
			res.status(500).json('Busca não encontrada.')
		})
}
