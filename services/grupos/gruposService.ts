/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrupoJogadorInsertWithGroupName } from "@/adapters/GrupoJogadoresAdapter";
import { GrupoJogadorComCategoria } from "@/types";
import {
	CategoriaGrupo,
	CategoriaGrupoInsert,
	GrupoJogador,
	GrupoJogadorInsert,
	GrupoJogo,
	GrupoJogoInsert,
	JogoJogadorInsert,
} from "@/types/supabase-types";
import { supabaseAdmin } from "../../lib/supabaseAdmin";

interface GruposComJogadores {
	grupos: CategoriaGrupo[];
	jogadores: GrupoJogador[];
}

export async function criarGruposAdicionandoParticipantes(
	categoriaGrupos: CategoriaGrupoInsert[],
	grupoJogadores: GrupoJogadorInsertWithGroupName[],
): Promise<GruposComJogadores> {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data: grupos, error } = await supabaseAdmin
		.from("CategoriaGrupos")
		.insert(categoriaGrupos)
		.select("*")
		.returns<CategoriaGrupo[]>();

	if (error) {
		throw error;
	}

	const jogadoresNaoCadastrados = [];
	const jogadoresCadastrados = [];

	for (const jogador of grupoJogadores) {
		const grupoCriado = grupos.find(
			(grupo) => grupo.nome === jogador.groupName.toString(),
		);

		if (grupoCriado) {
			console.log(`Grupo criado: ${grupoCriado.nome} - ID: ${grupoCriado.id}`);
			jogador.grupoId = grupoCriado.id;

			const { data, error } = await adicionarJogadorAoGrupo(jogador);

			if (error) {
				jogadoresNaoCadastrados.push({ erro: error, jogador });
				console.log(
					`Jogador não cadastrados: ${jogador.jogadorId} do grupo ${jogador.grupoId}`,
				);
			} else if (data) {
				jogadoresCadastrados.push(...data);
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

	return {
		grupos,
		jogadores: jogadoresCadastrados
	};
}

export async function adicionarJogadorAoGrupo(
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

export async function getJogadoresFaseGrupoByCategoriaAndTipo(
	categoriaId: number,
	tipo: number,
): Promise<GrupoJogadorComCategoria[]> {
	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data, error } = await supabaseAdmin
		.from("GrupoJogadores")
		.select("*, CategoriaGrupos(*) as CategoriaGrupos")
		.eq("CategoriaGrupos.categoriaId", categoriaId)
		.eq("CategoriaGrupos.tipo", tipo)
		.returns<(GrupoJogador & { CategoriaGrupos: CategoriaGrupo })[]>();

	if (error) {
		throw error;
	}

	return data;
}

export async function criarJogosGrupo(partidas: GrupoJogadorComCategoria[][]) {
	if (!partidas || partidas.length === 0) {
		throw new Error("Partidas não informadas");
	}

	const valueToReturn = [];

	for (let i = 0; i < partidas.length; i++) {
		console.log(`Criando partida ${i + 1} de ${partidas.length}`);
		const timesPartida = partidas[i];

		if (timesPartida?.length === 2) {
			const partidaCriada = await criarPartidaFaseDeGrupos(
				timesPartida[0][0].grupoId,
				i + 1,
			);

			if (partidaCriada) {
				const jogadoresPartida = await adicionarJogadoresNaPartida(
					partidaCriada,
					partidas[i],
				);

				valueToReturn.push({
					partida: partidaCriada,
					jogadores: jogadoresPartida,
				});
			}
		}
	}

	return valueToReturn;
}

export async function adicionarJogadoresNaPartida(
	partida: GrupoJogo,
	times: GrupoJogadorComCategoria[],
) {
	const jogadoresPartida: JogoJogadorInsert[] = [];

	if (partida && times?.length === 2) {
		const timeA = times[0];
		const timeB = times[1];

		jogadoresPartida.push(
			{
				jogoId: partida.id,
				jogadorId: timeA[0].jogadorId,
				time: 1,
			},
			{
				jogoId: partida.id,
				jogadorId: timeA[1].jogadorId,
				time: 1,
			},
			{
				jogoId: partida.id,
				jogadorId: timeB[0].jogadorId,
				time: 2,
			},
			{
				jogoId: partida.id,
				jogadorId: timeB[1].jogadorId,
				time: 2,
			},
		);

		if (!supabaseAdmin) {
			throw new Error("Supabase admin client is not available");
		}

		const { data, error } = await supabaseAdmin
			.from("JogoJogadores")
			.insert(jogadoresPartida)
			.select("*");

		if (error) {
			throw error;
		}

		return data;
		// biome-ignore lint/style/noUselessElse: <explanation>
	} else throw new Error("Partida ou times nao informados");
}

export async function criarPartidaFaseDeGrupos(
	grupoId: number,
	rodada: number,
) {
	const jogo: GrupoJogoInsert = {
		grupoId: grupoId,
		rodada: rodada,
		saldo: 0,
		resultadoA: 0,
		resultadoB: 0,
	};

	if (!supabaseAdmin) {
		throw new Error("Supabase admin client is not available");
	}

	const { data, error } = await supabaseAdmin
		.from("GrupoJogos")
		.insert(jogo)
		.select("*")
		.single<GrupoJogo>();

	if (error) {
		console.log("Erro ao criar partida:	", error);
		console.log("	>> Erro:	", error.message);
		console.log("Erro ao criar partida:	", error.details);
		throw error;
	}

	return data;
}
