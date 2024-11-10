import { getTorneioBySlug } from "@/services/torneios/torneiosService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { slug } = req.query;

	switch (req.method) {
		case "GET": {
			try {
				const torneioSlug = Array.isArray(slug) ? slug[0] : slug;

				if (!torneioSlug) {
					return res
						.status(400)
						.json({ message: "Slug do torneio não fornecido" });
				}

				const torneio = await getTorneioBySlug(torneioSlug);

				if (!torneio) {
					return res.status(404).json({ message: "Torneio não encontrado" });
				}

				return res.status(200).json(torneio);
			} catch {
				return res.status(500).json({ message: "Erro interno do servidor" });
			}
		}
		default:
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
