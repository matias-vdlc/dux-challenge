import { FC } from 'react'
import { Button } from 'primereact/button'
import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'
import { InputText } from 'primereact/inputtext'

import { TableHeaderProps, HeaderActionsType } from './TableHeader.interface'

export const TableHeader: FC<TableHeaderProps> = ({
  header,
  headerActions = [],
  onSearch = () => {},
}) => {
  const handleSearch = (value: string) => {
    // TODO: add input validation and debounce
    onSearch(value)
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
                handleSearch((e.target as HTMLInputElement).value)
              }
            />
          </IconField>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-search' />
            <InputText
              placeholder='Buscar'
              className='w-full border-round-md'
            />
          </IconField>
          <IconField iconPosition='left' className='w-full'>
            <InputIcon className='pi pi-search' />
            <InputText
              placeholder='Buscar'
              className='w-full border-round-md'
            />
          </IconField>
        </div>
        <div className='flex gap-2'>
          <Button
            icon='pi pi-filter-fill '
            className='p-button-secondary '
            onClick={() => {}}
            tooltip='Filtros'
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
