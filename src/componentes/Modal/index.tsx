import styled from "styled-components";

const Modal = styled.dialog`
    @keyframes abrindo {
        0% {
            transform: scale(0, 0);
        }
        50% {
            transform: scale(1, 0.01);
        }
        100% {
            transform: scale(1, 1);
        }
    }
    min-width: 40vw;
    background-color: var(--fundo-escuro);
    border: 0.2rem solid var(--detalhes-menos-claros);
    padding: 2rem;
    color: var(--texto-claro);
    z-index: 1;
    overflow: visible;
    animation: abrindo 0.7s ease-out forwards;
    form {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        font-size: var(--fonte-media);
        input, textarea {
            background-color: var(--fundo-menos-escuro);
            border: none;
            color: var(--texto-claro);
            font-size: var(--fonte-media);
            max-width: 100%;
            padding: 0.3rem;
            height: 2.5rem;
            &::placeholder {
            color: var(--texto-claro);
            opacity: 0.4;
            }
            &:focus {
                outline: 0.1rem solid var(--detalhes-claros);
                outline-offset: 0.1rem;
            }
        }
        fieldset {
            border: none;
            text-align: end;
            margin-top: 1rem;
            padding: 0;
            &.excluir {
                display: flex;
                text-align: center;
                flex-direction: column;
                margin-top: 0;
                gap: 1rem;
            }
            button {
                background-color: var(--fundo-menos-escuro);
                border: none;
                color: var(--texto-claro);
                font-size: var(--fonte-media);
                padding: 0.5rem;
                &.adicionar {
                    background-color: var(--detalhes-menos-claros);
                    margin-left: 1rem;
                }
            }
        }
    }
    &::backdrop {
    background-color: rgba(245, 245, 245, 0.5);
    }
`

export default Modal;