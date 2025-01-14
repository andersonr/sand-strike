export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      CategoriaGrupos: {
        Row: {
          categoriaId: number
          created_at: string
          id: number
          nome: string
          tipo: number
        }
        Insert: {
          categoriaId: number
          created_at?: string
          id?: number
          nome: string
          tipo?: number
        }
        Update: {
          categoriaId?: number
          created_at?: string
          id?: number
          nome?: string
          tipo?: number
        }
        Relationships: [
          {
            foreignKeyName: "CategoriaGrupos_categoriaId_fkey"
            columns: ["categoriaId"]
            isOneToOne: false
            referencedRelation: "TorneioCategorias"
            referencedColumns: ["id"]
          },
        ]
      }
      CategoriaJogadores: {
        Row: {
          categoriaId: number
          created_at: string
          id: number
          jogadorId: number
          ods: number | null
        }
        Insert: {
          categoriaId: number
          created_at?: string
          id?: number
          jogadorId: number
          ods?: number | null
        }
        Update: {
          categoriaId?: number
          created_at?: string
          id?: number
          jogadorId?: number
          ods?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "CategoriaJogadores_categoriaId_fkey"
            columns: ["categoriaId"]
            isOneToOne: false
            referencedRelation: "TorneioCategorias"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "CategoriaJogadores_jogadorId_fkey"
            columns: ["jogadorId"]
            isOneToOne: false
            referencedRelation: "Jogadores"
            referencedColumns: ["id"]
          },
        ]
      }
      GrupoJogadores: {
        Row: {
          created_at: string
          grupoId: number
          id: number
          jogadorId: number
          saldo: number | null
          vitorias: number | null
        }
        Insert: {
          created_at?: string
          grupoId: number
          id?: number
          jogadorId: number
          saldo?: number | null
          vitorias?: number | null
        }
        Update: {
          created_at?: string
          grupoId?: number
          id?: number
          jogadorId?: number
          saldo?: number | null
          vitorias?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "GrupoJogadores_grupoId_fkey"
            columns: ["grupoId"]
            isOneToOne: false
            referencedRelation: "CategoriaGrupos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "GrupoJogadores_jogadorId_fkey"
            columns: ["jogadorId"]
            isOneToOne: false
            referencedRelation: "CategoriaJogadores"
            referencedColumns: ["id"]
          },
        ]
      }
      GrupoJogos: {
        Row: {
          created_at: string
          grupoId: number | null
          id: number
          resultadoA: number
          resultadoB: number | null
          rodada: number
          saldo: number
        }
        Insert: {
          created_at?: string
          grupoId?: number | null
          id?: number
          resultadoA?: number
          resultadoB?: number | null
          rodada: number
          saldo?: number
        }
        Update: {
          created_at?: string
          grupoId?: number | null
          id?: number
          resultadoA?: number
          resultadoB?: number | null
          rodada?: number
          saldo?: number
        }
        Relationships: [
          {
            foreignKeyName: "GrupoJogos_grupoId_fkey"
            columns: ["grupoId"]
            isOneToOne: false
            referencedRelation: "CategoriaGrupos"
            referencedColumns: ["id"]
          },
        ]
      }
      Jogadores: {
        Row: {
          created_at: string
          id: number
          nome: string
          usuarioId: number | null
        }
        Insert: {
          created_at?: string
          id?: number
          nome: string
          usuarioId?: number | null
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string
          usuarioId?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "Jogadores_usuarioId_fkey"
            columns: ["usuarioId"]
            isOneToOne: false
            referencedRelation: "Usuarios"
            referencedColumns: ["id"]
          },
        ]
      }
      JogoJogadores: {
        Row: {
          created_at: string
          id: number
          jogadorId: number
          jogoId: number
          pendenciaJogoId: number | null
          time: number
        }
        Insert: {
          created_at?: string
          id?: number
          jogadorId: number
          jogoId: number
          pendenciaJogoId?: number | null
          time?: number
        }
        Update: {
          created_at?: string
          id?: number
          jogadorId?: number
          jogoId?: number
          pendenciaJogoId?: number | null
          time?: number
        }
        Relationships: [
          {
            foreignKeyName: "JogoJogadores_jogadorId_fkey"
            columns: ["jogadorId"]
            isOneToOne: false
            referencedRelation: "GrupoJogadores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JogoJogadores_jogoId_fkey"
            columns: ["jogoId"]
            isOneToOne: false
            referencedRelation: "GrupoJogos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "JogoJogadores_pendenciaJogoId_fkey"
            columns: ["pendenciaJogoId"]
            isOneToOne: false
            referencedRelation: "GrupoJogos"
            referencedColumns: ["id"]
          },
        ]
      }
      Organizacoes: {
        Row: {
          created_at: string
          id: number
          nome: string
        }
        Insert: {
          created_at?: string
          id?: number
          nome: string
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string
        }
        Relationships: []
      }
      TorneioCategorias: {
        Row: {
          created_at: string
          id: number
          nome: string
          torneioId: number
        }
        Insert: {
          created_at?: string
          id?: number
          nome: string
          torneioId: number
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string
          torneioId?: number
        }
        Relationships: [
          {
            foreignKeyName: "TorneioCategorias_torneioId_fkey"
            columns: ["torneioId"]
            isOneToOne: false
            referencedRelation: "Torneios"
            referencedColumns: ["id"]
          },
        ]
      }
      TorneioPremiacao: {
        Row: {
          created_at: string
          id: number
          posicao: number | null
          premio: string | null
          torneio: number
        }
        Insert: {
          created_at?: string
          id?: number
          posicao?: number | null
          premio?: string | null
          torneio: number
        }
        Update: {
          created_at?: string
          id?: number
          posicao?: number | null
          premio?: string | null
          torneio?: number
        }
        Relationships: [
          {
            foreignKeyName: "TorneioPremiacao_torneio_fkey"
            columns: ["torneio"]
            isOneToOne: false
            referencedRelation: "Torneios"
            referencedColumns: ["id"]
          },
        ]
      }
      Torneios: {
        Row: {
          cidade: string
          created_at: string
          data: string | null
          endereco: string
          esporte: string
          horario: string | null
          id: number
          local: string | null
          modelo: number | null
          nome: string
          organizacao: number | null
          slug: string
        }
        Insert: {
          cidade: string
          created_at?: string
          data?: string | null
          endereco: string
          esporte?: string
          horario?: string | null
          id?: number
          local?: string | null
          modelo?: number | null
          nome: string
          organizacao?: number | null
          slug: string
        }
        Update: {
          cidade?: string
          created_at?: string
          data?: string | null
          endereco?: string
          esporte?: string
          horario?: string | null
          id?: number
          local?: string | null
          modelo?: number | null
          nome?: string
          organizacao?: number | null
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "Torneios_organizacao_fkey"
            columns: ["organizacao"]
            isOneToOne: false
            referencedRelation: "Organizacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      Usuarios: {
        Row: {
          created_at: string
          id: number
          nome: string
        }
        Insert: {
          created_at?: string
          id?: number
          nome: string
        }
        Update: {
          created_at?: string
          id?: number
          nome?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
