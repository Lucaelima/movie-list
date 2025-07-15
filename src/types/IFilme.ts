import type { ICategoria } from './ICategoria';

export interface IFilme {
  nome: string;
  descricao: string;
  capa: string;
  ano: number;
  classificacao: 'L' | '10' | '12' | '14' | '16' | '18';
  id: string;
  categorias: ICategoria[];
}
