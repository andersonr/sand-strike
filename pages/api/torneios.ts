import { generateSlug } from '@/lib/utils/text';
import { TorneioInsert } from '@/types';
import { NextApiRequest, NextApiResponse } from 'next';
import { supabaseAdmin } from '../../lib/supabaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
 
  if (req.method === 'POST') {
    
    try {      
      const { nome, data, horario, esporte, local, endereco, cidade, modelo   } = req.body;
      
      if (!nome || !data ||  !endereco || !cidade) {
        return res.status(400).json({ message: 'Nome, data, e descrição são obrigatórios' });
      }   
     
      const newTorneio: TorneioInsert = {
        nome: nome,
        data: data,
        esporte: '',
        local: local,
        cidade: cidade,
        endereco: endereco,
        horario: horario,
        slug: generateSlug(nome)      
     };

     if(esporte){
      newTorneio.esporte = esporte
     }

      if (modelo) {
        newTorneio.modelo = modelo;
      }

      if(supabaseAdmin) {
      const { data: torneio, error } = await supabaseAdmin
        .from('Torneios')
        .insert([newTorneio]);

      if (error) throw error;

      res.status(201).json({ message: 'Torneio criado com sucesso', torneio });
    }
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar torneio', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
 