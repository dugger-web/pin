import { FC, ReactNode } from 'react'

import cn from 'classnames'

import styles from './ContentSearch.module.scss'

type PropsContent = {
  children: ReactNode
}

export const ContentSearch: FC<PropsContent> = ({ children }) => (
  <div className={cn(styles.content, 'absolute')}>
    {children}
  </div>
)
