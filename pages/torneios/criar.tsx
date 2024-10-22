import { TopBar } from "@/components/topbar";
import { TournamentCreator } from "@/components/tournament-creator";

function criarTorneio() {
	return (
		<>
			<TopBar />
			<TournamentCreator />
		</>
	);
}

export default criarTorneio;
