"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

export function TournamentTicket() {
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
							11º Torneio CT Denner de Futevôlei
						</h2>
						<div className="bg-blue-100 sm:w-min p-1 rounded">
							<p className="text-sm text-gray-600">Futevôlei</p>
						</div>
					</div>
				</div>
			</div>
			<div className="p-4 flex flex-col sm:flex-row justify-between items-start">
				<div className="space-y-2 w-full sm:w-auto mb-4 sm:mb-0">
					<p className="text-sm">
						<span className="font-semibold">Local:</span> Blupadel esportes de
						areia
					</p>
					<p className="text-sm">
						<span className="font-semibold">Endereço:</span> Rua 2 de Setembro,
						1111 - Itoupava Norte
					</p>
					<p className="text-sm">
						<span className="font-semibold">Município:</span> Blumenau
					</p>
					<p className="text-sm">
						<span className="font-semibold">Data:</span> 30/11/24 a partir das
						8:00 hrs
					</p>
				</div>
				<div className="flex-shrink-0 self-end sm:self-start">
					<QRCodeSVG value="https://example.com/tournament" size={100} />
				</div>
			</div>
			<div className="bg-gray-100 p-2 text-center text-sm text-gray-600">
				Modalidade: Rei da praia na fase de grupos + Eliminação simples(Sorteio
				de duplas antes da fase de eliminação)
			</div>
			<div className="p-4 border-t">
				<p className="text-sm font-semibold mb-2">Premiação:</p>
				<ul className="text-sm list-disc list-inside">
					<li>1º R$ 400,00</li>
					<li>2º R$ 200,00</li>
					<li>3º R$ 100,00</li>
				</ul>
			</div>
			<hr />
		</div>
	);
}
