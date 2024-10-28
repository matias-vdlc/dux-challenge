export const tableHeaders = [
  {
    field: 'id',
    header: 'ID',
    className: 'text-sm line-height-1 text-color-secondary capitalize',
  },
  {
    field: 'usuario',
    header: 'Usuario',
    sortable: true,
    className: 'text-sm text-primary font-bold underline line-height-1',
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
    className: 'text-sm line-height-1 text-color-secondary capitalize',
  },
]

export const status = [
  { status: 'Activo', value: 'ACTIVO' },
  { status: 'Inactivo', value: 'INACTIVO' },
]
