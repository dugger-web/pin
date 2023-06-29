import { FC } from 'react'
import Image from 'next/image'

import cn from 'classnames'

import styles from './BoardItem.module.scss'
import { Button } from '../Button/Button'

export type PropsBoardItem = {
  id: number
  name: string
  image: string
}

export const BoardItem: FC<PropsBoardItem> = ({ id, name, image }) => {
  return (
    <div>
      <div className={cn('flex justify-between items-center', styles.boardWrap)}>
        <div className={cn('flex w-100', styles.boardInfo)}>
          <Image className={cn(styles.boardImage)} width={48} height={48} src={image} alt={name} />
          <span className='ml-2 mt-3'>{name}</span>
        </div>
        <Button variant='access' className={styles.boardBtn} onClick={() => { }}>
          Сохранить
        </Button>
      </div>
    </div>
  )
}
