/* eslint-disable @typescript-eslint/no-explicit-any */
import { GrupoJogador } from "@/types/supabase-types";

export interface Player {
  id: number;  // id do GrupoJogador (não é o jogadorId)
  nome: string;
  grupoJogador: GrupoJogador;
}

export interface Team {
  players: [Player, Player]; // Exactly 2 players
  gameId: number;
}

export type TeamResult = {
  type: "winner" | "loser";
  fromGameId: number;
}

export type TeamSlot = Team | TeamResult | null;

export interface Game {
  gameId: number;
  teams: [TeamSlot, TeamSlot];  // Exatamente 2 slots, cada um pode ser um time definido, um resultado de outro jogo, ou null
}

export interface EliminacaoSimplesData {
  teams: Team[];
  totalGames: number;
  gameResults?: { // Opcional: define quais times virão de outros jogos
    gameId: number;
    teamSlots: [TeamSlot | null, TeamSlot | null];
  }[];
}

export class EliminacaoSimplesAdapter {
  private data: EliminacaoSimplesData;

  constructor(requestBody: any) {
    this.data = requestBody;
  }

  private validateTeamSlot(slot: TeamSlot, gameId: number): void {
    if (!slot) return; // null é válido

    if ('players' in slot) {
      // Validação de Team
      if (!slot.players || slot.players.length !== 2) {
        throw new Error(`Game ${gameId}: Each team must have exactly 2 players`);
      }

      for (const player of slot.players) {
        if (!player.id || !player.nome) {
          throw new Error(`Game ${gameId}: Each player must have an id and nome`);
        }
      }
    } else if ('type' in slot) {
      // Validação de TeamResult
      if (!['winner', 'loser'].includes(slot.type)) {
        throw new Error(`Game ${gameId}: Team result type must be 'winner' or 'loser'`);
      }
      if (!slot.fromGameId || slot.fromGameId >= gameId) {
        throw new Error(`Game ${gameId}: Referenced game (${slot.fromGameId}) must exist and be before this game`);
      }
    }
  }

  validate(): void {
    if (!this.data.teams || !Array.isArray(this.data.teams)) {
      throw new Error("Teams must be provided as an array");
    }

    if (!this.data.totalGames || this.data.totalGames < 1) {
      throw new Error("totalGames must be provided and greater than 0");
    }

    // Validar times definidos diretamente
    for (const team of this.data.teams) {
      if (!team.gameId || Number.isNaN(Number(team.gameId))) {
        throw new Error("Each team must have a valid gameId");
      }

      if (team.gameId > this.data.totalGames) {
        throw new Error(`Game ID ${team.gameId} is greater than total number of games (${this.data.totalGames})`);
      }

      this.validateTeamSlot(team, team.gameId);
    }

    // Validar resultados de jogos
    if (this.data.gameResults) {
      for (const gameResult of this.data.gameResults) {
        if (!gameResult.gameId || gameResult.gameId > this.data.totalGames) {
          throw new Error("Invalid gameId in gameResults");
        }

        for (const slot of gameResult.teamSlots) {
          this.validateTeamSlot(slot, gameResult.gameId);
        }
      }
    }
  }

  adapt(): Game[] {
    this.validate();
    
    // Criar array com todos os jogos possíveis
    const games: Game[] = Array.from({ length: this.data.totalGames }, (_, index) => ({
      gameId: index + 1,
      teams: [null, null]
    }));

    // Agrupar times por gameId
    const groupedTeams = new Map<number, Team[]>();
    for (const team of this.data.teams) {
      const existingTeams = groupedTeams.get(team.gameId) || [];
      existingTeams.push(team);
      groupedTeams.set(team.gameId, existingTeams);
    }

    // Preencher os jogos com os times definidos
    for (const game of games) {
      const teamsForGame = groupedTeams.get(game.gameId) || [];
      game.teams = [
        teamsForGame[0] || null,
        teamsForGame[1] || null
      ];
    }

    // Aplicar os resultados de jogos, se existirem
    if (this.data.gameResults) {
      for (const gameResult of this.data.gameResults) {
        const game = games.find(g => g.gameId === gameResult.gameId);
        if (game) {
          // Se houver um slot definido no gameResult, sobrescreve o valor atual
          if (gameResult.teamSlots[0] !== undefined) {
            game.teams[0] = gameResult.teamSlots[0];
          }
          if (gameResult.teamSlots[1] !== undefined) {
            game.teams[1] = gameResult.teamSlots[1];
          }
        }
      }
    }

    return games;
  }
}
