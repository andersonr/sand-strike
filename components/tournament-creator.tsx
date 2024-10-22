"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import HeadTitle from "@/components/ui/head-title";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useState } from "react";

export function TournamentCreator() {
	const [participants, setParticipants] = useState([""]);

	const addParticipant = () => {
		setParticipants([...participants, ""]);
	};

	const removeParticipant = (index: number) => {
		const newParticipants = participants.filter((_, i) => i !== index);
		setParticipants(newParticipants);
	};

	return (
		<Card className="w-full max-w-3xl mx-auto mt-4">
			<HeadTitle tabTitle="Criar Torneio" />
			<CardHeader>
				<CardTitle>Criar Torneio</CardTitle>
			</CardHeader>
			<CardContent>
				<form className="space-y-4">
					<div>
						<Label htmlFor="tournamentName">Nome do torneio</Label>
						<Input
							id="tournamentName"
							placeholder="Nome do Torneio"
							type="text"
						/>
					</div>

					<div className="flex space-x-4">
						<div className="flex-1">
							<Label htmlFor="category">Categoria</Label>
							<Select>
								<SelectTrigger>
									<SelectValue placeholder="Selecione a categoria" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="futevolei">Futevôlei</SelectItem>
									<SelectItem value="beachtennis">Beach tennis</SelectItem>
									<SelectItem value="volei">Vôlei</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex-1">
							<Label htmlFor="organizer">Realizado por</Label>
							<Input id="organizer" placeholder="Nome do organizador" />
						</div>
					</div>
					<hr />
					<h3 className="text-lg font-semibold mb-2">
						Local em que acontecerá o torneio
					</h3>
					<div>
						<Label htmlFor="address">Endereço</Label>
						<Input id="address" placeholder="Digite o endereço do local" />
					</div>

					<div>
						<Label htmlFor="city">Cidade</Label>
						<Input id="city" placeholder="Digite o nome da cidade" />
					</div>

					<div>
						<Label htmlFor="dateTime">Data e hora de início</Label>
						<Input id="dateTime" type="datetime-local" />
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Premiação</h3>
						{["1º", "2º", "3º"].map((place, index) => (
							<div key={index} className="flex items-center space-x-2 mb-2">
								<Label className="w-8">{place}</Label>
								<Input placeholder="Descrição do prêmio" />
							</div>
						))}
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Mecânica do torneio</h3>
						<RadioGroup defaultValue="groups">
							<div className="flex items-center space-x-2">
								<RadioGroupItem value="groups" id="groups" />
								<Label htmlFor="groups">
									Fase de grupos com 4x4 de grupos + Eliminação simples (Sorteio
									de duplas)
								</Label>
							</div>
							{/* <div className="flex items-center space-x-2">
                <RadioGroupItem value="elimination" id="elimination"  />
                <Label htmlFor="elimination">Dupla fixa desde o princípio + eliminação dupla</Label>
              </div> */}
						</RadioGroup>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Categorias</h3>
						<div className="flex space-x-2 mb-2">
							<Checkbox id="iniciante" checked={true} />
							<Label htmlFor="iniciante">Iniciante</Label>
						</div>
						<div className="flex space-x-2 mb-2">
							<Checkbox id="bronze" checked={true} />
							<Label htmlFor="bronze">Bronze</Label>
						</div>
						<div className="flex space-x-2 ">
							<Checkbox id="mista" checked={true} />
							<Label htmlFor="mista">Mista</Label>
						</div>
						<Button variant="outline" type="button" size="sm" className="mt-2">
							+ Adicionar categoria
						</Button>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2">Participantes</h3>
						{participants.map((participant, index) => (
							<div key={index} className="flex items-center space-x-2 mb-2">
								<Input
									value={participant}
									onChange={(e) => {
										const newParticipants = [...participants];
										newParticipants[index] = e.target.value;
										setParticipants(newParticipants);
									}}
									placeholder="Nome do participante"
								/>
								<Button
									variant="destructive"
									type="button"
									size="sm"
									onClick={() => removeParticipant(index)}>
									Excluir
								</Button>
							</div>
						))}
						<Button
							variant="outline"
							type="button"
							size="sm"
							onClick={addParticipant}>
							Adicionar participante
						</Button>
					</div>

					<Button type="submit" className="w-full">
						Criar Torneio
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}
