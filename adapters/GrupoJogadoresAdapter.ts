/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrupoJogadorInsert } from "@/types";

export interface GrupoJogadoresRecordData {
	categoriaJogadorId: number;
	grupoNome: string;
}

export interface GrupoJogadoresData {
	jogadores: GrupoJogadoresRecordData[];
}

export class GrupoJogadoresAdapter {
	private data: GrupoJogadoresData;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(requestBody: any) {
		this.data = requestBody;
	}

	validate(): void {
		if (!this.data.jogadores || this.data.jogadores.length === 0) {
			throw new Error("Jogadores do grupo são obrigatórios");
		}
	}

	adapt(): GrupoJogadorInsert[] {
		this.validate();

		const valueToReturn: GrupoJogadorInsert[] = [];

		// biome-ignore lint/complexity/noForEach: <explanation>
		this.data.jogadores.forEach((jogador) => {
			const inscricaoGrupo: GrupoJogadorInsert = {
				jogadorId: jogador.categoriaJogadorId,
				grupoId: 0,
			};

			valueToReturn.push(inscricaoGrupo);
		});

		return valueToReturn;
	}
}
