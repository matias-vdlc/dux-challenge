import { FC, useRef, useState } from 'react'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'
import { TableHeaderProps, HeaderActionsType } from './TableHeader.interface'
import { Dropdown } from 'primereact/dropdown'
import { status } from '../../../views/users/constants'
import { debounce } from '../../../helpers'

export const TableHeader: FC<TableHeaderProps> = ({
  title,
  headerActions = [],
  onSearch = () => {},
}) => {
  const [searchValue, setSearchValue] = useState('')
  const [statusValue, setStatusValue] = useState('')
  const debounceRef = useRef<NodeJS.Timeout>()

  const debouncedSearch = debounce(
    debounceRef,
    (key, cleanedValue) => onSearch({ key, value: cleanedValue }),
    300,
  )

  const handleInputChange = (value: string, key: string) => {
    const cleannedValue = value.trim().toUpperCase()
    setStatusValue('')
    setSearchValue(value)
    debouncedSearch(cleannedValue, key)
  }

  const handleDropdownChange = (value: string, key: string) => {
    setSearchValue('')
    setStatusValue(value)
    onSearch({ key, value })
  }

  const handleClearFilters = () => {
    setSearchValue('')
    setStatusValue('')
    onSearch({})
  }

  return (
    <div>
      <div className='flex align-items-center justify-content-between mb-4'>
        <div className='text-3xl font-bold'>{title}</div>
        {!!headerActions.length &&
          headerActions.map((action: HeaderActionsType) => (
            <Button
              key={action.label}
              label={action.label}
              icon={action.icon}
              className={action.className}
              onClick={action.onClick}
              style={action.style}
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
                handleInputChange(
                  (e.target as HTMLInputElement).value,
                  'usuario',
                )
              }
              value={searchValue}
            />
          </IconField>
          <Dropdown
            value={statusValue}
            onChange={(e) => handleDropdownChange(e.value, 'estado')}
            options={status}
            optionLabel='estado'
            placeholder='Selecciona el Estado'
            className='w-full border-round-md'
          />
          <Dropdown
            value={[]}
            onChange={() => {}}
            disabled
            optionLabel='name'
            placeholder='Selecciona el Sector'
            className='w-full border-round-md'
            emptyMessage='No hay sectores disponibles'
          />
        </div>
        <div className='flex gap-2'>
          <Button
            icon='pi pi-filter-fill text-sm'
            className={`p-button-${!searchValue && !statusValue ? 'secondary' : 'primary'}`}
            onClick={handleClearFilters}
            tooltip='Limpiar Filtros'
            tooltipOptions={{ position: 'bottom' }}
          />
          <Button
            icon='pi pi-sliders-v text-sm'
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
