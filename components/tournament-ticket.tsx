"use client";

import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";

export function TournamentTicket() {
	return (
		<div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
			<div className="p-4 border-b">
				<div className="flex flex-col sm:flex-row">
					<div className="mb-4 sm:mb-0 sm:mr-4 flex-shrink-0">
						<Image
							src="/placeholder.svg?height=100&width=100"
							alt="Tournament logo"
							width={100}
							height={100}
							className="rounded"
						/>
					</div>
					<div className="flex-grow">
						<h2 className="text-xl font-bold">
							11º Torneio CT Denner de Futevôlei
						</h2>
						<p className="text-sm text-gray-600">Esportivo</p>
					</div>
				</div>
			</div>
			<div className="p-4 flex flex-col sm:flex-row justify-between items-start">
				<div className="space-y-2 w-full sm:w-auto mb-4 sm:mb-0">
					<p className="text-sm">
						<span className="font-semibold">Local:</span> Quadra esportiva
					</p>
					<p className="text-sm">
						<span className="font-semibold">Rua:</span> Rua 2, 1111 - Itapema
						Norte
					</p>
					<p className="text-sm">
						<span className="font-semibold">Município:</span> Itapema
					</p>
					<p className="text-sm">
						<span className="font-semibold">Data:</span> 10/11/24 a partir das
						8:00 hrs
					</p>
				</div>
				<div className="flex-shrink-0 self-end sm:self-start">
					<QRCodeSVG value="https://example.com/tournament" size={128} />
				</div>
			</div>
			<div className="bg-gray-100 p-2 text-center text-sm text-gray-600">
				Modalidade: Dupla de praia em fase de grupos + Eliminação
				simples(Corrida de duplas)
			</div>
			<div className="p-4 border-t">
				<p className="text-sm font-semibold mb-2">Premiação:</p>
				<ul className="text-sm list-disc list-inside">
					<li>1º R$ 400,00</li>
					<li>2º R$ 200,00</li>
					<li>3º R$ 100,00</li>
				</ul>
			</div>
		</div>
	);
}
