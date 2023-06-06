import { FC, ReactNode } from 'react'

import cn from 'classnames'

import styles from './Popup.module.scss'

type PropsPopup = {
  children: ReactNode
  className?: string
}

export const Popup: FC<PropsPopup> = ({ className, children }) => {
  return (
    <div className={cn(styles.popup, className)}>
      {children}
    </div>
  )
}
