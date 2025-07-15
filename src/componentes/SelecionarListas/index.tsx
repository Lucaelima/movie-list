import { useDispatch, useSelector } from "react-redux";
import type { IModal } from "../../types/IModal";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ILista } from "../../types/ILista";
import type { IFilme } from "../../types/IFilme";
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { ISelectOpcao } from "../../types/ISelectOpcao";
import { carregarListas, editarLista } from "../../redux/slices/listasSlice";
import Modal from "../Modal";
import Select from "react-select";
import { estilosSelectMulti } from "../Modal/estilosSelect/estilosSelectMulti";

interface SelecionarListasProps {
    filme: IFilme;
}

const SelecionarListas = forwardRef<IModal, SelecionarListasProps>(({ filme }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const listas = [...useSelector<RootState, ILista[]>((state) => state.listas.listas)].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
    const opcoesListas: ISelectOpcao[] = [];
    const [listasSelecionadas, setListasSelecionadas] = useState<ISelectOpcao[]>(
        listas
            .filter(lista => lista.filmes.some(f => f.id === filme.id))
            .map(lista => ({
                value: lista.id,
                label: lista.nome
            }))
    );

    listas.forEach((lista) => {
        opcoesListas.push({
            value: lista.id,
            label: lista.nome
        });
    });

    const dialogRef = useRef<HTMLDialogElement>(null);

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        listasSelecionadas.forEach((opcao) => {
            const lista = listas.find((l) => l.id === opcao.value);
            if (lista && !lista.filmes.some(f => f.id === filme.id)) {
                const novaLista = { ...lista, filmes: [...lista.filmes, filme] };
                dispatch(editarLista(novaLista));
            }
        });

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
        dispatch(carregarListas());
    }, [dispatch]);

    return (
        <Modal ref={dialogRef}>
            <form onSubmit={aoSubmeterFormulario}>
                <label htmlFor="listas">Adicionar {filme.nome} nas listas</label>
                <Select
                    isMulti
                    name="listas"
                    inputId="listas"
                    options={opcoesListas}
                    placeholder="Selecione as listas"
                    styles={estilosSelectMulti}
                    value={listasSelecionadas}
                    onChange={(novoValor) => setListasSelecionadas(novoValor as ISelectOpcao[])}
                />
                <fieldset>
                    <button type="button" onClick={() => dialogRef.current?.close()}>
                        Cancelar
                    </button>
                    <button className="adicionar" type="submit">
                        Adicionar
                    </button>
                </fieldset>
            </form>
        </Modal>
    )
})

export default SelecionarListas