import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { IFilme } from "../../types/IFilme";
import { carregarListas, editarLista } from "../../redux/slices/listasSlice";
import Modal from "../Modal";
import type { IModal } from "../../types/IModal";
import type { ILista } from "../../types/ILista";
import { removerFilme } from "../../redux/slices/filmesSlice";
import { useLocation, useNavigate } from "react-router";

interface ExcluirFilmeProps {
    filme: IFilme;
}

const ExcluirFilme = forwardRef<IModal, ExcluirFilmeProps>(({ filme }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation();
    const navigate = useNavigate();
    const listas = useSelector<RootState, ILista[]>((state) => state.listas.listas);

    const dialogRef = useRef<HTMLDialogElement>(null);

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();

        listas.forEach((lista) => {
            if (lista.filmes.some(f => f.id === filme.id)) {
                const novaLista = {
                    ...lista,
                    filmes: lista.filmes.filter(f => f.id !== filme.id)
                };
                dispatch(editarLista(novaLista));
            }
        });

        dispatch(removerFilme(filme.id));
        dialogRef.current?.close();
        if (location.pathname.includes("/filme/")) {
            navigate("/");
        }
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
                <fieldset className="excluir">
                    Comfirma a exclusão do filme {filme.nome}?
                    <div>
                        <button type="button" onClick={() => dialogRef.current?.close()}>
                            Não
                        </button>
                        <button className="adicionar" type="submit">
                            Sim
                        </button>
                    </div>
                </fieldset>
            </form>
        </Modal>
    )
})

export default ExcluirFilme