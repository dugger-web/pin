import Link from 'next/link'
import { FC } from 'react'

import { mock_sidebar } from '@/shared/mocks/mock_sidebar'

import cn from 'classnames'

import styles from './SideBar.module.scss'

export const SideBar: FC = () => {
  return (
    <div className={styles.sidebar}>
      <div>
        {mock_sidebar.map(item => (
          <Link key={item.id} className={cn(styles.sidebarlink, 'block')} href={item.href}>{item.name}</Link>
        ))}
      </div>
    </div>
  )
}
