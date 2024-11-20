import { NextApiRequest, NextApiResponse } from "next";

const eliminacaoSimples = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { categoriaId } = req.query;

		if (!categoriaId || Number.isNaN(Number(categoriaId))) {
			return res
				.status(400)
				.json({ message: "categoriaId is required or incorrect" });
		}

		// Receber lista de duplas formada
		// Confrontos tbm vem do front-end
		// Aqui eu monto apenas na base a estrutura

		res.status(200).json({
			message: "Eliminação simples criada com sucesso!",
		});
	}
};

export default eliminacaoSimples;
