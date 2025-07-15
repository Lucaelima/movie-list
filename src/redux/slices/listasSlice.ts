import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ILista } from '../../types/ILista';
import {
  adicionarLista,
  atualizarLista,
  excluirLista,
  obterListas,
} from '../../api';
import { v4 as uuidv4 } from 'uuid';
import { editarFilme } from './filmesSlice';

const initialState: { listas: ILista[] } = {
  listas: [],
};

export const carregarListas = createAsyncThunk('listas', async () => {
  const listas = await obterListas();
  return listas;
});

export const adicionarNovaLista = createAsyncThunk(
  'listas/adicionarNovoLista',
  async (novaLista: ILista) => {
    const listaAdicionada = await adicionarLista({
      ...novaLista,
      id: uuidv4(),
    });
    return listaAdicionada;
  }
);

export const editarLista = createAsyncThunk(
  'listas/editarLista',
  async (listaEditada: ILista) => {
    const listaAtualizada = await atualizarLista(listaEditada);
    return listaAtualizada;
  }
);

export const removerLista = createAsyncThunk(
  'listas/removerLista',
  async (id: string) => {
    await excluirLista(id);
    return id;
  }
);

const listasSlice = createSlice({
  name: 'listas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(carregarListas.fulfilled, (state, action) => {
      state.listas = action.payload;
    });
    builder.addCase(adicionarNovaLista.fulfilled, (state, action) => {
      state.listas.push(action.payload);
    });
    builder.addCase(editarLista.fulfilled, (state, action) => {
      const index = state.listas.findIndex(
        (lista) => lista.id === action.payload.id
      );
      if (index !== -1) {
        state.listas[index] = action.payload;
      }
    });
    builder.addCase(editarFilme.fulfilled, (state, action) => {
      state.listas.forEach((lista) => {
        lista.filmes = lista.filmes.map((filme) =>
          filme.id === action.payload.id ? action.payload : filme
        );
      });
    });
    builder.addCase(removerLista.fulfilled, (state, action) => {
      state.listas = state.listas.filter(
        (lista) => lista.id !== action.payload
      );
    });
  },
});

export default listasSlice.reducer;
