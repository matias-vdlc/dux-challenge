import { colors } from '../../styles/colors'

export const tableHeaders = [
  {
    field: 'id',
    header: 'id',
    sortable: true,
    className: 'text-sm line-height-1 text-color-secondary',
  },
  {
    field: 'usuario',
    header: 'Usuario',
    sortable: true,
    className: 'text-sm line-height-1 font-bold underline ',
    style: {
      color: colors.PRIMARY,
    },
  },
  {
    field: 'estado',
    header: 'Estado',
    sortable: true,
    className: 'text-sm line-height-1 text-color-secondary capitalize',
  },
  {
    field: 'sector',
    header: 'Sector',
    sortable: true,
    className: 'text-sm line-height-1 text-color-secondary capitalize',
  },
]

export const status = [
  { estado: 'Activo', value: 'ACTIVO' },
  { estado: 'Inactivo', value: 'INACTIVO' },
]

export const paginatorDefaulState = {
  first: 0,
  rows: 10,
  page: 1,
  pageCount: 0,
  totalRecords: 100,
}
