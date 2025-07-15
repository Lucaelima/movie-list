import styled from "styled-components";
import type { IFilme } from "../../types/IFilme";
import { Link } from "react-router";

const ContainerDadosFilme = styled.div`
    display: flex;
    max-width: 70rem;
    justify-self: center;
    gap: 1rem;
    img {
        max-width: 25vw;
        max-height: max-content;
    }
`

const Dados = styled.div`
    display: flex;
    flex-direction: column;
    h4 {
        margin-bottom: 0;
    }
`

const Classificacao = styled.div<{ $classificacao: string }>`
    display: flex;
    background-color: ${(props) =>
        props.$classificacao === "L" ? `#008000` :
            props.$classificacao === "10" ? `#006fd6` :
                props.$classificacao === "12" ? `#bdba00` :
                    props.$classificacao === "14" ? `#b37400` :
                        props.$classificacao === "16" ? `#9c0000` :
                            `#1c1c1c`
    };
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.3rem;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
`

const Categorias = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    gap: 1rem;
    .link {
        width: fit-content;
        height: fit-content;
        background-color: var(--fundo-menos-escuro);
        border-radius: 3rem;
        text-decoration: none;
        color: var(--texto-claro);
        white-space: nowrap;
        padding: 0.6rem;
    }
`

const DadosFilme = (filme: IFilme) => {
    return (
        <ContainerDadosFilme>
            <img src={filme.capa} alt={`Capa do filme ${filme.nome}`} />
            <Dados>
                <h2>{filme.nome}</h2>
                <b>{filme.ano}</b>
                <Classificacao $classificacao={filme.classificacao}><b>{filme.classificacao}</b></Classificacao>
                <Categorias>
                    {filme.categorias.map((categoria) => (
                        <Link
                            key={categoria.id}
                            to={`/categoria/${categoria.id}`}
                            className="link"
                        >
                            {categoria.nome}
                        </Link>
                    ))}
                </Categorias>
                <h4>Sinopse:</h4>
                <p>{filme.descricao}</p>
            </Dados>
        </ContainerDadosFilme>
    )
}

export default DadosFilme;