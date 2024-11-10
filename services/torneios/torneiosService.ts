import { TorneioAdapter } from "@/adapters/TorneiosAdapter";
import { Torneio, TorneioInsert } from "@/types";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export async function createTorneio(torneio: TorneioAdapter) {
	const newTorneio: TorneioInsert = torneio.adapt();

	if (supabaseAdmin) {
		const { data: torneio, error } = await supabaseAdmin
			.from("Torneios")
			.insert([newTorneio]);

		if (error) throw error;

		return torneio; // Verificar se está retornando o objeto correto ou se deveria retornar newTorneio
	}
}

export async function getTorneioBySlug(slug: string): Promise<Torneio | null> {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data, error } = await supabaseAdmin
		.from("Torneios")
		.select("*")
		.eq("slug", slug)
		.single();

	if (error) {
		if (error.code === "PGRST116" || error.code === "PGRST008") return null;

		throw error;
	}

	return data as Torneio;
}
