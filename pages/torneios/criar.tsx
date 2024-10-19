import { TopBar } from "@/components/topbar";
import { TournamentCreatorComponent } from "@/components/tournament-creator";

function criarTorneio() {
	return (
		<>
			<TopBar />
			<TournamentCreatorComponent />
		</>
	);
}

export default criarTorneio;
