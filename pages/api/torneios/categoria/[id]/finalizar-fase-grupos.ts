import { finalizarFaseGruposDaCategoria } from "@/services/categorias/categoriasService";
import { NextApiRequest, NextApiResponse } from "next";

const finalizarFaseGrupos = async (
	req: NextApiRequest,
	res: NextApiResponse,
) => {
	if (req.method === "POST") {
		const categoriaId = req.query.id;

		if (!categoriaId || Number.isNaN(Number(categoriaId))) {
			return res
				.status(400)
				.json({ message: "categoriaId is required or incorrect" });
		}

		// Faz a apuração dos classificados e cria o grupo com os participantes do Mata Mata
		const valueToReturn = await finalizarFaseGruposDaCategoria(
			Number(categoriaId),
		);

		res.status(200).json({
			message: "Fase de grupos finalizada com sucesso!",
			valueToReturn,
		});
	} else {
		res.status(405).json({ message: "Método não permitido" });
	}
};

export default finalizarFaseGrupos;
