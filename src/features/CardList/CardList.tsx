import { FC } from 'react'

import { Card } from '@/components/Card/Card'
import { TypeCardList } from '@/shared/types/mock_card'

import cn from 'classnames'

import styles from './CardList.module.scss'

export const CardList: FC<TypeCardList> = ({ cards }) => {
  return (
    <div className={cn(styles.cardlist, 'mt-3 flex justify-between flex-wrap')}>
      {cards.map(card => <Card key={card.id} {...card} className={styles.card} />)}
    </div>
  )
}
