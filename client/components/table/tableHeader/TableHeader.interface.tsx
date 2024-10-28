export type TableHeaderProps = {
  title: string
  headerActions: HeaderActionsType[]
  onSearch: (params: any) => void
}

export type HeaderActionsType = {
  label: string
  icon: string
  className: string
  onClick: () => void
}
