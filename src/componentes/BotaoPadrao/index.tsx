import styled from "styled-components";

const BotaoPadrao = styled.button`
    display: flex;
    background-color: transparent;
    min-width: 4rem;  
    height: 4rem;
    border: 0.2rem solid transparent;
    border-radius: 2rem;
    align-items: center;
    justify-content: center;
    font-size: var(--fonte-titulo);
    color: var(--testo-claro);
    white-space: nowrap;
    cursor: pointer;
    p {
        font-size: var(--fonte-grande);
        color: var(--detalhes-menos-claros);
    }
    &:hover {
        border-color: var(--detalhes-claros);
        color: var(--detalhes-claros);
        p {
            color: var(--detalhes-claros);
        }
    }
`

export default BotaoPadrao;