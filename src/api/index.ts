import axios from 'axios';
import type { IFilme } from '../types/IFilme';
import type { ICategoria } from '../types/ICategoria';
import type { ILista } from '../types/ILista';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

export const obterFilmes = async (): Promise<IFilme[]> => {
  const { data } = await api.get<IFilme[]>('/filmes');
  return data;
};

export const adicionarFilme = async (filme: IFilme): Promise<IFilme> => {
  const { data } = await api.post<IFilme>('/filmes', filme);
  return data;
};

export const atualizarFilme = async (filme: IFilme): Promise<IFilme> => {
  const { data } = await api.put<IFilme>(`/filmes/${filme.id}`, filme);
  return data;
};

export const excluirFilme = async (id: string) => {
  await api.delete(`/filmes/${id}`);
  return id;
};

export const obterCategorias = async (): Promise<ICategoria[]> => {
  const { data } = await api.get<ICategoria[]>('/categorias');
  return data;
};

export const obterListas = async (): Promise<ILista[]> => {
  const { data } = await api.get<ILista[]>('/listas');
  return data;
};

export const adicionarLista = async (lista: ILista): Promise<ILista> => {
  const { data } = await api.post<ILista>('/listas', lista);
  return data;
};

export const atualizarLista = async (lista: ILista): Promise<ILista> => {
  const { data } = await api.put<ILista>(`/listas/${lista.id}`, lista);
  return data;
};

export const excluirLista = async (id: string) => {
  await api.delete(`/listas/${id}`);
  return id;
};
