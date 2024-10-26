import { FC, PropsWithChildren } from 'react'
import { TopbarComponent } from './topbarComponent'
import { SidebarComponent } from './sidebarComponent'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <TopbarComponent>
        <SidebarComponent />
        <div style={{ width: '100%', height: '100%' }}>{children}</div>
      </TopbarComponent>
    </>
  )
}
