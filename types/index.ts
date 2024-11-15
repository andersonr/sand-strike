import { CategoriaGrupo, GrupoJogador } from "./supabase-types";

// types/index.ts
export * from "./supabase-types";

export type GrupoJogadorComCategoria = GrupoJogador & {
	CategoriaGrupos: CategoriaGrupo;
};
