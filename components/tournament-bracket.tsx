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
import React from "react";

type Team = {
	name: string;
	seed: number;
};

type Match = {
	team1: Team;
	team2: Team;
	score1?: number;
	score2?: number;
	gameNumber: number;
};

type Round = Match[];

const drawData: Team[] = [
	{ name: "Ronaldinho e Edmundo", seed: 1 },
	{ name: "Romario e Djalminha", seed: 4 },
	{ name: "Rivaldo e Ronaldo", seed: 3 },
	{ name: "Alex e Luizão", seed: 2 },
	{ name: "Cicero e Diego Souza", seed: 3 },
	{ name: "Marcion e D'Alessandro", seed: 1 },
	{ name: "Ceni e Roberto Carlos", seed: 4 },
	{ name: "Renato Gaúcho e Túlio", seed: 2 },
];

const bracketData: Round[] = [
	[
		{
			team1: drawData[0],
			team2: drawData[5],
			score1: 18,
			score2: 14,
			gameNumber: 1,
		},
		{
			team1: drawData[3],
			team2: drawData[7],
			score1: 12,
			score2: 18,
			gameNumber: 2,
		},
		{
			team1: drawData[2],
			team2: drawData[4],
			score1: 16,
			score2: 13,
			gameNumber: 3,
		},
		{
			team1: drawData[6],
			team2: drawData[1],
			score1: 18,
			score2: 20,
			gameNumber: 4,
		},
	],
	[
		{
			team1: drawData[0],
			team2: drawData[7],
			score1: 18,
			score2: 20,
			gameNumber: 5,
		},
		{
			team1: drawData[4],
			team2: drawData[1],
			score1: 18,
			score2: 16,
			gameNumber: 6,
		},
	],
	[{ team1: drawData[7], team2: drawData[4], gameNumber: 7 }],
];

export function TournamentBracket() {
	const [eliminationPhaseOpen, setEliminationPhaseOpen] = React.useState(true);
	const [drawOpen, setDrawOpen] = React.useState(false); // Update 1: Changed initial state to false
	const [bracketOpen, setBracketOpen] = React.useState(true);

	//space-y-8 p-4
	return (
		<div className="mx-auto p-4">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">Fase eliminatória</h1>
				<Button
					variant="outline"
					size="icon"
					onClick={() => setEliminationPhaseOpen(!eliminationPhaseOpen)}>
					{eliminationPhaseOpen ? (
						<ExpandIcon className="h-4 w-4" />
					) : (
						<ExpandIcon className="h-4 w-4" />
					)}
					<span className="sr-only">
						{eliminationPhaseOpen ? "Recolher" : "Expandir"}
					</span>{" "}
				</Button>
			</div>

			<Collapsible
				open={eliminationPhaseOpen}
				onOpenChange={setEliminationPhaseOpen}>
				<CollapsibleContent>
					<div className="space-y-8">
						<Collapsible open={drawOpen} onOpenChange={setDrawOpen}>
							<Card>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div className="flex-grow text-left">
											<CardTitle>Sorteio de duplas</CardTitle>
										</div>
										<CollapsibleTrigger asChild>
											<Button variant="ghost" size="sm">
												{drawOpen ? (
													<ChevronUp className="h-4 w-4" />
												) : (
													<ChevronDown className="h-4 w-4" />
												)}
											</Button>
										</CollapsibleTrigger>
									</div>
								</CardHeader>
								<CollapsibleContent>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Dupla sorteada</TableHead>
													<TableHead>Jogo</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												{drawData.map((team, index) => (
													<TableRow key={index}>
														<TableCell>{team.name}</TableCell>
														<TableCell>{team.seed}</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
								</CollapsibleContent>
							</Card>
						</Collapsible>

						<Collapsible open={bracketOpen} onOpenChange={setBracketOpen}>
							<Card>
								<CardHeader>
									<div className="flex items-center justify-between">
										<div className="flex-grow text-left">
											<CardTitle>Chaveamento</CardTitle>
										</div>
										<CollapsibleTrigger asChild>
											<Button variant="ghost" size="sm">
												{bracketOpen ? (
													<ChevronUp className="h-4 w-4" />
												) : (
													<ChevronDown className="h-4 w-4" />
												)}
											</Button>
										</CollapsibleTrigger>
									</div>
								</CardHeader>
								<CollapsibleContent>
									<CardContent>
										<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
											{bracketData.map((round, roundIndex) => (
												<div
													key={roundIndex}
													className="flex flex-col justify-around gap-4">
													{round.map((match, matchIndex) => (
														<div key={matchIndex} className="mb-4">
															<Card className="w-full">
																<CardContent className="p-2">
																	<div className="text-xs font-semibold mb-1 text-muted-foreground text-center">
																		Jogo {match.gameNumber}
																	</div>
																	<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm gap-2">
																		<div className="font-semibold sm:flex-1 sm:text-left">
																			{match.team1.name}
																		</div>
																		{match.score1 !== undefined &&
																			match.score2 !== undefined && (
																				<div className="text-center whitespace-nowrap">
																					<span className="mx-2">
																						{match.score1} x {match.score2}
																					</span>
																				</div>
																			)}
																		<div className="font-semibold sm:flex-1 sm:text-right">
																			{match.team2.name}
																		</div>
																	</div>
																</CardContent>
															</Card>
														</div>
													))}
												</div>
											))}
										</div>
									</CardContent>
								</CollapsibleContent>
							</Card>
						</Collapsible>
					</div>
				</CollapsibleContent>
			</Collapsible>
		</div>
	);
}
