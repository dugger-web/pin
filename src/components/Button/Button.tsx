import React, { FC, ReactNode } from 'react'

import cn from 'classnames'

import styles from './Button.module.scss'

type PropsButton = {
  type: 'submit' | 'button'
  children: ReactNode
  className?: string
  variant: 'dark' | 'transparent' | 'access'
  onClick: () => void
}

export const Button: FC<PropsButton> = (
  {
    children,
    className,
    variant,
    type,
    onClick
  }
) => {
  return (
    <button type={type} onClick={onClick} className={cn(styles[variant], className)}>
      {children}
    </button>
  )
}
