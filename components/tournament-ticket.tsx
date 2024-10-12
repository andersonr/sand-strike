"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

interface TournamentInfo {
	title: string;
	category: Category;
	place: string;
	address: string;
	city: string;
	date: Date;
	time: string;
	slug: unknown;
}

export enum Category {
	FUTEVOLEI = "FUTEVÔLEI",
	VOLEI = "VOLEI",
	BEACHTENNIS = "BEACHTENNIS",
}

export function TournamentTicket({
	title,
	category,
	place,
	address,
	city,
	date,
	time,
	slug,
}: TournamentInfo) {
	const qrCodeAddress = `{basepath}/torneios/${slug}`;

	return (
		<div className="container mx-auto bg-white overflow-hidden">
			<div className="p-4 border-b">
				<div className="flex flex-col sm:flex-row">
					<div className="mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
						<Image
							src="/images/ball-soccer-ball-svgrepo-com.svg?height=80&width=80"
							alt="Tournament logo"
							width={80}
							height={80}
							className="rounded"
						/>
					</div>
					<div className="flex-grow">
						<h2 className="text-xl font-bold">
							{/* 11º Torneio CT Denner de Futevôlei */}
							{title}
						</h2>
						<div className="bg-blue-100 sm:w-min p-1 rounded">
							<p className="text-sm text-gray-600">{category?.toString()}</p>
						</div>
					</div>
				</div>
			</div>
			<div className="p-4 flex flex-col sm:flex-row justify-between items-start">
				<div className="space-y-2 w-full sm:w-auto mb-4 sm:mb-0">
					<p className="text-sm">
						<span className="font-semibold">Local:</span> {place}
					</p>
					<p className="text-sm">
						<span className="font-semibold">Endereço:</span> {address}
					</p>
					<p className="text-sm">
						<span className="font-semibold">Município:</span> {city}
					</p>
					<p className="text-sm">
						<span className="font-semibold">Data:</span>{" "}
						{Intl.DateTimeFormat("pt-BR", {
							day: "2-digit",
							month: "2-digit",
							year: "numeric",
						}).format(date)}{" "}
						a partir das {time}
					</p>
				</div>
				<div className="flex-shrink-0 self-end sm:self-start">
					<QRCodeSVG value={qrCodeAddress} size={100} />
				</div>
			</div>
			<div className="bg-gray-100 p-2 text-center text-sm text-gray-600">
				Mecânica: Fase de grupos no modelo &quot;Rei da praia&quot;(Todos contra
				todos) + Eliminação simples(Sorteio de duplas antes da fase de
				eliminação)
			</div>
			<div className="p-4 border-t">
				<p className="text-sm font-semibold mb-2">Premiação:</p>
				<ul className="text-sm list-disc list-inside">
					<li>1º Troféu</li>
					<li>2º Troféu</li>
					<li>3º Troféu</li>
					<li>4º Troféu</li>
				</ul>
			</div>
			<hr />
		</div>
	);
}
