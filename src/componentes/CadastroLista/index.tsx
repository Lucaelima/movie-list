import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Modal from "../Modal"
import { adicionarNovaLista, carregarListas, editarLista } from "../../redux/slices/listasSlice";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { IFilme } from "../../types/IFilme";
import { carregarFilmes } from "../../redux/slices/filmesSlice";
import type { ILista } from "../../types/ILista";
import type { ISelectOpcao } from "../../types/ISelectOpcao";
import { estilosSelectMulti } from "../Modal/estilosSelect/estilosSelectMulti";
import Select from "react-select";
import type { IModal } from "../../types/IModal";

interface CadastroListaProps {
    lista: ILista | null;
}

const CadastroLista = forwardRef<IModal, CadastroListaProps>(({ lista }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const filmes = [...useSelector<RootState, IFilme[]>((state) => state.filmes.filmes)].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
    const opcoesFilmes: ISelectOpcao[] = [];
    const [dadosFormulario, setDadosFormulario] = useState<ILista>(
        lista ? lista : {
            nome: "",
            id: "",
            filmes: []
        });
    filmes.forEach((filme) => {
        opcoesFilmes.push({
            value: filme.id,
            label: filme.nome
        });
    });

    const dialogRef = useRef<HTMLDialogElement>(null);

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (!dadosFormulario.id) {
            dispatch(adicionarNovaLista(dadosFormulario));
        } else {
            dispatch(editarLista(dadosFormulario));
        }
        dispatch(carregarListas());
        dialogRef.current?.close();
    };

    useImperativeHandle(ref, () => (
        {
            open: () => dialogRef.current?.showModal(),
            close: () => dialogRef.current?.close(),
        }
    ));

    useEffect(() => {
        dispatch(carregarFilmes());
    }, [dispatch]);

    return (
        <Modal ref={dialogRef}>
            <form onSubmit={aoSubmeterFormulario}>
                <label htmlFor="nome">Nome da lista</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={dadosFormulario.nome}
                    placeholder="Digite o nome da lista"
                    onChange={nome => setDadosFormulario({ ...dadosFormulario, nome: nome.target.value })}
                />
                <label htmlFor="filmes">Adicionar filmes na lista</label>
                <Select
                    isMulti
                    name="filmes"
                    inputId="filmes"
                    options={opcoesFilmes}
                    placeholder="Selecione os filmes"
                    styles={estilosSelectMulti}
                    value={opcoesFilmes.filter(opcao =>
                        dadosFormulario.filmes.some(filme => filme.id === opcao.value)
                    )}
                    onChange={selecionados =>
                        setDadosFormulario(prev =>
                            prev
                                ? {
                                    ...prev,
                                    filmes: selecionados
                                        ? filmes.filter(filme =>
                                            selecionados.some(opcao => opcao.value === filme.id)
                                        )
                                        : []
                                }
                                : prev
                        )
                    }
                />
                <fieldset>
                    <button type="button" onClick={() => dialogRef.current?.close()}>
                        Cancelar
                    </button>
                    <button className="adicionar" type="submit">
                        Criar
                    </button>
                </fieldset>
            </form>
        </Modal>
    )
})

export default CadastroLista