import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { IFilme } from '../../types/IFilme';
import {
  adicionarFilme,
  atualizarFilme,
  excluirFilme,
  obterFilmes,
} from '../../api';
import { v4 as uuidv4 } from 'uuid';

const initialState: { filmes: IFilme[] } = {
  filmes: [],
};

export const carregarFilmes = createAsyncThunk('filmes', async () => {
  const filmes = await obterFilmes();
  return filmes;
});

export const adicionarNovoFilme = createAsyncThunk(
  'filmes/adicionarNovoFilme',
  async (novoFilme: IFilme) => {
    const filmeAdicionado = await adicionarFilme({
      ...novoFilme,
      id: uuidv4(),
    });
    return filmeAdicionado;
  }
);

export const editarFilme = createAsyncThunk(
  'filmes/editarFilme',
  async (filmeEditado: IFilme) => {
    const filmeAtualizado = await atualizarFilme(filmeEditado);
    return filmeAtualizado;
  }
);

export const removerFilme = createAsyncThunk(
  'filmes/removerFilme',
  async (id: string) => {
    await excluirFilme(id);
    return id;
  }
);

const filmesSlice = createSlice({
  name: 'filmes/carregarFilmes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(carregarFilmes.fulfilled, (state, action) => {
      state.filmes = action.payload;
    });
    builder.addCase(adicionarNovoFilme.fulfilled, (state, action) => {
      state.filmes.push(action.payload);
    });
    builder.addCase(editarFilme.fulfilled, (state, action) => {
      const index = state.filmes.findIndex(
        (filme) => filme.id === action.payload.id
      );
      if (index !== -1) {
        state.filmes[index] = action.payload;
      }
    });
    builder.addCase(removerFilme.fulfilled, (state, action) => {
      state.filmes = state.filmes.filter(
        (filme) => filme.id !== action.payload
      );
    });
  },
});

export default filmesSlice.reducer;
