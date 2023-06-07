import { FC, useState } from 'react'

import cn from 'classnames'

import SaveIcon from '/public/assets/images/icons/Save.svg'

import { Button, Input } from '@/components'

import styles from './ModalCard.module.scss'
import { BoardList } from '../BoardList/BoardList'
import { mock_boards } from '@/shared/mocks/mock_boards'

export const ModalCard: FC = () => {
  const [focus, setFocus] = useState<boolean>(false)
  const [value, setValue] = useState('')

  return (
    <div>
      <div className={styles.cardPopupWrap}>
        <h5 className='text-center mt-2 mb-6'>Сохранение</h5>
        <div className={styles.cardWrapInput}>
          <Input
            value={value}
            onChange={setValue}
            focus={focus}
            onFocus={setFocus as any}
            onBlur={setFocus as any}
            withIcon={true}
            placeholder='Поиск'
            classNameIcon={styles.cardIcon}
            className={cn(styles.cardInput)}
          />
        </div>
        <div className={cn('mt-5', styles.cardboard)}>
          <div className={styles.cardVariants}>Лучшие варианты</div>
          <div className={styles.cardProfile}>
            <div className={styles.cardProfileWrapper}>
              <div className={cn('flex items-center', styles.cardProfleSave)}>
                <div className={styles.cardWrapperSave}>
                  <SaveIcon />
                </div>
                <span className='ml-2 '>Профиль</span>
              </div>
              <Button variant='access' className={cn(styles.cardSave, 'mr-2', styles.cardBtnBoard)} onClick={() => { }}>
                Сохранить
              </Button>
            </div>
          </div>
          <BoardList boards={mock_boards} />
        </div>
        <div className={styles.popupCreate}></div>
      </div>
    </div>
  )
}
