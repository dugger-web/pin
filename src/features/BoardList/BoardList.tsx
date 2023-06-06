import { BoardItem, PropsBoardItem } from '@/components/BoardItem/BoardItem'
import { FC } from 'react'

import styles from './BoardList.module.scss'

export type PropsBoardList = {
  boards: PropsBoardItem[]
}

export const BoardList: FC<PropsBoardList> = ({ boards }) => {
  return (
    <div className={styles.boardlist}>
      <span className={styles.boardall}>Все доски</span>
      {boards.map(board => <BoardItem key={board.id} {...board} />)}
    </div>
  )
}
