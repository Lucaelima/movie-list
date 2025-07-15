import styled from "styled-components";
import type { IFilme } from "../../types/IFilme";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { carregarCategorias } from "../../redux/slices/categoriasSlice";
import type { ICategoria } from "../../types/ICategoria";
import { FaEdit } from "react-icons/fa";
import type { IModal } from "../../types/IModal";
import CadastroFilme from "../CadastroFilme";
import SelecionarListas from "../SelecionarListas";
import ExcluirFilme from "../ExcluirFilme";
import { useNavigate } from "react-router";

const ContainerCardFilme = styled.div`
    position: relative;
`

const BotaoEditar = styled.button`
    background: transparent;
    border: none;
    padding: 0.3rem;
    color: var(--texto-claro);
    font-size: var(--fonte-media);
    position: absolute;
    top: -10;
    right: 0;
    cursor: pointer;
    &:hover {
        color: var(--detalhes-claros);
    }
    &:focus {
        color: var(--detalhes-menos-claros);
    }
`

const ListaEditar = styled.ul<{ $listaAberta: boolean }>`
    background-color: var(--detalhes-menos-claros);
    width: 10rem;
    display: ${(props) => props.$listaAberta ? "flex" : "none"};
    border-radius: 0.5rem;
    flex-direction: column;
    align-items: center;
    position: absolute;
    right: 0;
    top: 3%;
    gap: 0;
    padding: 0;
    transition: display 0.3s ease;
    transition-delay: 0.5s;
    list-style: none;
    overflow: hidden;
    button {
        background: transparent;
        width: 100vw;
        border: none;
        padding: 0.3rem;
        color: var(--texto-claro);
        &:hover {
            background-color: var(--detalhes-claros);
        }
    }
`

const Filme = styled.div<{ $pesquisa?: boolean | null }>`
    display: grid;
    border-radius: 1rem;
    overflow: hidden;
    cursor: pointer;
    img {
        width: 100%;
        height: 100%;
        object-fit: contain;
        grid-area: capa;
    }
    h3 {
        justify-self: center;
        font-size: var(--fonte-media);
        margin: 0.1rem 0 0.4rem;
        text-align: center;
        text-overflow: ellipsis;
        grid-area: titulo;
    }
    ${props => props.$pesquisa ?
        `
            width: max-contet;
            padding: 0.7rem;
            grid-template-rows: auto auto auto;
            grid-template-columns: 5rem auto;
            grid-template-areas: 
                "capa titulo"
                "capa categorias"
                "capa .";
            &:hover {
                background-color: var(--detalhes-claros);
            }
        `:
        `
            width: 13rem;
            padding: 0.4rem 0.2rem;
            grid-template-rows: 1rem 15rem auto auto;
            grid-template-columns: 1fr 10rem  1fr;
            grid-template-areas: 
                ". . ."
                ". capa ."
                "titulo titulo titulo"
                "categorias categorias categorias";
            &:hover {
                background-color: var(--fundo-menos-escuro);
            }
            h3 {
                max-width: 13ch;
                white-space: nowrap;
                overflow: hidden;
            }
        `
    }
`

const Categorias = styled.div` 
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.1rem;
    grid-area: categorias;
    a{
        background-color: var(--detalhes-menos-claros);
        border: none;
        border-radius: 2rem;
        color: var(--texto-claro);
        font-size: var(--fonte-pequena);
        text-decoration: none;
        padding: 0.3rem;
        white-space: nowrap;
    }
`

interface CardFilmeProps {
    filme: IFilme;
    pesquisa?: boolean | null;
}

const CardFilme = ({ filme, pesquisa }: CardFilmeProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const categorias = [...useSelector<RootState, ICategoria[]>((state) => state.categorias.categorias)].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
    const modalFilmeRef = useRef<IModal>(null)
    const modalListasRef = useRef<IModal>(null)
    const modalExcluirRef = useRef<IModal>(null)
    const navigate = useNavigate();
    const [listaAberta, setListaAberta] = useState(false);

    const categoriasDoFilme = categorias.filter((categoria: ICategoria) => {
        return filme.categorias.map((categoriaFilme: ICategoria | number) => typeof categoriaFilme === 'object' ? categoriaFilme.id : categoriaFilme).includes(categoria.id);
    });

    useEffect(() => {
        dispatch(carregarCategorias());
    }, [dispatch]);

    return (
        <ContainerCardFilme>
            {!pesquisa ?
                <>
                    <BotaoEditar onClick={() => setListaAberta(true)} onBlur={() => setListaAberta(false)}>
                        <FaEdit />
                    </ BotaoEditar>
                    <ListaEditar $listaAberta={listaAberta} onMouseDown={e => e.preventDefault()}>
                        <li>
                            <button onClick={() => modalListasRef.current?.open()}>
                                Adicionar em listas
                            </button>
                        </li>
                        <li>
                            <button onClick={() => modalFilmeRef.current?.open()}>
                                Editar filme
                            </button>
                        </li>
                        <li>
                            <button onClick={() => modalExcluirRef.current?.open()}>
                                Excluir
                            </button>
                        </li>
                    </ListaEditar>
                </> :
                null
            }
            <Filme $pesquisa={pesquisa} onClick={() => navigate(`/filme/${filme.id}`)}>
                <img src={filme.capa} alt={filme.nome} />
                <h3>{filme.nome}</h3>
                <Categorias>
                    {categoriasDoFilme.slice(0, pesquisa ? 10 : 3).map((categoria: ICategoria) => (
                        <a key={categoria.id} href="#">
                            {categoria.nome}
                        </a>
                    ))}
                </Categorias>
            </Filme>
            <CadastroFilme ref={modalFilmeRef} filme={filme} />
            <SelecionarListas ref={modalListasRef} filme={filme} />
            <ExcluirFilme ref={modalExcluirRef} filme={filme} />
        </ContainerCardFilme>
    )
}

export default memo(CardFilme);