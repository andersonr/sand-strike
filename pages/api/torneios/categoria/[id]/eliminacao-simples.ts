import { NextApiRequest, NextApiResponse } from "next";
import { EliminacaoSimplesAdapter } from "@/adapters/EliminacaoSimplesAdapter";
import { criarJogosEliminacao } from "@/services/eliminacaoSimples/eliminacaoSimplesService";

const eliminacaoSimples = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { id } = req.query;
    const { grupoId, ...data } = req.body;

    if (!grupoId) {
      return res.status(400).json({ error: "grupoId é obrigatório" });
    }

    try {
      const adapter = new EliminacaoSimplesAdapter();
      const { games } = adapter.adapt(data);

      const jogosEliminacao = await criarJogosEliminacao(games, grupoId);

      res.status(200).json({ jogos: jogosEliminacao });
    } catch (error) {
      console.error("Erro ao criar jogos de eliminação:", error);
      res.status(500).json({ error: "Erro ao criar jogos de eliminação" });
    }
  }
};

export default eliminacaoSimples;
