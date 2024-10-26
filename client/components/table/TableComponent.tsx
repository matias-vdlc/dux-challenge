import { FC } from 'react'

export const TableComponent: FC<{ data: any }> = ({ data }) => {
  // TODO: remove log
  console.log(data)
  return <div>TableComponent</div>
}
