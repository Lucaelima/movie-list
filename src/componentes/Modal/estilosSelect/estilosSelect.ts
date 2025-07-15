import type { GroupBase, StylesConfig } from 'react-select';
import type { ISelectOpcao } from '../../../types/ISelectOpcao';

export const estilosSelect: StylesConfig<
  ISelectOpcao,
  false,
  GroupBase<ISelectOpcao>
> = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'var(--fundo-menos-escuro)',
    border: 'none',
    borderRadius: '0',
    color: 'var(--texto-claro)',
    fontSize: 'var(--fonte-media)',
    padding: '0.3rem',
    boxShadow: 'none',
    minHeight: '2.5rem',
  }),
  input: (provided) => ({
    ...provided,
    color: 'var(--texto-claro)',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'var(--texto-claro)',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'var(--fundo-menos-escuro)',
    color: 'var(--texto-claro)',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? 'var(--detalhes-claros)'
      : 'var(--fundo-menos-escuro)',
    color: 'var(--texto-claro)',
    cursor: 'pointer',
  }),
};
