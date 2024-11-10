import { generateSlug } from '@/lib/utils/text';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { TorneioInsert } from '@/types';

export interface TorneioData {
  nome: string;
  data: string;
  horario?: string;
  esporte?: string;
  local?: string;
  endereco: string;
  cidade: string;
  modelo?: string;
}

export class TorneioAdapter {
  private data: TorneioData;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    constructor(requestBody: any) {
    this.data = requestBody;
  }

  validate(): void {
    if (!this.data.nome || !this.data.data || !this.data.endereco || !this.data.cidade) {
      throw new Error('Nome, data, endereco e cidade são obrigatórios');
    }
  }

  adapt(): TorneioInsert {
    this.validate();

    const torneio: TorneioInsert = {
      nome: this.data.nome,
      data: this.data.data,
      esporte: this.data.esporte || '',
      local: this.data.local || '',
      cidade: this.data.cidade,
      endereco: this.data.endereco,
      horario: this.data.horario || '',
      slug: generateSlug(this.data.nome)
    };

    if (this.data.modelo) {
      torneio.modelo = Number.parseInt(this.data.modelo);
    }

    return torneio;
  }
}
