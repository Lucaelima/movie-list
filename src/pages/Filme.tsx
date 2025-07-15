import { memo, useEffect, useRef } from "react";
import styled from "styled-components";
import { carregarFilmes } from "../redux/slices/filmesSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import type { IFilme } from "../types/IFilme";
import { useNavigate, useParams } from "react-router";
import DadosFilme from "../componentes/DadosFilme";
import BotaoPadrao from "../componentes/BotaoPadrao";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import type { IModal } from "../types/IModal";
import CadastroFilme from "../componentes/CadastroFilme";
import ExcluirFilme from "../componentes/ExcluirFilme";
import { HiInboxArrowDown } from "react-icons/hi2";
import SelecionarListas from "../componentes/SelecionarListas";

const ContainerPaginaFilme = styled.div<{ $fundo: string }>`
    background-image: url(${(props) => props.$fundo});
    background-position: center 10%;
    background-size: cover;
    width: 100%;
    height: 100%;
    padding-top: 9rem;
    position: relative;
    z-index: 1;
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.692);
        pointer-events: none;
    }
    > * {
        position: relative;
        z-index: 3;
    }
`

const ContainerBotoes = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    div {
        display: flex;
    }
`

const Filme = () => {
    const modalFilmeRef = useRef<IModal>(null)
    const modalListasRef = useRef<IModal>(null)
    const modalExcluirRef = useRef<IModal>(null)
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { idRota } = useParams<{ idRota: string }>();
    const filme = useSelector<RootState, IFilme>(
        (state) => state.filmes.filmes.find((f) => f.id === idRota) as IFilme
    );

    useEffect(() => {
        dispatch(carregarFilmes());
    }, [dispatch]);

    return (
        <ContainerPaginaFilme $fundo={filme.capa}>
            <ContainerBotoes>
                <BotaoPadrao>
                    <BsArrowReturnLeft onClick={() => navigate(-1)} title="Voltar a página" />
                </BotaoPadrao>
                <div>
                    <BotaoPadrao>
                        <FaEdit onClick={() => modalFilmeRef.current?.open()} title="Editar filme" />
                    </BotaoPadrao>
                    <BotaoPadrao>
                        <HiInboxArrowDown onClick={() => modalListasRef.current?.open()} title="Adicionar em listas" />
                    </BotaoPadrao>
                    <BotaoPadrao>
                        <FaRegWindowClose onClick={() => modalExcluirRef.current?.open()} title="Excluir filme" />
                    </BotaoPadrao>
                </div>
            </ContainerBotoes>
            {filme ? (
                <DadosFilme {...filme} />
            ) : (
                <p>Filme não encontrado.</p>
            )}
            <CadastroFilme ref={modalFilmeRef} filme={filme} />
            <SelecionarListas ref={modalListasRef} filme={filme} />
            <ExcluirFilme ref={modalExcluirRef} filme={filme} />
        </ContainerPaginaFilme>
    )
}

export default memo(Filme);