import styled from "styled-components";
import { IoSearchOutline, IoDiceOutline } from "react-icons/io5";
import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { carregarFilmes } from "../../redux/slices/filmesSlice";
import type { IFilme } from "../../types/IFilme";
import CardFilme from "../CardFilme";
import { useLocation, useNavigate } from "react-router";
import BotaoPadrao from "../BotaoPadrao";

const ContainerCabecalho = styled.div`
    width: 100%;
    height: 8rem;
    background-color: var(--fundo-menos-escuro);
    border-bottom: 0.2rem solid var(--detalhes-menos-claros);
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: row;
    position: fixed;
    gap: 2rem;
    left: 0;
    top: 0;
    z-index: 4;
    h1 {
        font-size: var(--fonte-titulo);
        cursor: pointer;
    }
`

const ContainerBarraPesquisa = styled.div<{ $focusPesquisa: boolean }>`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
        width: 30rem;
        height: 4rem;
        background-color: var(--detalhes-menos-claros);
        border: none;
        border-radius: 3rem;
        padding: 0 1.5rem 0 4rem;
        color: var(--texto-claro);
        font-size: var(--fonte-grande);
        &::placeholder {
            color: var(--texto-claro);
            opacity: 1;
        }
        &:focus {
            outline: 0.2rem solid var(--detalhes-claros);
            outline-offset: 0.1rem;
        }
    }
    ul {
        display: flex;
        width: 30rem;
        max-height: 80vh;
        background: var(--fundo-menos-escuro);
        border: 0.2rem solid var(--detalhes-menos-claros);
        padding: 0.5rem;
        gap: 0.5rem;
        position: absolute;
        top: 3.5rem;
        list-style: none;
        overflow: auto;
        z-index: 10;
        flex-direction: column;
        opacity: 0;
        pointer-events: none;
        transform: translateY(-10%);
        transition: opacity 0.5s, transform 0.5s;
    }
    ${(props) => props.$focusPesquisa ?
        `
        ul {
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
        ` :
        null
    }
`

const IconePesquisa = styled(IoSearchOutline)`
    position: absolute;
    left: 1.5rem;
    font-size: var(--fonte-grande);
`

const Cabecalho = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filmes = [...useSelector<RootState, IFilme[]>((state) => state.filmes.filmes)].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement>(null);

    const [focusPesquisa, setFocusPesquisa] = useState(false);
    const [textoPesquisa, setTextoPesquisa] = useState("");

    useEffect(() => {
        dispatch(carregarFilmes());
    }, [dispatch]);

    useEffect(() => {
        inputRef.current?.blur();
    }, [location.pathname]);

    return (
        <ContainerCabecalho>
            <h1 onClick={() => navigate("/")}>MovieList</h1>
            <ContainerBarraPesquisa $focusPesquisa={focusPesquisa}>
                <IconePesquisa />
                <input
                    ref={inputRef}
                    type="text"
                    id="pesquisa"
                    placeholder='Pesquisar por nome do filme'
                    value={textoPesquisa}
                    onChange={e => setTextoPesquisa(e.target.value)}
                    onFocus={() => setFocusPesquisa(true)}
                    onBlur={() => setFocusPesquisa(false)}
                />
                <ul onMouseDown={e => e.preventDefault()}>
                    {filmes
                        .filter(filme =>
                            filme.nome.toLowerCase().includes(textoPesquisa.toLowerCase())
                        )
                        .map(filme => (
                            <li key={filme.id}>
                                <CardFilme key={filme.id} filme={filme} pesquisa />
                            </li>
                        ))
                    }
                </ul>
            </ContainerBarraPesquisa>
            <BotaoPadrao
                onClick={() => {
                    if (filmes.length > 0) {
                        const randomIndex = Math.floor(Math.random() * filmes.length);
                        navigate(`/filme/${filmes[randomIndex].id}`);
                    }
                }}
                title="Página de um filme aleatório"
            >
                <p>
                    Aleatório
                    <IoDiceOutline />
                </p>
            </BotaoPadrao>
        </ContainerCabecalho>
    )
}

export default memo(Cabecalho);