import { NextApiRequest, NextApiResponse } from "next";

const finalizarFaseGrupos = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	if (req.method === "POST") {
		const categoriaId = req.query.id;

		if (!categoriaId) {
			return res.status(400).json({ message: "categoriaId is required" });
		}

		res.status(200).json({ message: "Fase de grupos finalizada com sucesso!" });
	} else {
		res.status(405).json({ message: "Método não permitido" });
	}
};

export default finalizarFaseGrupos;
