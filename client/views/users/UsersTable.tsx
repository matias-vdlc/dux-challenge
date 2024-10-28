import { useEffect, useState, useRef } from 'react'
import { TableComponent } from '../../components/table'
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
import { Dropdown } from 'primereact/dropdown'
import { status, paginatorDefaulState } from './constants'

export const UsersTable = ({ users }: { users: User[] }) => {
  const [data, setData] = useState<User[]>(users)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [paginator, setPaginator] = useState(paginatorDefaulState)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showCreateDialog, setShowCreateDialog] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [isFormValid, setIsFormValid] = useState(true)
  const initialUserRef = useRef<User | null>(null)

  const { handler: userCreateHandler, isLoading: userCreateLoading } =
    useCreateUser()
  const {
    handler: userGetHandler,
    data: updatedUserData,
    isLoading: userGetLoading,
  } = useGetUsers()
  const { handler: userUpdateHandler, isLoading: userUpdateLoading } =
    useUpdateUser()
  const { handler: userDeleteHandler, isLoading: userDeleteLoading } =
    useDeleteUser()

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

    if (isEdit) {
      const updatedFields: Partial<User> = {}

      // Compare each field to find changes
      Object.keys(selectedUser).forEach((key) => {
        const k = key as keyof User
        if (selectedUser[k] !== initialUserRef.current?.[k]) {
          updatedFields[k] = selectedUser[k]
        }
      })

      if (Object.keys(updatedFields).length > 0) {
        userUpdateHandler(initialUserRef.current?.id!, updatedFields)
      }
      setIsFormValid(true)
      setIsEdit(false)
    } else {
      if (isFormIncomplete()) {
        setIsFormValid(false)
        return
      }

      userCreateHandler(selectedUser)
    }
    setShowCreateDialog(false)
    updateTableData()
  }

  const onInputChange = (value: string, name: keyof User) => {
    setSelectedUser({ ...selectedUser, [name]: value } as User)
  }

  const updateTableData = () => {
    userGetHandler({ sector: 2000, page: 1, limit: 5 })
    setPaginator(paginatorDefaulState)
  }

  // TODO: add user
  const headerButtons = [
    {
      label: 'Nuevo Usuario',
      icon: 'pi pi-plus',
      className: 'gap-2 p-2 border-round-md',
      onClick: handleCreateUserAction,
    },
  ]

  // TODO: add actions edit and delete
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
    <div className='flex align-items-center justify-content-start bg-primary h-3rem m-0'>
      <div className='font-bold'>{isEdit ? 'Editar usuario' : 'Usuario'}</div>
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

  // TODO: validate paginator
  useEffect(() => {
    if (!paginator.page || !paginator.rows) return
    const params = {
      sector: 2000,
      page: paginator.page,
      limit: paginator.rows,
    }
    userGetHandler(params)
  }, [paginator.page, paginator.rows])

  useEffect(() => {
    if (userDeleteLoading) return
    if (updatedUserData) {
      setData(updatedUserData)
    }
  }, [updatedUserData])

  // useEffect(() => {
  //   if (userCreateLoading || userUpdateLoading || userDeleteLoading) return
  //   userGetHandler({ sector: 2000, page: 1, limit: 5 })
  //   setPaginator(paginatorDefaulState)
  // }, [userDeleteLoading, userCreateLoading, userUpdateLoading])

  return (
    <>
      <TableComponent
        data={data}
        title='Usuarios'
        headerButtons={headerButtons}
        tableHeaders={tableHeaders}
        rowActions={rowActions}
        paginator={paginator}
        setPaginator={setPaginator}
      />
      <Dialog
        visible={showCreateDialog}
        modal
        header={headerCreateDialog}
        footer={footerCreateDialog}
        style={{ width: '1100px' }}
        onHide={() => setShowCreateDialog(false)}
        className='p-fluid'
      >
        <div className='flex flex-column gap-4'>
          <div className='field'>
            <label htmlFor='id' className='mb-2 font-semibold'>
              id
            </label>
            <InputText
              id='id'
              value={selectedUser?.id?.toString() || ''}
              onChange={(e) => onInputChange(e.target.value, 'id')}
              required
              autoFocus
            />
          </div>
          <div className='field'>
            <label htmlFor='usuario' className='mb-2 font-semibold'>
              Nombre
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
            <label htmlFor='estado' className='mb-2 font-semibold'>
              Estado
            </label>
            <Dropdown
              value={selectedUser?.estado || ''}
              onChange={(e) => onInputChange(e.target.value, 'estado')}
              options={status}
              optionLabel='status'
              placeholder='Selecciona el Estado'
              className='w-full border-round-md'
            />
          </div>
          <div className='field'>
            <label htmlFor='sector' className='mb-2 font-semibold'>
              Sector
            </label>
            <InputText
              id='sector'
              value={selectedUser?.sector?.toString() || ''}
              onChange={(e) => onInputChange(e.target.value, 'sector')}
              required
              autoFocus
            />
          </div>
        </div>
      </Dialog>

      <Dialog
        visible={showDeleteDialog}
        style={{ width: '450px' }}
        header='Eliminar usuario'
        modal
        footer={deleteUserDialogFooter}
        onHide={hideDeleteUserDialog}
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
