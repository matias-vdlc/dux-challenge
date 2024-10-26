import { FC } from 'react'
import { colors } from '../../styles/colors'

export const SpinnerComponent: FC<Partial<{ size: number; color: string }>> = ({
  size = 16,
  color = colors.PRIMARY,
}) => {
  return (
    <div className='flex align-items-center justify-content-center'>
      <i
        className='pi pi-spin pi-spinner'
        style={{ fontSize: `${size}px`, color: `${color}` }}
      />
    </div>
  )
}
