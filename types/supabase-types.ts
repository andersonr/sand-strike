import type { Database } from "./supabase";

export type Tables<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
	Database["public"]["Tables"][T]["Update"];

// CategoriaGrupos
export type CategoriaGrupo = Tables<"CategoriaGrupos">;
export type CategoriaGrupoInsert = InsertTables<"CategoriaGrupos">;
export type CategoriaGrupoUpdate = UpdateTables<"CategoriaGrupos">;

// CategoriaJogadores
export type CategoriaJogador = Tables<"CategoriaJogadores">;
export type CategoriaJogadorInsert = InsertTables<"CategoriaJogadores">;
export type CategoriaJogadorUpdate = UpdateTables<"CategoriaJogadores">;

// GrupoJogadores
export type GrupoJogador = Tables<"GrupoJogadores">;
export type GrupoJogadorInsert = InsertTables<"GrupoJogadores">;
export type GrupoJogadorUpdate = UpdateTables<"GrupoJogadores">;

// GrupoJogos
export type GrupoJogo = Tables<"GrupoJogos">;
export type GrupoJogoInsert = InsertTables<"GrupoJogos">;
export type GrupoJogoUpdate = UpdateTables<"GrupoJogos">;

// Jogadores
export type Jogador = Tables<"Jogadores">;
export type JogadorInsert = InsertTables<"Jogadores">;
export type JogadorUpdate = UpdateTables<"Jogadores">;

// JogoJogadores
export type JogoJogador = Tables<"JogoJogadores">;
export type JogoJogadorInsert = InsertTables<"JogoJogadores">;
export type JogoJogadorUpdate = UpdateTables<"JogoJogadores">;

// Organizacoes
export type Organizacao = Tables<"Organizacoes">;
export type OrganizacaoInsert = InsertTables<"Organizacoes">;
export type OrganizacaoUpdate = UpdateTables<"Organizacoes">;

// TorneioCategorias
export type TorneioCategoria = Tables<"TorneioCategorias">;
export type TorneioCategoriaInsert = InsertTables<"TorneioCategorias">;
export type TorneioCategoriaUpdate = UpdateTables<"TorneioCategorias">;

// TorneioPremiacao
export type TorneioPremiacao = Tables<"TorneioPremiacao">;
export type TorneioPremiacaoInsert = InsertTables<"TorneioPremiacao">;
export type TorneioPremiacaoUpdate = UpdateTables<"TorneioPremiacao">;

// Torneios
export type Torneio = Tables<"Torneios">;
export type TorneioInsert = InsertTables<"Torneios">;
export type TorneioUpdate = UpdateTables<"Torneios">;

// Usuarios
export type Usuario = Tables<"Usuarios">;
export type UsuarioInsert = InsertTables<"Usuarios">;
export type UsuarioUpdate = UpdateTables<"Usuarios">;

// Adicionando tipos para Enums e CompositeTypes, se necessário
export type Enums = Database["public"]["Enums"];
export type CompositeTypes = Database["public"]["CompositeTypes"];
