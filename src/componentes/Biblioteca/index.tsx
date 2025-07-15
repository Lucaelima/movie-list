import styled from "styled-components";
import { memo, useRef } from "react";
import type { IFilme } from "../../types/IFilme";
import CardFilme from "../CardFilme";
import { MdLibraryAdd } from "react-icons/md";
import CadastroFilme from "../CadastroFilme";
import type { IModal } from "../../types/IModal";
import { useLocation, useParams } from "react-router";
import type { ILista } from "../../types/ILista";
import type { ICategoria } from "../../types/ICategoria";
import type { Location } from "react-router";
import { FaEdit, FaRegWindowClose } from "react-icons/fa";
import CadastroLista from "../CadastroLista";
import ExcluirLista from "../ExcluirLista";
import BotaoPadrao from "../BotaoPadrao";

const ContainerBiblioteca = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-left: 2rem;
`

const Cabecalho = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: var(--fonte-titulo);
`

const ContainerFilmes = styled.div`
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
`

interface BibliotecaProps {
    filmes: IFilme[];
    listas: ILista[];
    categorias: ICategoria[];
}

const filtrarFilmes = (
    location: Location,
    idRota: string,
    filmes: IFilme[],
    listaFiltro?: ILista,
    categoriaFiltro?: ICategoria
) => {
    if (location.pathname.includes("/lista/") && idRota) {
        if (!listaFiltro) return [];
        return listaFiltro.filmes ?? [];
    }
    else if (location.pathname.includes("/categoria/") && idRota) {
        if (!categoriaFiltro) return [];
        return filmes.filter((filme) =>
            filme.categorias.some((categoriaFilme) => categoriaFilme.id === categoriaFiltro.id)
        );
    }
    else {
        return filmes;
    }
}

const Biblioteca = ({ filmes, listas, categorias }: BibliotecaProps) => {
    const modalFilmeRef = useRef<IModal>(null)
    const modalListaRef = useRef<IModal>(null)
    const modalExcluirRef = useRef<IModal>(null)
    const location = useLocation();
    const { idRota } = useParams<{ idRota: string }>();
    const listaFiltro = listas.find((lista) => lista.id === idRota);
    const categoriaFiltro = categorias.find((categoria) => Number(categoria.id) === Number(idRota));

    const filmesFiltrados = [
        ...filtrarFilmes(location, idRota ?? "", filmes, listaFiltro, categoriaFiltro)
    ].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );

    return (
        <ContainerBiblioteca>
            <Cabecalho>
                {location.pathname.includes("/lista/") ?
                    <h2>{listaFiltro?.nome}</h2> :
                    location.pathname.includes("/categoria/") ?
                        <h2>Categoria - {categoriaFiltro?.nome}</h2> :
                        <h2>Todos os filmes</h2>
                }
                <BotaoPadrao onClick={() => modalFilmeRef.current?.open()} title="Adicionar filme">
                    <MdLibraryAdd />
                </BotaoPadrao>
                {listaFiltro ?
                    <>
                        <BotaoPadrao onClick={() => modalListaRef.current?.open()} title="Editar lista">
                            <FaEdit />
                        </BotaoPadrao>
                        <BotaoPadrao onClick={() => modalExcluirRef.current?.open()} title="Excluir lista">
                            <FaRegWindowClose />
                        </BotaoPadrao>
                        <CadastroLista ref={modalListaRef} lista={listaFiltro} />
                        <ExcluirLista ref={modalExcluirRef} lista={listaFiltro} />
                    </> :
                    null
                }
            </Cabecalho>
            <ContainerFilmes>
                {filmesFiltrados?.map((filme: IFilme) => (
                    <CardFilme key={filme.id} filme={filme} />
                ))}
            </ContainerFilmes>
            <CadastroFilme ref={modalFilmeRef} filme={null} />
        </ContainerBiblioteca>
    );
}

export default memo(Biblioteca);