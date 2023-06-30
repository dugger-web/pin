import { Button } from '@/components'
import { FC } from 'react'

import styles from './FooterSave.module.scss'

export const FooterSave: FC = () => {
  return (
    <div className={styles.footerSave}>
      <div className='mt-3'>
        <Button className='mr-3' onClick={() => { }} variant='light'>
          Сбросить
        </Button>
        <Button onClick={() => { }} variant='light'>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
