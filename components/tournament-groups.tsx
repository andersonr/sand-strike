"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { ChevronDown, ChevronUp, ExpandIcon } from "lucide-react";
import { useState } from "react";

import data from "./mocks/grupos.json";
const groups = data;

// Extrai a interface do JSON, da pra fazer depois, quando for utilizar no código mesmo
interface Player {
	name: string;
	victories: number;
	diff: number;
}

// interface Game {
// 	id: number;
// 	team1: string[];
// 	result: string;
// 	team2: string[];
// }

// interface Group {
// 	id: number;
// 	players: Player[];
// 	games: Game[];
// }

// Função para ordenar os jogadores
const orderGroupPlayers = (player: Player[]) => {
	return [...player].sort((a, b) => {
		if (b.victories !== a.victories) {
			return b.victories - a.victories; // Ordena por vitórias (decrescente)
		}
		return b.diff - a.diff; // Se vitórias forem iguais, ordena por saldo (decrescente)
	});
};

export function TournamentGroups() {
	const [openGroups, setOpenGroups] = useState<number[]>([]);

	const toggleGroup = (groupId: number) => {
		setOpenGroups((prev) =>
			prev.includes(groupId)
				? prev.filter((id) => id !== groupId)
				: [...prev, groupId],
		);
	};

	const toggleAllGroups = () => {
		setOpenGroups((prev) =>
			prev.length === groups.length ? [] : groups.map((g) => g.id),
		);
	};

	return (
		<div className="container mx-auto p-4">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-3xl font-bold">Fase de Grupos</h1>
				<Button onClick={toggleAllGroups} variant="outline" size="icon">
					<ExpandIcon className="h-4 w-4" />
					<span className="sr-only">Expandir todos os grupos</span>
				</Button>
			</div>
			<div className="space-y-6">
				{groups.map((group) => (
					<Collapsible
						key={group.id}
						open={openGroups.includes(group.id)}
						onOpenChange={() => toggleGroup(group.id)}>
						<Card className="overflow-hidden">
							<CollapsibleTrigger className="w-full">
								<CardHeader className="flex flex-row items-center justify-between">
									<CardTitle>Grupo {group.id}</CardTitle>
									{openGroups.includes(group.id) ? (
										<ChevronUp className="h-4 w-4" />
									) : (
										<ChevronDown className="h-4 w-4" />
									)}
								</CardHeader>
							</CollapsibleTrigger>
							<CollapsibleContent>
								<CardContent className="p-0">
									<div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x">
										<div className="p-4">
											<h3 className="font-semibold mb-2">Classificação</h3>
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>Jogadores</TableHead>
														<TableHead className="text-right">
															Vitórias
														</TableHead>
														<TableHead className="text-right">Saldo</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{orderGroupPlayers(group.players).map(
														(player, index) => (
															<TableRow key={index}>
																<TableCell
																	className={index < 2 ? "bg-green-100" : ""}>
																	{player.name}
																</TableCell>
																<TableCell className="text-right">
																	{player.victories}
																</TableCell>
																<TableCell className="text-right">
																	{player.diff}
																</TableCell>
															</TableRow>
														),
													)}
												</TableBody>
											</Table>
										</div>
										<div className="p-4">
											<h3 className="font-semibold mb-2">Jogos e Resultados</h3>
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead className="text-center">
															Time 1
														</TableHead>
														<TableHead className="text-center">
															Resultado
														</TableHead>
														<TableHead className="text-center">
															Time 2
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													{group.games.map((jogo) => (
														<TableRow key={jogo.id}>
															<TableCell className="text-center">
																{jogo.team1.join(" e ")}
															</TableCell>
															<TableCell className="text-center font-medium">
																{jogo.result}
															</TableCell>
															<TableCell className="text-center">
																{jogo.team2.join(" e ")}
															</TableCell>
														</TableRow>
													))}
												</TableBody>
											</Table>
										</div>
									</div>
								</CardContent>
							</CollapsibleContent>
						</Card>
					</Collapsible>
				))}
			</div>
		</div>
	);
}
