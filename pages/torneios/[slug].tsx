import { TopBar } from "@/components/topbar";
import { TournamentBracket } from "@/components/tournament-bracket";
import { TournamentGroups } from "@/components/tournament-groups";
import { Category, TournamentTicket } from "@/components/tournament-ticket";
import HeadTitle from "@/components/ui/head-title";
import { useRouter } from "next/router";

function Torneio() {
	const router = useRouter();
	const id = router.query.slug;
	console.log(id);

	return (
		<>
			<TopBar />
			<HeadTitle tabTitle={`Torneio - ${id}`} />
			<div className="container mx-auto p-4">
				<TournamentTicket
					title="11º Torneio CT Denner de Futevolei"
					category={Category.FUTEVOLEI}
					place="Blupadel esportes de	areia"
					address="Rua 2 de Setembro, 1111 - Itoupava Norte"
					city="Blumenau"
					date={new Date("2024-11-30 08:00:00")}
					time="08:00 horas"
					slug={id?.toString()}
				/>
				<TournamentBracket />
				<hr />
				<TournamentGroups />
			</div>
		</>
	);
}

export default Torneio;
