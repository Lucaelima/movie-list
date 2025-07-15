import { createGlobalStyle } from "styled-components";

const EstilosGlobais = createGlobalStyle`
    :root {
        --fundo-escuro: #000000;
        --fundo-menos-escuro: #222222;
        --detalhes-claros: #1DCD9F;
        --detalhes-menos-claros: #169976;
        --texto-claro: #ffffff;

        --fonte-principal: "Michroma", sans-serif;

        font-family: var(--fonte-principal);
        font-weight: 400;
        color: var(--texto-claro);

        --fonte-pequena: 0.5rem;
        --fonte-media: 1rem;
        --fonte-grande: 1.2rem;
        --fonte-titulo: 2.5rem;
    }
    html, body, #root{
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        background-color: var(--fundo-escuro);
        font-size: 16px;
    }
    input, textarea, button, select {
    font-family: var(--fonte-principal);
  }
`

export default EstilosGlobais;