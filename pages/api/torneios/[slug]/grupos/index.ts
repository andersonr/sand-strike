// pages/api/torneios/[slug]/grupos/index.ts

import { GrupoJogadoresAdapter } from "@/adapters/GrupoJogadoresAdapter";
import { GrupoAdapter } from "@/adapters/GruposAdapter";
import { criarGruposAdicionandoParticipantes } from "@/services/grupos/gruposService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { grupos, jogadores } = req.body;

		const gruposAdapter = new GrupoAdapter(grupos);
		const jogadoresGrupoAdapter = new GrupoJogadoresAdapter(jogadores);

		const categoriaGrupos = gruposAdapter.adapt();
		const grupoJogadores = jogadoresGrupoAdapter.adapt();

		try {
			const result = await criarGruposAdicionandoParticipantes(
				categoriaGrupos,
				grupoJogadores,
			);
			res.status(201).json({ message: "Grupos criados com sucesso", result });
		} catch (error: unknown) {
			if (error instanceof Error) {
				res
					.status(500)
					.json({ message: "Erro ao criar grupo", error: error.message });
			} else {
				res.status(500).json({ message: "An unknown error occurred" });
			}
		}

		/*
		//TO:DO
		//Chamar service de criar CategoriaGrupos armazenando o ID com o nome do grupo
		//Processar a lista de jogadoresGrupoAdapter com os IDs dos grupos criados
		//Salvar os jogadores do grupo no GrupoJogadores através do Service

		//Exemplo de JSON esperado
		//  {
		//     grupos: {
		//         tipo: 1,
		//         categoriaId: 3
		//         nomes: [ "1", "2", "3"]
		//     },
		//     jogadores: [
		//         {
		//             categoriaJogadorId: 1,
		//             grupoNome: 1
		//         },
		//         {
		//             categoriaJogadorId: 2,
		//             grupoNome: 1
		//         }
		//     ]
		// }
		*/
		res.status(201).json({ message: "Grupo criado com sucesso" });
	} else {
		return res.status(405).json({ error: "Método não permitido" });
	}
}
