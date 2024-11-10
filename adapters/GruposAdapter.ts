import { CategoriaGrupoInsert } from "@/types";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface GrupoData {
	tipo?: number;
	categoriaId: number;
	nomes: string[];
}

export class GrupoAdapter {
	private data: GrupoData;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(requestBody: any) {
		this.data = requestBody;
	}

	validate(): void {
		if (
			!this.data.categoriaId ||
			!this.data.nomes ||
			this.data.nomes.length === 0
		) {
			throw new Error("CategoriaId e nomes são obrigatórios");
		}
	}

	adapt(): CategoriaGrupoInsert[] {
		this.validate();

		const valueToReturn: CategoriaGrupoInsert[] = [];

		// biome-ignore lint/complexity/noForEach: <explanation>
		this.data.nomes.forEach((nome) => {
			const grupo: CategoriaGrupoInsert = {
				tipo: this.data.tipo || undefined,
				categoriaId: this.data.categoriaId,
				nome: nome,
			};

			valueToReturn.push(grupo as CategoriaGrupoInsert);
		});

		return valueToReturn;
	}
}
