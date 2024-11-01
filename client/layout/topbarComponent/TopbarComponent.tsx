import { FC, PropsWithChildren } from 'react'
import { Menubar } from 'primereact/menubar'
import { DuxLogo } from '../../components/illustrations'
import { colors } from '../../styles/colors'

export const TopbarComponent: FC<PropsWithChildren> = ({ children }) => {
  const start = <DuxLogo />
  const end = (
    <i className='pi pi-cog p-3' style={{ fontSize: '18px', color: 'white' }} />
  )

  return (
    <>
      <Menubar
        start={start}
        end={end}
        className=' w-full flex justify-content-between border-none border-noround'
        style={{
          height: '45px',
          backgroundColor: colors.PRIMARY,
        }}
      />
      <div style={{ display: 'flex', height: 'calc(100vh - 45px)' }}>
        {children}
      </div>
    </>
  )
}
