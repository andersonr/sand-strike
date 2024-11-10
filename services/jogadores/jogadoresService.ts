// jogadoresService.ts

import { CategoriaJogador, Jogador } from "@/types/supabase-types";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

interface CategoriaJogadorComDados extends CategoriaJogador {
	Jogador: Jogador;
}

export async function getJogadoresByCategoria(
	categoriaId: number,
): Promise<CategoriaJogadorComDados[]> {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data, error } = await supabaseAdmin
		.from("CategoriaJogadores")
		.select(`
      *,
      Jogador:jogadorId (*)
    `)
		.eq("categoriaId", categoriaId);

	if (error) {
		throw error;
	}

	return data || [];
}
