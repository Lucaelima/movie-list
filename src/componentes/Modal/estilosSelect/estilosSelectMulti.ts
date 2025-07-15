import type { GroupBase, StylesConfig } from 'react-select';
import type { ISelectOpcao } from '../../../types/ISelectOpcao';

export const estilosSelectMulti: StylesConfig<
  ISelectOpcao,
  true,
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
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: 'var(--detalhes-menos-claros)',
    color: 'var(--texto-claro)',
    borderRadius: '2rem',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    color: 'var(--texto-claro)',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    backgroundColor: 'transparent',
    color: 'var(--texto-claro)',
    borderRadius: '50%',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'var(--detalhes-claros)',
      color: '#fff',
    },
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
