import { supabaseAdmin } from "../../lib/supabaseAdmin";

const SQLGET2BETTERPLAYEROFGROUPS = ` SELECT
  *
FROM
  (
    SELECT
      gj.*,
      j."nome",
      ROW_NUMBER() OVER (
        PARTITION BY
          gj."grupoId"
        ORDER BY
          gj."vitorias" DESC,
          gj."saldo" DESC,
          j."nome" asc          
      ) AS "rn"
    FROM
      "GrupoJogadores" gj
      inner join "CategoriaJogadores" cj on gj."jogadorId" = cj."id"      
      inner join "Jogadores" j on cj."jogadorId" = j."id"      
    where
      cj."categoriaId" = 3
  ) AS ranked
WHERE
  ranked."rn" <= 2
ORDER BY
  ranked."grupoId",
  ranked."vitorias" DESC,
  ranked."saldo" DESC;`;

export async function finalizarFaseGruposDaCategoria(categoriaId: number) {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data, error } = await supabaseAdmin
		.from("GrupoJogadores")
		.select("*, CategoriaJogadores(*, Jogadores(*))")
		.eq("CategoriaJogadores.categoriaId", categoriaId)
		.order("vitorias", { ascending: false })
		.order("saldo", { ascending: false })
		.order("nome", {
			foreignTable: "CategoriaJogadores.Jogadores",
			ascending: true,
		});

	//sql(SQLGET2BETTERPLAYEROFGROUPS);

	if (error) {
		throw error;
	}

	if (data) {
		// Da para ordenar pelo Nome tbm, para desempate, caso tenham jogadores com o mesmo número de vitória e saldo
		const groupedData = data.reduce((acc, item) => {
			const group = acc[item.grupoId] || [];
			if (group.length < 2) group.push(item); // Limite de 2 por grupo
			acc[item.grupoId] = group;
			return acc;
		}, {});

		const result = Object.values(groupedData).flat();
		console.log(result);

		return result;
	}

	//TODO: Continuar a partir daqui -- Já tem os 2 melhores colocados de cada grupo

	return data;
}
