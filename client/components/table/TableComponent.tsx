import { FC, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator } from 'primereact/paginator'
import { TableHeader } from './tableHeader'
import { Button } from 'primereact/button'

const headerButtons = [
  {
    label: 'Nuevo Usuario',
    icon: 'pi pi-plus',
    className: 'gap-2 p-2 border-round-md',
    onClick: () => {},
  },
]

const rowActions = [
  {
    ['aria-label']: 'Editar',
    icon: 'pi pi-pencil',
    className: 'gap-2 p-2 border-round-md',
    onClick: () => {},
  },
  {
    ['aria-label']: 'Eliminar',
    icon: 'pi pi-trash',
    className: 'gap-2 p-2 border-round-md',
    onClick: () => {},
  },
]

export const TableComponent: FC<{ data: any; header: string }> = ({
  data,
  header,
}) => {
  const [content, setContent] = useState(data || [])
  const [globalFilter, setGlobalFilter] = useState<string | null>(null)

  useEffect(() => {
    if (!data) return
    setContent(data)
  }, [data])

  // TODO: remove log
  console.log({ data })
  // return <div>TableComponent</div>

  const actionBodyTemplate = (rowData: any) => {
    return (
      <div className='flex gap-2'>
        {rowActions.map((action) => (
          <Button
            key={`id-${rowData.id}`}
            icon={action.icon}
            aria-label={action['aria-label']}
            rounded
            text
            onClick={action.onClick}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className='px-4 py-3 flex flex-column  justify-content-between'
      style={{ height: '100%' }}
    >
      <div className='flex flex-column gap-2'>
        <TableHeader
          header={header}
          headerActions={headerButtons}
          onSearch={setGlobalFilter}
        />

        <DataTable
          value={content}
          dataKey='id'
          rows={5}
          globalFilter={globalFilter}
          className='p-datatable-sm'
        >
          <Column
            field='id'
            header='ID'
            className='text-sm line-height-1 text-color-secondary capitalize'
          />
          <Column
            field='usuario'
            header='Nombre'
            sortable
            className='text-sm text-primary font-bold underline line-height-1'
          />

          <Column
            field='estado'
            header='Estado'
            sortable
            className='text-sm line-height-1 text-color-secondary capitalize'
          />
          <Column
            field='sector'
            header='Name'
            className='text-sm line-height-1 text-color-secondary capitalize'
          />
          <Column
            body={actionBodyTemplate}
            exportable={false}
            className='flex justify-content-center'
          />
        </DataTable>
      </div>

      {/* <Dialog
        visible={productDialog}
        breakpoints={{ '960px': '75vw', '640px': '100vw' }}
        style={{ width: '40vw' }}
        header='Product Details'
        modal
        className='p-fluid'
        footer={productDialogFooter}
        onHide={hideDialog}
      >
        {product.image && (
          <img
            src={`demo/images/product/${product.image}`}
            onError={(e) =>
              (e.target.src =
                'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png')
            }
            alt={product.image}
            className='block mt-0 mx-auto mb-5 w-20rem shadow-2'
          />
        )}
        <div className='field'>
          <label htmlFor='name'>Name</label>
          <InputText
            id='name'
            value={product.name}
            onChange={(e) => onInputChange(e, 'name')}
            required
            autoFocus
            className={classNames({ 'p-invalid': submitted && !product.name })}
          />
          {submitted && !product.name && (
            <small className='p-error'>Name is required.</small>
          )}
        </div>
        <div className='field'>
          <label htmlFor='description'>Description</label>
          <InputTextarea
            id='description'
            value={product.description}
            onChange={(e) => onInputChange(e, 'description')}
            required
            rows={3}
            cols={20}
          />
        </div>

        <div className='field'>
          <label className='mb-3'>Category</label>
          <div className='formgrid grid'>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category1'
                name='category'
                value='Accessories'
                onChange={onCategoryChange}
                checked={product.category === 'Accessories'}
              />
              <label htmlFor='category1'>Accessories</label>
            </div>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category2'
                name='category'
                value='Clothing'
                onChange={onCategoryChange}
                checked={product.category === 'Clothing'}
              />
              <label htmlFor='category2'>Clothing</label>
            </div>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category3'
                name='category'
                value='Electronics'
                onChange={onCategoryChange}
                checked={product.category === 'Electronics'}
              />
              <label htmlFor='category3'>Electronics</label>
            </div>
            <div className='field-radiobutton col-6'>
              <RadioButton
                inputId='category4'
                name='category'
                value='Fitness'
                onChange={onCategoryChange}
                checked={product.category === 'Fitness'}
              />
              <label htmlFor='category4'>Fitness</label>
            </div>
          </div>
        </div>

        <div className='formgrid grid'>
          <div className='field col'>
            <label htmlFor='price'>Price</label>
            <InputNumber
              id='price'
              value={product.price}
              onValueChange={(e) => onInputNumberChange(e, 'price')}
              mode='currency'
              currency='USD'
              locale='en-US'
            />
          </div>
          <div className='field col'>
            <label htmlFor='quantity'>Quantity</label>
            <InputNumber
              id='quantity'
              value={product.quantity}
              onValueChange={(e) => onInputNumberChange(e, 'quantity')}
              integeronly
            />
          </div>
        </div>
      </Dialog> */}

      {/* <Dialog
        visible={deleteProductDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteProductDialogFooter}
        onHide={hideDeleteProductDialog}
      >
        <div className='flex align-items-center justify-content-center'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>
              Are you sure you want to delete <b>{product.name}</b>?
            </span>
          )}
        </div>
      </Dialog> */}

      {/* <Dialog
        visible={deleteProductsDialog}
        style={{ width: '450px' }}
        header='Confirm'
        modal
        footer={deleteProductsDialogFooter}
        onHide={hideDeleteProductsDialog}
      >
        <div className='flex align-items-center justify-content-center'>
          <i
            className='pi pi-exclamation-triangle mr-3'
            style={{ fontSize: '2rem' }}
          />
          {product && (
            <span>Are you sure you want to delete the selected products?</span>
          )}
        </div>
      </Dialog> */}

      {/* // TODO: make paginator component */}
      <div>
        <Paginator
          first={1}
          rows={10}
          totalRecords={120}
          rowsPerPageOptions={[10, 20, 30]}
          onPageChange={() => {}}
        />
      </div>
    </div>
  )
}
