import { TopBar } from "@/components/topbar";
import { TournamentAdmView } from "@/components/tournament-adm-view";
import { useRouter } from "next/router";

function editarTorneio() {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const router = useRouter();
	const id = router.query.slug;
	console.log(id);

	return (
		<>
			<TopBar />
			<TournamentAdmView />
		</>
	);
}

export default editarTorneio;
