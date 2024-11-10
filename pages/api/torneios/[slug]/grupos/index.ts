// pages/api/torneios/[slug]/grupos/index.ts

import { GrupoJogadoresAdapter } from "@/adapters/GrupoJogadoresAdapter";
import { GrupoAdapter } from "@/adapters/GruposAdapter";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	if (req.method === "POST") {
		const { grupos, jogadores } = req.body;

		const gruposAdapter = new GrupoAdapter(grupos);
		const jogadoresGrupoAdapter = new GrupoJogadoresAdapter(jogadores);

		//Chamar service de criar CategoriaGrupos armazenando o ID com o nome do grupo
		//Processar a lista de jogadoresGrupoAdapter com os IDs dos grupos criados
		//Salvar os jogadores do grupo no GrupoJogadores através do Service

		//Exemplo de JSON esperado
		// var dados = {
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

		res.status(201).json({ message: "Grupo criado com sucesso" });
	} else {
		return res.status(405).json({ error: "Método não permitido" });
	}
}
