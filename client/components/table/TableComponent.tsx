import { FC, useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Paginator } from 'primereact/paginator'
import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'

import { IconField } from 'primereact/iconfield'
import { InputIcon } from 'primereact/inputicon'

export const TableComponent: FC<{ data: any }> = ({ data }) => {
  const [content, setContent] = useState(data || [])

  useEffect(() => {
    if (!data) return
    setContent(data)
  }, [data])

  // TODO: remove log
  console.log({ data })
  // return <div>TableComponent</div>

  return (
    <div
      className='px-4 py-3 flex flex-column  justify-content-between'
      style={{ height: '100%' }}
    >
      <div>
        <div className='flex align-items-center justify-content-between mb-4'>
          <div className='text-3xl font-bold'>Usuarios</div>
          {/* // TODO: add button functionality */}
          <Button
            label='Crear usuario'
            icon='pi pi-plus'
            className='gap-2 p-2 '
            onClick={() => {}}
          />
        </div>

        {/* // TODO: create filters */}
        <div className='flex justify-content-between'>
          <div className='flex'>
            <IconField iconPosition='left'>
              <InputIcon className='pi pi-search' />
              <InputText placeholder='Search' />
            </IconField>
          </div>
          <div className='mt-3 md:mt-0 flex justify-content-end'>
            <Button
              icon='pi pi-plus'
              className='mr-2 p-button-rounded'
              onClick={() => {}}
              tooltip='New'
              tooltipOptions={{ position: 'bottom' }}
            />
            <Button
              icon='pi pi-trash'
              className='p-button-danger mr-2 p-button-rounded'
              onClick={() => {}}
              disabled={false}
              tooltip='Delete'
              tooltipOptions={{ position: 'bottom' }}
            />
          </div>
        </div>

        <DataTable
          value={content}
          // selection={selectedProducts}
          // onSelectionChange={(e) => setSelectedProducts(e.value)}
          dataKey='id'
          // paginator
          rows={5}
          // rowsPerPageOptions={[1, 10]}
          // paginatorTemplate='FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'
          // globalFilter={globalFilter}
          // header={header}
          className='flex flex-column gap-4'
        >
          <Column
            field='id'
            header='ID'
            sortable
            style={{ minWidth: '12rem', height: '2rem' }}
          />
          <Column
            field='usuario'
            header='Nombre'
            sortable
            style={{ minWidth: '12rem' }}
          />

          <Column
            field='estado'
            header='Estado'
            sortable
            style={{ minWidth: '12rem' }}
          />
          <Column
            field='sector'
            header='Name'
            sortable
            style={{ minWidth: '12rem' }}
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
