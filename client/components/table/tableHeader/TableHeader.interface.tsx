export type TableHeaderProps = {
  header: string
  headerActions: HeaderActionsType[]
  onSearch: (value: string) => void
}

export type HeaderActionsType = {
  label: string
  icon: string
  className: string
  onClick: () => void
}
