import styled from "styled-components";
import type { ICategoria } from "../../types/ICategoria";
import { memo, useRef } from "react";
import { Link, useLocation } from "react-router";
import type { IModal } from "../../types/IModal";
import CadastroLista from "../CadastroLista";
import { FaPlus } from "react-icons/fa";
import type { ILista } from "../../types/ILista";

const ContainerMenuLateral = styled.div`
    min-width: 16rem;
    min-height: 100vh;
    background-color: var(--fundo-menos-escuro);
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 0;
    top: 0;
    padding-top: 1rem;
`

const ContainerSecao = styled.div`
    width: 14rem;
    h3 {
        font-size: var(--fonte-grande);
        margin-top: 0;
    }
    ul  {
        display: flex;
        flex-direction: column;
        list-style: none;
        padding-left: 0;
        margin: 0;
        gap: 0.5rem;
    }
    button {
        background: transparent;
        display: flex;
        align-items: center;
        padding: 0;
        gap: 0.5rem;
        border: none;
        font-size: var(--fonte-media);
        color: var(--texto-claro);
        cursor: pointer;
        &:hover {
            color: var(--detalhes-claros);
        };
    }
    .link{
        text-decoration: none;
        color: var(--texto-claro);
        &:hover {
            color: var(--detalhes-claros);
        }
    }
    .linkAtual {
        color: var(--detalhes-menos-claros);
        border-bottom: 0.1rem solid var(--detalhes-menos-claros)
    }
    hr {
        border: none;
        border-top: 0.2rem solid var(--detalhes-menos-claros);
        border-radius: 3rem;
    }
`

interface MenuLateralProps {
    listas: ILista[];
    categorias: ICategoria[];
}

const MenuLateral = ({ listas, categorias }: MenuLateralProps) => {
    const modalListaRef = useRef<IModal>(null)
    const location = useLocation();
    const listasOrdenadas = [...listas].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
    const categoriasOrdenadas = [...categorias].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );

    return (
        <ContainerMenuLateral>
            <ContainerSecao>
                <Link to="/" className={`link ${location.pathname === "/" ? "linkAtual" : ""}`}>
                    Todos
                </Link>
                <hr />
            </ContainerSecao>
            <ContainerSecao>
                <h3>Listas</h3>
                <ul>
                    {listasOrdenadas.map((lista) => (
                        <li key={lista.id}>
                            <Link to={`/lista/${lista.id}`} className={`link ${location.pathname === `/lista/${lista.id}` ? "linkAtual" : ""}`}>
                                {lista.nome}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <button onClick={() => modalListaRef.current?.open()} title="Criar lista">
                            Criar nova lista
                            <FaPlus />
                        </button>
                    </li>
                </ul>
                <hr />
            </ContainerSecao>
            <ContainerSecao>
                <h3>Categorias</h3>
                <ul>
                    {categoriasOrdenadas.map((categoria) => (
                        <li key={categoria.id}>
                            <Link to={`/categoria/${categoria.id}`} className={`link ${location.pathname === `/categoria/${categoria.id}` ? "linkAtual" : ""}`}>
                                {categoria.nome}
                            </Link>
                        </li>
                    ))}
                </ul>
                <hr />
            </ContainerSecao>
            <CadastroLista ref={modalListaRef} lista={null} />
        </ContainerMenuLateral>
    )
}

export default memo(MenuLateral);