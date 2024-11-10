import { TorneioAdapter } from "@/adapters/TorneiosAdapter";
import { createTorneio } from "@/services/torneios/torneiosService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case "POST": {
			const torneioAdapter = new TorneioAdapter(req.body);

			try {
				const result = await createTorneio(torneioAdapter);

				res.status(201).json({ message: "Torneio criado com sucesso", result });
			} catch (error: unknown) {
				if (error instanceof Error) {
					res
						.status(500)
						.json({ message: "Erro ao criar torneio", error: error.message });
				} else {
					res.status(500).json({ message: "An unknown error occurred" });
				}
			}
			break;
		}
		default: {
			res.setHeader("Allow", ["POST"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
		}
	}
}
