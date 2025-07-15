import { configureStore } from '@reduxjs/toolkit';
import filmesReducer from './slices/filmesSlice';
import categoriasReducer from './slices/categoriasSlice';
import listasReducer from './slices/listasSlice';

export const store = configureStore({
  reducer: {
    filmes: filmesReducer,
    categorias: categoriasReducer,
    listas: listasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
