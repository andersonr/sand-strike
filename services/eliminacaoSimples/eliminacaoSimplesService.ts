type Team = {
	id: number;
	name: string;
};

type Match = {
	team1: Team | null;
	team2: Team | null;
};

type Round = Match[];

// Função para calcular o próximo número potência de 2
function nextPowerOfTwo(n: number): number {
	return 2 ** Math.ceil(Math.log2(n));
}

// Gera os confrontos para uma rodada com os "byes" já na primeira rodada
function generateFirstRoundWithByes(teams: Team[]): Round {
	const totalTeams = teams.length;
	const targetSize = nextPowerOfTwo(totalTeams); // Calcula a potência de 2 mais próxima
	const byesNeeded = targetSize - totalTeams; // Quantos "byes" são necessários

	const allTeams = [...teams, ...Array(byesNeeded).fill(null)]; // Adiciona os "byes" como null
	const matches: Round = [];

	for (let i = 0; i < allTeams.length; i += 2) {
		matches.push({ team1: allTeams[i], team2: allTeams[i + 1] });
	}

	return matches;
}

// Simula o torneio
function runTournamentWithByes(
	teams: Team[],
	simulateWinner: (match: Match) => Team,
): Round[] {
	const rounds: Round[] = [];

	// Primeira rodada com "byes"
	let currentMatches = generateFirstRoundWithByes(teams);
	rounds.push(currentMatches);

	// Determina os vencedores e segue para as próximas rodadas
	let currentTeams = currentMatches.map((match) => simulateWinner(match));

	while (currentTeams.length > 1) {
		currentMatches = generateMatches(currentTeams);
		rounds.push(currentMatches);
		currentTeams = currentMatches.map((match) => simulateWinner(match));
	}

	return rounds;
}

// Gera os confrontos para rodadas subsequentes
function generateMatches(teams: Team[]): Round {
	const matches: Round = [];
	const queue = [...teams];

	while (queue.length > 1) {
		const team1 = queue.shift()!;
		const team2 = queue.shift()!;
		matches.push({ team1, team2 });
	}

	return matches;
}

// Exemplo de função para determinar o vencedor (simula aleatoriamente)
function randomWinner(match: Match): Team {
	if (!match.team2) return match.team1!; // Time avança sozinho
	return Math.random() > 0.5 ? match.team1! : match.team2!;
}

// Teste do algoritmo
const teams: Team[] = [
	{ id: 1, name: "Team A" },
	{ id: 2, name: "Team B" },
	{ id: 3, name: "Team C" },
	{ id: 4, name: "Team D" },
	{ id: 5, name: "Team E" },
	{ id: 6, name: "Team F" },
];

const tournamentRounds = runTournamentWithByes(teams, randomWinner);

console.log("Tournament Rounds:");
tournamentRounds.forEach((round, index) => {
	console.log(`Round ${index + 1}:`);
	round.forEach((match) =>
		console.log(
			`${match.team1?.name || "Bye"} vs ${match.team2?.name || "Bye"}`,
		),
	);
});
