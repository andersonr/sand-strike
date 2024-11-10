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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export function TournamentAdmView() {
	const [isGroupPhaseOpen, setIsGroupPhaseOpen] = useState(true);
	const [isKnockoutPhaseOpen, setIsKnockoutPhaseOpen] = useState(true);

	return (
		<div className="w-full p-4">
			<Card className="mb-6">
				<CardHeader>
					<CardTitle>11º Torneio CT Denner de Futevôlei</CardTitle>
				</CardHeader>
				<CardContent>
					<Tabs defaultValue="principal" className="w-full">
						<TabsList className="mb-4">
							<TabsTrigger value="principal">Iniciante</TabsTrigger>
							<TabsTrigger value="bronze">Bronze</TabsTrigger>
							<TabsTrigger value="mista">Mista</TabsTrigger>
						</TabsList>

						<div className="flex gap-2 mb-6">
							<Button variant="outline">Sortear grupos</Button>
							<Button variant="outline">Iniciar fase de grupos</Button>
							<Button variant="outline">Encerrar fase de grupos</Button>
							<Button variant="outline">
								Sortear duplas da fase eliminatória
							</Button>
							<Button variant="outline">Iniciar mata-mata</Button>
						</div>

						<TabsContent value="principal">
							<div className="space-y-6">
								<Collapsible
									open={isGroupPhaseOpen}
									onOpenChange={setIsGroupPhaseOpen}>
									<Card>
										<CardHeader>
											<CollapsibleTrigger asChild>
												<CardTitle className="text-sm flex items-center justify-between cursor-pointer">
													Fase de grupos - Participantes
													{isGroupPhaseOpen ? (
														<ChevronUpIcon />
													) : (
														<ChevronDownIcon />
													)}
												</CardTitle>
											</CollapsibleTrigger>
										</CardHeader>
										<CollapsibleContent>
											<CardContent>
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead className="w-[50%]">
																Participantes
															</TableHead>
															<TableHead>Grupo</TableHead>
															<TableHead>Vitórias</TableHead>
															<TableHead>Saldo</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{[
															"Ronaldinho",
															"Ronaldo",
															"Rivaldo",
															"Romário",
														].map((name) => (
															<TableRow key={name}>
																<TableCell>{name}</TableCell>
																<TableCell>1</TableCell>
																<TableCell>0</TableCell>
																<TableCell>0</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</CardContent>
										</CollapsibleContent>
									</Card>
								</Collapsible>

								<Collapsible
									open={isKnockoutPhaseOpen}
									onOpenChange={setIsKnockoutPhaseOpen}>
									<Card>
										<CardHeader>
											<CollapsibleTrigger asChild>
												<CardTitle className="text-sm flex items-center justify-between cursor-pointer">
													Sorteio de duplas - Mata-Mata
													{isKnockoutPhaseOpen ? (
														<ChevronUpIcon />
													) : (
														<ChevronDownIcon />
													)}
												</CardTitle>
											</CollapsibleTrigger>
										</CardHeader>
										<CollapsibleContent>
											<CardContent>
												<Table>
													<TableHeader>
														<TableRow>
															<TableHead>Dupla</TableHead>
															<TableHead>Jogo</TableHead>
														</TableRow>
													</TableHeader>
													<TableBody>
														{[
															{ teams: "Ronaldinho x Romário", phase: "1" },
															{ teams: "Ronaldo x Rivaldo", phase: "1" },
															{ teams: "Rivaldo x Ronaldo", phase: "2" },
															{ teams: "Diego Costa x Zico", phase: "2" },
														].map((match, index) => (
															<TableRow key={index}>
																<TableCell>{match.teams}</TableCell>
																<TableCell>{match.phase}</TableCell>
															</TableRow>
														))}
													</TableBody>
												</Table>
											</CardContent>
										</CollapsibleContent>
									</Card>
								</Collapsible>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	);
}
