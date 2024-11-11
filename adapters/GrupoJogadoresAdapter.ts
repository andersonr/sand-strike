/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrupoJogadorInsert } from "@/types";

export interface GrupoJogadoresRecordData {
	categoriaJogadorId: number;
	grupoNome: string;
}

// export interface GrupoJogadoresData {
// 	jogadores: GrupoJogadoresRecordData[];
// }

export interface GrupoJogadorInsertWithGroupName extends GrupoJogadorInsert {
	groupName: string;
}

export class GrupoJogadoresAdapter {
	private data: GrupoJogadoresRecordData[];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(requestBody: any) {
		this.data = requestBody;
	}

	validate(): void {
		if (!this.data || this.data.length === 0) {
			throw new Error("Jogadores do grupo são obrigatórios");
		}
	}

	adapt(): GrupoJogadorInsertWithGroupName[] {
		this.validate();

		const valueToReturn: GrupoJogadorInsertWithGroupName[] = [];

		// biome-ignore lint/complexity/noForEach: <explanation>
		this.data.forEach((jogador) => {
			const inscricaoGrupo: GrupoJogadorInsertWithGroupName = {
				jogadorId: jogador.categoriaJogadorId,
				grupoId: 0,
				groupName: jogador.grupoNome,
			};

			valueToReturn.push(inscricaoGrupo);
		});

		return valueToReturn;
	}
}
