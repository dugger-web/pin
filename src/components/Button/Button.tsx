import React, { FC, ReactNode } from 'react'

import cn from 'classnames'

import styles from './Button.module.scss'

type PropsButton = {
  children: ReactNode
  className?: string
  variant: 'dark' | 'transparent'
  onClick: () => void
}

export const Button: FC<PropsButton> = (
  {
    children,
    className,
    variant,
    onClick
  }
) => {
  return (
    <button onClick={onClick} className={cn(styles[variant], className)}>
      {children}
    </button>
  )
}
