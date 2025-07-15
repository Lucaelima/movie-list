import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ICategoria } from '../../types/ICategoria';
import { obterCategorias } from '../../api';

const initialState: { categorias: ICategoria[] } = {
  categorias: [],
};

export const carregarCategorias = createAsyncThunk('categorias', async () => {
  const categorias = await obterCategorias();
  return categorias;
});

const categoriasSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(carregarCategorias.fulfilled, (state, action) => {
      state.categorias = action.payload;
    });
  },
});

export default categoriasSlice.reducer;
