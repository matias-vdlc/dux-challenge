export type TableHeaders = {
  field: string
  header: string
  sortable?: boolean
  className: string
  style?: Record<string, any>
}

export type HeaderButtons = {
  label: string
  icon: string
  className: string
  onClick: () => void
}

export type RowActions = {
  'aria-label': string
  icon: string
  className: string
  onClick: (rowData: any) => void
}

export type Page = {
  first: number
  rows: number
  page: number
  pageCount: number
  totalRecords: number
}

export type TableComponentProps = {
  data: Record<string, any>[]
  title: string
  tableHeaders: TableHeaders[]
  headerButtons: HeaderButtons[]
  rowActions?: RowActions[]
  paginator: Page
  setPaginator: (event: any) => void
  isLoading?: boolean
  handleSearch: (params: any) => void
  handleUpdateData: (params: any) => void
}
