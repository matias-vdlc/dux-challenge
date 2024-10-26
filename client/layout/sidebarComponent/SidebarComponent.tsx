import { FC } from 'react'
import { MegaMenu } from 'primereact/megamenu'
import { MenuItem } from 'primereact/menuitem'
import { colors } from '../../styles/colors'

const createMenuItems = (count: number): MenuItem[] => {
  return Array.from({ length: count }, () => ({
    icon: 'pi pi-box',
    className: 'flex align-items-center justify-content-center',
  }))
}

const items = createMenuItems(6)

export const SidebarComponent: FC = () => {
  return (
    <MegaMenu
      model={items}
      orientation='vertical'
      className='h-full border-none border-noround'
      style={{ width: '65px', backgroundColor: colors.SIDEBAR }}
    />
  )
}