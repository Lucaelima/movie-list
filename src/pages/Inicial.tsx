import MenuLateral from "../componentes/MenuLateral";
import Biblioteca from "../componentes/Biblioteca";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect } from "react";
import { carregarCategorias } from "../redux/slices/categoriasSlice";
import { carregarListas } from "../redux/slices/listasSlice";
import type { AppDispatch, RootState } from "../redux/store";
import { carregarFilmes } from "../redux/slices/filmesSlice";
import type { IFilme } from "../types/IFilme";
import type { ICategoria } from "../types/ICategoria";
import type { ILista } from "../types/ILista";
import styled from "styled-components";

const ContainerPaginaInicial = styled.div`
    display: flex;
    width: 100%;
    height: max-content;
    padding-top: 8rem;
`

const Inicial = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filmes = useSelector<RootState, IFilme[]>((state) => state.filmes.filmes);
    const categorias = useSelector<RootState, ICategoria[]>((state) => state.categorias.categorias);
    const listas = useSelector<RootState, ILista[]>((state) => state.listas.listas);

    useEffect(() => {
        dispatch(carregarFilmes());
        dispatch(carregarCategorias());
        dispatch(carregarListas());
    }, [dispatch]);

    return (
        <ContainerPaginaInicial>
            <MenuLateral listas={listas} categorias={categorias} />
            <Biblioteca filmes={filmes} listas={listas} categorias={categorias} />
        </ContainerPaginaInicial>
    )
}

export default memo(Inicial);