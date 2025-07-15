import { forwardRef, useImperativeHandle, useRef } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { removerLista } from "../../redux/slices/listasSlice";
import Modal from "../Modal";
import type { IModal } from "../../types/IModal";
import type { ILista } from "../../types/ILista";
import { useNavigate } from "react-router";

interface ExcluirListaProps {
    lista: ILista;
}

const ExcluirLista = forwardRef<IModal, ExcluirListaProps>(({ lista }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const dialogRef = useRef<HTMLDialogElement>(null);

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        dispatch(removerLista(lista.id));
        dialogRef.current?.close();
        navigate("/");
    };

    useImperativeHandle(ref, () => (
        {
            open: () => dialogRef.current?.showModal(),
            close: () => dialogRef.current?.close(),
        }
    ));

    return (
        <Modal ref={dialogRef}>
            <form onSubmit={aoSubmeterFormulario}>
                <fieldset className="excluir">
                    Comfirma a exclusão da lista {lista.nome}?
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

export default ExcluirLista