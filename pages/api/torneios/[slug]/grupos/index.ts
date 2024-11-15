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

		res.status(201).json({ message: "Grupo criado com sucesso" });
	} else {
		return res.status(405).json({ error: "Método não permitido" });
	}
}
