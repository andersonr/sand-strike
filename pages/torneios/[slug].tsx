import { TorneioFutevoleiReestruturado } from "@/components/torneio-futevolei-reestruturado";
import { TournamentTicket } from "@/components/tournament-ticket";
import Head from "next/head";
import { useRouter } from "next/router";

function Torneio() {
	const router = useRouter();
	const id = router.query.slug;
	console.log(id);

	return (
		<>
			<Head>
				<title>Torneio</title>
			</Head>
			<hr />
			<TournamentTicket />
			<TorneioFutevoleiReestruturado />
		</>
	);
}

export default Torneio;
