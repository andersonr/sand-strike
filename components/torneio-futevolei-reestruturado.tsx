'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, ExpandIcon } from "lucide-react"

// Dados simulados atualizados para o torneio no modelo "rei da praia"
const grupos = [
  {
    id: 1,
    jogadores: [
      { nome: 'João', vitorias: 2, saldo: 5 },
      { nome: 'Maria', vitorias: 1, saldo: 2 },
      { nome: 'Pedro', vitorias: 1, saldo: -1 },
      { nome: 'Ana', vitorias: 2, saldo: 3 },
    ],
    jogos: [
      { id: 1, dupla1: ['João', 'Maria'], resultado: '18 x 15', dupla2: ['Pedro', 'Ana'] },
      { id: 2, dupla1: ['João', 'Pedro'], resultado: '18 x 12', dupla2: ['Maria', 'Ana'] },
      { id: 3, dupla1: ['João', 'Ana'], resultado: '18 x 16', dupla2: ['Pedro', 'Maria'] },
    ],
  },
  {
    id: 2,
    jogadores: [
      { nome: 'Carlos', vitorias: 3, saldo: 7 },
      { nome: 'Beatriz', vitorias: 1, saldo: -2 },
      { nome: 'Rafael', vitorias: 0, saldo: -5 },
      { nome: 'Luísa', vitorias: 2, saldo: 4 },
    ],
    jogos: [
      { id: 4, dupla1: ['Carlos', 'Beatriz'], resultado: '18 x 14', dupla2: ['Rafael', 'Luísa'] },
      { id: 5, dupla1: ['Carlos', 'Rafael'], resultado: '18 x 17', dupla2: ['Beatriz', 'Luísa'] },
      { id: 6, dupla1: ['Carlos', 'Luísa'], resultado: '18 x 13', dupla2: ['Rafael', 'Beatriz'] },
    ],
  },
]

// Função para ordenar os jogadores
const ordenarJogadores = (jogadores) => {
  return [...jogadores].sort((a, b) => {
    if (b.vitorias !== a.vitorias) {
      return b.vitorias - a.vitorias; // Ordena por vitórias (decrescente)
    }
    return b.saldo - a.saldo; // Se vitórias forem iguais, ordena por saldo (decrescente)
  });
};

export function TorneioFutevoleiReestruturado() {
  const [openGroups, setOpenGroups] = useState<number[]>([]);

  const toggleGroup = (groupId: number) => {
    setOpenGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const toggleAllGroups = () => {
    setOpenGroups(prev =>
      prev.length === grupos.length ? [] : grupos.map(g => g.id)
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
        {grupos.map((grupo) => (
          <Collapsible
            key={grupo.id}
            open={openGroups.includes(grupo.id)}
            onOpenChange={() => toggleGroup(grupo.id)}
          >
            <Card className="overflow-hidden">
              <CollapsibleTrigger className="w-full">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Grupo {grupo.id}</CardTitle>
                  {openGroups.includes(grupo.id) ? (
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
                            <TableHead className="text-right">Vitórias</TableHead>
                            <TableHead className="text-right">Saldo</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {ordenarJogadores(grupo.jogadores).map((jogador, index) => (
                            <TableRow key={index}>
                              <TableCell>{jogador.nome}</TableCell>
                              <TableCell className="text-right">{jogador.vitorias}</TableCell>
                              <TableCell className="text-right">{jogador.saldo}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-2">Jogos e Resultados</h3>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="text-center">Dupla 1</TableHead>
                            <TableHead className="text-center">Resultado</TableHead>
                            <TableHead className="text-center">Dupla 2</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {grupo.jogos.map((jogo) => (
                            <TableRow key={jogo.id}>
                              <TableCell className="text-center">{jogo.dupla1.join(' e ')}</TableCell>
                              <TableCell className="text-center font-medium">{jogo.resultado}</TableCell>
                              <TableCell className="text-center">{jogo.dupla2.join(' e ')}</TableCell>
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
  )
}