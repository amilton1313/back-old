select row_to_json(emp) resutado
from(
    select
        (
            select row_to_json(rv) resvalor
		from(
                select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 60
			and indice_data = '2019-09-01'
            ) rv

        ),
    (
        select row_to_json(ri) resindice
		from(
            select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 61
			and indice_data = '2019-09-01'
        ) ri

),
    (
        select row_to_json(cv) comvalor
from(
    select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 62
			and indice_data = '2019-09-01'
) cv
	
	),
(
    select row_to_json(ci) comindice
from(
    select id_indice, indice_data_valor
			from indices_datas idt
			where id_indice = 63
			and indice_data = '2019-09-01'
) ci
	
	)
	
	) emp


