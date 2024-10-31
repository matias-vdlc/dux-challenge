import { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { User } from '../../interface'
import {
  useCreateUser,
  useGetUsers,
  useUpdateUser,
  useDeleteUser,
} from '../../api'
import { tableHeaders } from './constants'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { colors } from '../../styles/colors'
import { InputText } from 'primereact/inputtext'
import {
  InputNumber,
  InputNumberValueChangeEvent,
} from 'primereact/inputnumber'
import { Dropdown } from 'primereact/dropdown'
import { status, paginatorDefaulState } from './constants'

const Table = lazy(() =>
  import('../../components/table').then((module) => ({
    default: module.TableComponent,
  })),
)

export const UsersTable = ({ users }: { users: User[] }) => {
  const [usersData, setUsersData] = useState<User[]>(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [paginator, setPaginator] = useState(paginatorDefaulState)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const initialUserRef = useRef<User | null>(null)

  const { handler: userCreateHandler } = useCreateUser()
  const {
    handler: userGetHandler,
    handleSearch: handleSearchUsers,
    data: updatedUserData,
    isLoading: isGetUsersLoading,
    totalCount: usersTotalCount,
    isSuccess: usersIsSuccess,
    isSerachSuccess,
  } = useGetUsers()
  const { handler: userUpdateHandler } = useUpdateUser()
  const { handler: userDeleteHandler } = useDeleteUser()

  const handleDeleteUserAction = (user: User) => {
    setShowDeleteDialog(true)
    setSelectedUser(user)
  }

  const hideDeleteUserDialog = () => {
    setShowDeleteDialog(false)
    setSelectedUser(null)
  }

  const handleDeleteUser = () => {
    if (!selectedUser) return
    userDeleteHandler(selectedUser.id)
    updateTableData()
    hideDeleteUserDialog()
  }

  const handleCreateUserAction = () => {
    setSelectedUser(null)
    setShowCreateDialog(true)
  }

  const handleEditUserAction = (user: User) => {
    setSelectedUser(user)
    initialUserRef.current = user
    setShowCreateDialog(true)
    setIsEdit(true)
  }

  const isFormIncomplete = () => {
    return (
      !selectedUser?.id ||
      !selectedUser?.sector ||
      !selectedUser?.usuario ||
      !selectedUser?.estado
    )
  }

  const handleSubmitModal = () => {
    if (!selectedUser) return

    const capitalizeUser = {
      ...selectedUser,
      usuario: selectedUser.usuario?.toUpperCase(),
    }

    if (isEdit) {
      userUpdateHandler(initialUserRef.current?.id!, capitalizeUser)
      setIsFormValid(true)
      setIsEdit(false)
    } else {
      if (isFormIncomplete()) {
        // TODO: add error mesage or wrong input
        setIsFormValid(false)
        return
      }

      userCreateHandler(capitalizeUser)
    }

    setShowCreateDialog(false)
    updateTableData()
  }

  const onInputChange = (value: string | number, name: keyof User) => {
    if (name === 'usuario') {
      let cleanedValue = (value as string).replace(/\s+/g, ' ')

      if (cleanedValue.length > 30) {
        cleanedValue = cleanedValue.slice(0, 30)
      }

      setSelectedUser(
        (prevUser) =>
          ({
            ...prevUser,
            [name]: cleanedValue,
          }) as User,
      )
    } else {
      setSelectedUser(
        (prevUser) =>
          ({
            ...prevUser,
            [name]: value,
          }) as User,
      )
    }
  }

  const updateTableData = () => {
    userGetHandler({ sector: 2000, page: 1, limit: 10 })
    setPaginator(paginatorDefaulState)
  }

  const headerButtons = [
    {
      label: 'Nuevo Usuario',
      icon: 'pi pi-plus text-sm',
      className: 'gap-2 p-2 border-round-md font-bold text-sm',
      onClick: handleCreateUserAction,
      style: {
        backgroundColor: colors.ADD_BUTTON,
        borderColor: colors.ADD_BUTTON,
        height: '40px',
      },
    },
  ]

  const rowActions = [
    {
      ['aria-label']: 'Editar',
      icon: 'pi pi-pencil text-sm',
      className: 'gap-2 border-round-md',
      onClick: (rowData: User) => handleEditUserAction(rowData),
    },
    {
      ['aria-label']: 'Eliminar',
      icon: 'pi pi-trash text-sm',
      className: 'gap-2 border-round-md',
      onClick: (rowData: User) => handleDeleteUserAction(rowData),
    },
  ]

  const deleteUserDialogHeader = (
    <div className='flex align-items-center justify-content-between p-4  border-round-top-md'>
      <div className='font-bold text-xl'>Eliminar usuario</div>
    </div>
  )

  const deleteUserDialogFooter = (
    <div className='flex align-items-center justify-content-end gap-2'>
      <Button
        label='Si'
        icon='pi pi-check'
        severity='danger'
        onClick={handleDeleteUser}
      />
      <Button
        label='No'
        icon='pi pi-times'
        outlined
        className='text-color'
        onClick={hideDeleteUserDialog}
      />
    </div>
  )

  const headerCreateDialog = (
    <div
      className='flex align-items-center justify-content-between px-4 py-3 m-0 border-round-top-md'
      style={{
        backgroundColor: colors.PRIMARY,
        color: 'white',
        height: '50px',
      }}
    >
      <div className='font-bold text-xl'>
        {isEdit ? 'Editar usuario' : 'Usuario'}
      </div>
      <div className='flex gap-3'>
        <i className='pi pi-cog text-xs' />
        <i
          className='pi pi-minus text-xs cursor-pointer'
          onClick={() => setShowCreateDialog(false)}
        />
      </div>
    </div>
  )

  const footerCreateDialog = (
    <div className='flex align-items-center justify-content-center gap-2'>
      <Button
        label='Confirmar'
        icon='pi pi-check'
        className='border-round-md'
        style={{
          backgroundColor: colors.BUTTON,
          borderColor: colors.BUTTON,
        }}
        autoFocus
        raised
        onClick={handleSubmitModal}
      />
      <Button
        label='Cancelar'
        outlined
        icon='pi pi-check'
        className='border-round-md'
        style={{
          color: colors.BUTTON,
        }}
        autoFocus
        onClick={() => setShowCreateDialog(false)}
      />
    </div>
  )

  useEffect(() => {
    const params = {
      sector: 2000,
      page: paginator.page,
      limit: paginator.rows,
    }
    userGetHandler(params)
  }, [paginator.page, paginator.rows, paginator.first])

  useEffect(() => {
    setUsersData(updatedUserData || [])
    setPaginator((prev) => ({ ...prev, totalRecords: usersTotalCount || 100 }))
  }, [usersIsSuccess, isSerachSuccess])

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <Table
          data={usersData}
          title='Usuarios'
          handleSearch={handleSearchUsers}
          headerButtons={headerButtons}
          tableHeaders={tableHeaders}
          rowActions={rowActions}
          paginator={paginator}
          setPaginator={setPaginator}
          isLoading={isGetUsersLoading}
          handleUpdateData={updateTableData}
        />
      </Suspense>
      <Dialog
        visible={showCreateDialog}
        modal
        header={headerCreateDialog}
        footer={footerCreateDialog}
        style={{ width: '1100px' }}
        onHide={() => setShowCreateDialog(false)}
        className='p-fluid'
        draggable={false}
      >
        <div className='flex flex-column gap-4 pt-4'>
          <div className='field'>
            <label htmlFor='id' className='mb-2 font-semibold text-lg'>
              id
            </label>
            <InputNumber
              id='id'
              value={selectedUser?.id || 0}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                onInputChange(e.value ?? 0, 'id')
              }
              required
              useGrouping={false}
              autoFocus
              min={0}
              max={999999}
              disabled={isEdit && !!selectedUser}
            />
          </div>
          <div className='field'>
            <label htmlFor='usuario' className='mb-2 font-semibold text-lg'>
              Nombre:
            </label>
            <InputText
              id='usuario'
              value={selectedUser?.usuario || ''}
              onChange={(e) => onInputChange(e.target.value, 'usuario')}
              required
              autoFocus
            />
          </div>
          <div className='field'>
            <label htmlFor='estado' className='mb-2 font-semibold text-lg'>
              Estado:
            </label>
            <Dropdown
              value={selectedUser?.estado || ''}
              onChange={(e) => onInputChange(e.target.value, 'estado')}
              options={status}
              optionLabel='estado'
              placeholder='Selecciona el Estado'
              className='w-full border-round-md'
            />
          </div>
          <div className='field'>
            <label htmlFor='sector' className='mb-2 font-semibold text-lg'>
              Sector:
            </label>
            <InputNumber
              id='sector'
              value={selectedUser?.sector || 0}
              onValueChange={(e: InputNumberValueChangeEvent) =>
                onInputChange(e.value ?? 0, 'sector')
              }
              required
              useGrouping={false}
              autoFocus
              min={0}
              max={9999}
            />
          </div>
        </div>
      </Dialog>
      <Dialog
        visible={showDeleteDialog}
        style={{ width: '450px' }}
        header={deleteUserDialogHeader}
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
        draggable={false}
      >
        <div className='flex align-items-center justify-content-center gap-2'>
          <i
            className='pi pi-exclamation-triangle mr-3 text-red-500'
            style={{ fontSize: '2rem' }}
          />
          {selectedUser && (
            <span>
              ¿Está seguro que desea eliminar el usuario{' '}
              <b>{selectedUser.usuario}</b>?
            </span>
          )}
        </div>
      </Dialog>
    </>
  )
}
