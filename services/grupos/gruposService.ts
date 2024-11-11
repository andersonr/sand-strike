/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrupoJogadorInsertWithGroupName } from "@/adapters/GrupoJogadoresAdapter";
import {
	CategoriaGrupoInsert,
	GrupoJogadorInsert,
} from "@/types/supabase-types";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

export async function criarGruposAdicionandoParticipantes(
	categoriaGrupos: CategoriaGrupoInsert[],
	grupoJogadores: GrupoJogadorInsertWithGroupName[],
) {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data, error } = await supabaseAdmin
		.from("CategoriaGrupos")
		.insert(categoriaGrupos)
		.select("*");

	if (error) {
		throw error;
	}

	console.log("Grupos criados:>>", data);
	console.log("   >  grupoJogadores", grupoJogadores);

	const jogadoresNaoCadastrados = [];

	for (const jogador of grupoJogadores) {
		const grupoCriado = data.find(
			(grupo) => grupo.nome === jogador.groupName.toString(),
		);

		if (grupoCriado) {
			console.log(`Grupo criado: ${grupoCriado.nome} - ID: ${grupoCriado.id}`);
			jogador.grupoId = grupoCriado.id;

			const { error } = await adicionarJogadorAoGrupo(jogador);

			if (error) {
				jogadoresNaoCadastrados.push({ erro: error, jogador });
				console.log(
					`Jogador não cadastrados: ${jogador.jogadorId} do grupo ${jogador.grupoId}`,
				);
			}
		} else {
			console.log(
				`Grupo não encontrado: ${jogador.groupName} do jogador ${jogador.jogadorId}`,
			);
		}
	}

	if (jogadoresNaoCadastrados.length > 0) {
		throw new Error("Jogadores nao cadastrados");
	}

	return data;
}

async function adicionarJogadorAoGrupo(
	jogador: GrupoJogadorInsertWithGroupName,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
) {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const player: GrupoJogadorInsert = {
		jogadorId: jogador.jogadorId,
		grupoId: jogador.grupoId,
		vitorias: 0,
		saldo: 0,
	};

	return await supabaseAdmin.from("GrupoJogadores").insert(player).select("*");
}
