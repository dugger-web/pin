import { FC, ReactNode, useState } from 'react'

import { Header, Footer } from '@/features'

import cn from 'classnames'

import styles from './Layout.module.scss'

type PropsLayout = {
  children: ReactNode
}

export const Layout: FC<PropsLayout> = ({ children }) => {
  const [focus, setFocus] = useState(false)

  return (
    <div>
      <Header
        focus={focus}
        setFocus={setFocus}
      />
      <div className={cn(styles.overlayWhite, {
        [styles.overlayDark]: focus
      })}>
        {children}
      </div>
      <Footer />
    </div>
  )
}
