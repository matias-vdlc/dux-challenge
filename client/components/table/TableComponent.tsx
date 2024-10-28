import { FC, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator'
import { TableHeader } from './tableHeader'
import { Button } from 'primereact/button'
import { TableComponentProps } from './TableComponent.interface'

export const TableComponent: FC<TableComponentProps> = ({
  data,
  title,
  headerButtons = [],
  tableHeaders = [],
  rowActions = [],
  paginator,
  setPaginator,
}) => {
  const [globalFilter, setGlobalFilter] = useState<string | null>(null)

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPaginator(
      (prev: {
        first: number
        rows: number
        page: number
        pageCount: number
        totalRecords: number
      }) => ({
        ...prev,
        first: event.first,
        rows: event.rows,
        page: event.page,
      }),
    )
  }

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className='flex gap-2'>
        {rowActions?.map((action, index) => (
          <Button
            key={`id-${index}`}
            icon={action.icon}
            aria-label={action['aria-label']}
            rounded
            text
            onClick={() => action.onClick(rowData)}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className='px-4 py-3 flex flex-column  justify-content-between gap-4'
      style={{ height: '100%' }}
    >
      <div className='flex flex-column gap-2'>
        <TableHeader
          title={title}
          headerActions={headerButtons}
          onSearch={setGlobalFilter}
        />

        <DataTable
          value={data}
          dataKey='id'
          globalFilterFields={['usuario', 'estado']}
          globalFilter={globalFilter}
          className='p-datatable-sm'
          removableSort
          scrollable
          scrollHeight='600px'
        >
          {!!tableHeaders.length &&
            tableHeaders.map((th, index) => (
              <Column
                key={`id-${index}`}
                field={th.field}
                header={th.header}
                sortable={th.sortable}
                className={th.className}
              />
            ))}
          {!!rowActions.length && (
            <Column
              field='actions'
              header='Acciones'
              body={actionBodyTemplate}
              exportable={false}
            />
          )}
        </DataTable>
      </div>
      <div>
        <Paginator
          first={paginator?.first}
          rows={paginator?.rows}
          totalRecords={paginator?.totalRecords}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  )
}
