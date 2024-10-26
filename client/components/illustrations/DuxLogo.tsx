import { FC } from 'react'
import Image from 'next/image'
import { IllustrationProps } from './Illustrations.interface'

export const DuxLogo: FC<IllustrationProps> = ({ className, size = 44 }) => {
  return (
    <Image
      src='/iso-logo.png'
      alt='dux-logo'
      width={size}
      height={size}
      className={className}
    />
  )
}
