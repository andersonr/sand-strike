import { GrupoJogadorInsertWithGroupName } from "@/adapters/GrupoJogadoresAdapter";
import { CategoriaGrupoInsert } from "@/types";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { criarGruposAdicionandoParticipantes } from "../grupos/gruposService";

const MATA_MATA_GROUP_NAME = "Mata-mata";

// const SQLGET2BETTERPLAYEROFGROUPS = ` SELECT
//   *
// FROM
//   (
//     SELECT
//       gj.*,
//       j."nome",
//       ROW_NUMBER() OVER (
//         PARTITION BY
//           gj."grupoId"
//         ORDER BY
//           gj."vitorias" DESC,
//           gj."saldo" DESC,
//           j."nome" asc
//       ) AS "rn"
//     FROM
//       "GrupoJogadores" gj
//       inner join "CategoriaJogadores" cj on gj."jogadorId" = cj."id"
//       inner join "Jogadores" j on cj."jogadorId" = j."id"
//     where
//       cj."categoriaId" = 3
//   ) AS ranked
// WHERE
//   ranked."rn" <= 2
// ORDER BY
//   ranked."grupoId",
//   ranked."vitorias" DESC,
//   ranked."saldo" DESC;`;

export async function finalizarFaseGruposDaCategoria(categoriaId: number) {
	// TODO
	// Se der tempo, fazer apuração dos dados de vitorias e saldo, olhando para GrupoJogos
	// para atualizar a GrupoJogadores, garantindo que o número de vitórias e saldo esteja correto

	const jogadoresClassificados =
		await getTwoBestPlayersOfEachGroup(categoriaId);

	const grupoMataMata: CategoriaGrupoInsert[] = [
		{
			categoriaId: Number(categoriaId),
			nome: MATA_MATA_GROUP_NAME,
			tipo: 2,
		},
	];

	const jogadoresMataMata = montarListaJogadoresClassificados(
		jogadoresClassificados as { jogadorId: number }[],
	);

	const grupoDeMataMataCriado = await criarGruposAdicionandoParticipantes(
		grupoMataMata,
		jogadoresMataMata,
	);

	return { jogadoresClassificados, grupoDeMataMataCriado };
}

/**
 * @description
 * Retorna os dois melhores jogadores de cada grupo de uma categoria,
 * classificados pela quantidade de vitórias, saldo e nome.
 * @param {number} categoriaId
 * @returns {Promise<GrupoJogadorComCategoria[]>}
 */
async function getTwoBestPlayersOfEachGroup(categoriaId: number) {
	const classificacaoJogadores =
		await getClassificacaoGeralFaseGruposByCategoria(categoriaId);

	if (classificacaoJogadores.length > 0) {
		const groupedData = selectFirstTwoPlayersWithSameGroupId(
			classificacaoJogadores,
		);

		return Object.values(groupedData).flat();
	}

	return [];
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function selectFirstTwoPlayersWithSameGroupId(data: any[]) {
	return data.reduce((acc, item) => {
		const group = acc[item.grupoId] || [];
		if (group.length < 2) group.push(item); // Limite de 2 por grupo
		acc[item.grupoId] = group;
		return acc;
	}, {});
}

async function getClassificacaoGeralFaseGruposByCategoria(categoriaId: number) {
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

	if (error) {
		throw error;
	}

	return data;
}

function montarListaJogadoresClassificados(
	jogadoresClassificados: { jogadorId: number }[],
): GrupoJogadorInsertWithGroupName[] {
	return jogadoresClassificados.map((jogador) => {
		return {
			jogadorId: jogador.jogadorId,
			grupoId: 0,
			groupName: MATA_MATA_GROUP_NAME,
		};
	});
}
