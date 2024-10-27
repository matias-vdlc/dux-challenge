import { FC, useState } from 'react'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

import { TableHeaderProps, HeaderActionsType } from './TableHeader.interface'
import { Dropdown } from 'primereact/dropdown'

const status = [
  { status: 'Activo', value: 'ACTIVO' },
  { status: 'Inactivo', value: 'INACTIVO' },
]

export const TableHeader: FC<TableHeaderProps> = ({
  header,
  headerActions = [],
  onSearch = () => {},
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [statusValue, setStatusValue] = useState('')

  const handleInputChange = (value: string) => {
    // TODO: add input validation and debounce
    setSearchValue(value)
    onSearch(value)
  }

  const handleDropdownChange = (value: string) => {
    setStatusValue(value)
    onSearch(value)
  }

  const handleClearFilters = () => {
    setSearchValue('')
    setStatusValue('')
    onSearch('')
  }

  return (
    <div>
      <div className='flex align-items-center justify-content-between mb-4'>
        <div className='text-3xl font-bold'>{header}</div>
        {!!headerActions.length &&
          headerActions.map((action: HeaderActionsType) => (
            <Button
              key={action.label}
              label={action.label}
              icon={action.icon}
              className={action.className}
              onClick={action.onClick}
            />
          ))}
      </div>
      <div className='flex justify-content-between w-full gap-2'>
        <div className='flex gap-2 w-full'>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-search' />
            <InputText
              placeholder='Buscar'
              className='w-full border-round-md'
              onInput={(e) =>
                handleInputChange((e.target as HTMLInputElement).value)
              }
              value={searchValue}
            />
          </IconField>
          <Dropdown
            value={statusValue}
            onChange={(e) => handleDropdownChange(e.value)}
            options={status}
            optionLabel='status'
            placeholder='Selecciona el Estado'
            className='w-full border-round-md'
          />
          <Dropdown
            onChange={() => {}}
            optionLabel='name'
            placeholder='Selecciona el Sector'
            className='w-full border-round-md'
            emptyMessage='No hay sectores disponibles'
          />
        </div>
        <div className='flex gap-2'>
          <Button
            icon='pi pi-filter-fill '
            className='p-button-secondary '
            onClick={handleClearFilters}
            tooltip='Limpiar Filtros'
            tooltipOptions={{ position: 'bottom' }}
          />
          <Button
            icon='pi pi-sliders-v'
            className='p-button-secondary'
            onClick={() => {}}
            tooltip='Opciones'
            tooltipOptions={{ position: 'bottom' }}
          />
        </div>
      </div>
    </div>
  )
}
