import type { IFilme } from './IFilme';

export interface ILista {
  nome: string;
  id: string;
  filmes: IFilme[];
}
