import { getGrupoJogadoresByCategoriaAndTipo } from "@/services/grupos/gruposService";
import { GrupoJogadorComCategoria } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { categoriaId, tipo } = req.body;

		if (!categoriaId || !tipo) {
			return res
				.status(400)
				.json({ message: "categoriaId and tipo are required" });
		}

		try {
			/* Ex retorno getGrupoJogadoresByCategoriaAndTipo
            {
                "id": 3,
                "created_at": "2024-11-11T03:34:08.646098+00:00",
                "grupoId": 22,
                "jogadorId": 3,
                "vitorias": 0,
                "saldo": 0,
                "CategoriaGrupos": {
                    "id": 22,
                    "nome": "1",
                    "tipo": 1,
                    "created_at": "2024-11-11T03:34:08.448667+00:00",
                    "categoriaId": 3
                }
            }
            */
			const jogadoresNosGruposDaCategoria =
				await getGrupoJogadoresByCategoriaAndTipo(categoriaId, tipo);

			if (jogadoresNosGruposDaCategoria.length === 0) {
				return res.status(404).json({ message: "Jogadores not found" });
			}

			const grupos: {
				[grupoId: number]: GrupoJogadorComCategoria[];
			} = agruparJogadoresPeloGrupoId(jogadoresNosGruposDaCategoria);

			for (const grupoId in grupos) {
				console.log(`Grupo ${grupoId}`);

				const duplasGrupo: GrupoJogadorComCategoria[] = combinations(
					grupos[grupoId],
					2,
				);

				console.log("Confrontos >>>>>>");
				const partidas: GrupoJogadorComCategoria[][] = [];
				for (let i = 0; i < duplasGrupo.length; i++) {
					for (let j = i + 1; j < duplasGrupo.length; j++) {
						const equipe1 = duplasGrupo[i];
						const equipe2 = duplasGrupo[j];
						if (!equipe1.some((elemento) => equipe2.includes(elemento))) {
							const partida = [equipe1, equipe2];
							partidas.push(partida);
						}
					}
				}

				for (const partida of partidas) {
					console.log(
						"  - ",
						partida[0].map((jogador) => jogador.jogadorId).join(" - "),
						" x ",
						partida[1].map((jogador) => jogador.jogadorId).join(" - "),
					);
				}

				//TODO: salvar partidas no banco
			}

			res.status(200).json(jogadoresNosGruposDaCategoria);
		} catch (error) {
			res.status(500).json({ message: "An error occurred", error });
		}
	}
}

function agruparJogadoresPeloGrupoId(jogadores: GrupoJogadorComCategoria[]): {
	[grupoId: number]: GrupoJogadorComCategoria[];
} {
	return jogadores.reduce((acc, jogador) => {
		if (!acc[jogador.grupoId]) {
			acc[jogador.grupoId] = [];
		}
		acc[jogador.grupoId].push(jogador);
		return acc;
	}, {});
}

/**
 * Generates all possible combinations of a given array.
 *
 * @param arr - The input array from which combinations are to be generated.
 * @param qtdItemsGrouped - The number of items in each combination group.
 * @returns An array of combinations, where each combination is an array containing
 *          `qtdItemsGrouped` elements from the input array.
 *
 * Note: This function is recursive and will generate combinations in a
 *       lexicographical order based on the input array.
 */
const combinations = (arr: any, qtdItemsGrouped: number) => {
	if (qtdItemsGrouped === 1) return arr.map((x) => [x]);

	const result = [];

	for (let i = 0; i < arr.length - qtdItemsGrouped + 1; i++) {
		const current = arr[i];
		const rest = arr.slice(i + 1);
		const comb = combinations(rest, qtdItemsGrouped - 1);
		for (const c of comb) {
			result.push([current, ...c]);
		}
	}

	return result;
};
