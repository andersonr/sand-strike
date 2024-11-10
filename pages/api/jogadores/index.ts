// c:\Users\Anderson\Documents\Git\sand-strike\pages\api\jogadores\index.ts

import { getJogadoresByCategoria } from "@/services/jogadores/jogadoresService";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	switch (req.method) {
		case "GET":
			return handleGetJogadores(req, res);
		default:
			res.setHeader("Allow", ["GET"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}

async function handleGetJogadores(req: NextApiRequest, res: NextApiResponse) {
	// http://localhost:3000/api/jogadores?categoriaId=3
	const { categoriaId } = req.query;

	if (!categoriaId) {
		return res.status(400).json({ message: "categoriaId is required" });
	}

	const categoriaIdNumber = Number(categoriaId);

	if (Number.isNaN(categoriaIdNumber)) {
		return res.status(400).json({ message: "categoriaId must be a number" });
	}

	try {
		const jogadores = await getJogadoresByCategoria(categoriaIdNumber);
		res.status(200).json(jogadores);
	} catch (error) {
		console.error("Error fetching jogadores:", error);
		res.status(500).json({ message: "Internal server error" });
	}
}
