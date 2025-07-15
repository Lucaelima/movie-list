import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import type { IFilme } from "../../types/IFilme";
import Select, { } from "react-select";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import type { ICategoria } from "../../types/ICategoria";
import { carregarCategorias } from "../../redux/slices/categoriasSlice";
import { adicionarNovoFilme, carregarFilmes, editarFilme } from "../../redux/slices/filmesSlice";
import type { ISelectOpcao } from "../../types/ISelectOpcao";
import Modal from "../Modal";
import { estilosSelect } from "../Modal/estilosSelect/estilosSelect";
import { estilosSelectMulti } from "../Modal/estilosSelect/estilosSelectMulti";
import type { IModal } from "../../types/IModal";

interface CadastroFilmeProps {
    filme: IFilme | null;
}

const resetarForm = (): IFilme => {
    const anoAtual = new Date().getFullYear();
    return {
        nome: "",
        descricao: "",
        capa: "",
        ano: anoAtual,
        classificacao: "L",
        id: "",
        categorias: []
    };
}

const CadastroFilme = forwardRef<IModal, CadastroFilmeProps>(({ filme }, ref) => {
    const dispatch = useDispatch<AppDispatch>();
    const categorias = [...useSelector<RootState, ICategoria[]>((state) => state.categorias.categorias)].sort((a, b) =>
        a.nome.localeCompare(b.nome)
    );
    const anoAtual = new Date().getFullYear();
    const opcoesAnos: ISelectOpcao[] = [];
    const opcoesCategorias: ISelectOpcao[] = [];
    const opcoesClassificacoes: ISelectOpcao[] = [
        { value: 'L', label: 'Livre' },
        { value: '10', label: '10 anos' },
        { value: '12', label: '12 anos' },
        { value: '14', label: '14 anos' },
        { value: '16', label: '16 anos' },
        { value: '18', label: '18 anos' },
    ];
    const [dadosFormulario, setDadosFormulario] = useState<IFilme>(
        filme ? filme :
            {
                nome: "",
                descricao: "",
                capa: "",
                ano: anoAtual,
                classificacao: "L",
                id: "",
                categorias: []
            }
    );

    const dialogRef = useRef<HTMLDialogElement>(null);

    const aoSubmeterFormulario = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        if (!dadosFormulario.id) {
            dispatch(adicionarNovoFilme(dadosFormulario));
        } else {
            dispatch(editarFilme(dadosFormulario));
        }
        setDadosFormulario(resetarForm);
        dispatch(carregarFilmes());
        dialogRef.current?.close();
    };

    for (let i = anoAtual; i >= 1888; i--) {
        opcoesAnos.push({ value: i, label: i.toString() });
    };

    categorias.forEach((categoria) => {
        opcoesCategorias.push({
            value: categoria.id,
            label: categoria.nome
        });
    });

    useImperativeHandle(ref, () => (
        {
            open: () => dialogRef.current?.showModal(),
            close: () => dialogRef.current?.close(),
        }
    ));

    useEffect(() => {
        dispatch(carregarCategorias());
    }, [dispatch]);

    return (
        <Modal ref={dialogRef}>
            <form onSubmit={aoSubmeterFormulario}>
                <label htmlFor="nome">Nome do filme</label>
                <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={dadosFormulario.nome}
                    placeholder="Digite o nome do filme"
                    onChange={nome => setDadosFormulario({ ...dadosFormulario, nome: nome.target.value })}
                />
                <label htmlFor="descricao">Descrição do filme</label>
                <textarea
                    name="descricao"
                    id="descricao"
                    value={dadosFormulario.descricao}
                    placeholder="Digite uma descrição do filme"
                    rows={4}
                    onChange={descricao => setDadosFormulario({ ...dadosFormulario, descricao: descricao.target.value })}
                />
                <label htmlFor="imagem">Link para a capa do filme</label>
                <input
                    type="url"
                    name="imagem"
                    id="imagem"
                    value={dadosFormulario.capa}
                    placeholder="Digite a url da imagem"
                    onChange={capa => setDadosFormulario({ ...dadosFormulario, capa: capa.target.value })}
                />
                <label htmlFor="classificacao">Classificação do filme</label>
                <Select
                    isMulti={false}
                    name="classificacao"
                    inputId="classificacao"
                    options={opcoesClassificacoes}
                    value={opcoesClassificacoes.find(opcao => opcao.value === dadosFormulario.classificacao) || null}
                    placeholder="Selecione o classificacao"
                    styles={estilosSelect}
                    onChange={classificacao =>
                        setDadosFormulario({ ...dadosFormulario, classificacao: classificacao?.value as "L" | "10" | "14" | "16" | "18" ?? dadosFormulario.classificacao })
                    }
                    isClearable
                />
                <label htmlFor="ano">Ano de lançamento do filme</label>
                <Select
                    isMulti={false}
                    name="ano"
                    inputId="ano"
                    options={opcoesAnos}
                    value={opcoesAnos.find(opcao => opcao.value === dadosFormulario.ano) || null}
                    placeholder="Selecione o ano"
                    styles={estilosSelect}
                    onChange={ano =>
                        setDadosFormulario({ ...dadosFormulario, ano: ano ? Number(ano.value) : anoAtual })
                    }
                    isClearable
                />
                <label htmlFor="categorias">Categorias</label>
                <Select
                    isMulti
                    name="categorias"
                    inputId="categorias"
                    options={opcoesCategorias}
                    placeholder="Selecione as categorias"
                    styles={estilosSelectMulti}
                    menuPlacement="top"
                    value={opcoesCategorias.filter(opcao =>
                        dadosFormulario.categorias.some(categoria => categoria.id === opcao.value)
                    )}
                    onChange={selecionadas =>
                        setDadosFormulario(prev =>
                            prev
                                ? {
                                    ...prev,
                                    categorias: selecionadas
                                        ? categorias.filter(categoria =>
                                            selecionadas.some(opcao => opcao.value === categoria.id)
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
                        Adicionar
                    </button>
                </fieldset>
            </form>
        </Modal>
    )
})

export default CadastroFilme;