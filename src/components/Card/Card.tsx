import { FC, useRef, useState } from 'react'

import { TypeCard } from '@/shared/types/mock_card'
import { Button } from '../Button/Button'

import { Popup } from '@/features/Popup/Popup'

import Image from 'next/image'

import cn from 'classnames'

import { useOnClickOutside } from '@/shared/hooks/useOutsideClick'
import { Input } from '../Input/Input'
import { BoardList } from '@/features/BoardList/BoardList'
import { mock_boards } from '@/shared/mocks/mock_boards'

import ArrowIcon from '/public/assets/images/icons/Arrow.svg'
import SaveIcon from '/public/assets/images/icons/Save.svg'

import styles from './Card.module.scss'
import Link from 'next/link'

export const Card: FC<TypeCard> = ({ id, name, image, className }) => {
  const overlay = useRef<HTMLDivElement>(null)
  const [focus, setFocus] = useState<boolean>(false)

  const [popupId, setPopupId] = useState<string | number | boolean>(false)
  const [value, setValue] = useState('')

  const onClickPopupId = (idx: string | number) => {
    setPopupId(idx)

    if (popupId) {
      setPopupId(false)
    }
  }

  useOnClickOutside(overlay, () => setPopupId(false))

  return (
    <div ref={overlay} className={cn(styles.card, className)}>
      <div className={styles.cardWrapper}>
        <div className={styles.cardImageWrapper}>
          <Link href={`/pin/${id}`} className={styles.cardImageItem}>
            <Image width={236} height={340} className={styles.cardImage} loader={() => image} src={image} alt={name as string} />
          </Link>
          <div className={cn(styles.cardContent, 'w-full', {
            [styles.cardContentActive]: popupId
          })}>
            <div className='flex items-center justify-between'>
              <div onClick={() => onClickPopupId(id)} className={cn(styles.cardBoard, 'flex items-center')}>
                <div className={styles.cardName}>
                  {name}
                </div>
                <div>
                  <ArrowIcon className={cn(styles.cardArrow, 'ml-2')} />
                </div>
              </div>
              <Button
                variant='transparent'
                onClick={() => { }}
                className={styles.cardSave}>
                Сохранить
              </Button>
            </div>
          </div>
          {popupId === id && <Popup className={cn(styles.cardPopup, {
            [styles.cardActive]: popupId === 6
          })}>
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
                      <Button variant='transparent' className={cn(styles.cardSave, 'mr-2', styles.cardBtnBoard)} onClick={() => { }}>
                        Сохранить
                      </Button>
                    </div>
                  </div>
                  <BoardList boards={mock_boards} />
                </div>
                <div className={styles.popupCreate}></div>
              </div>
            </div>
          </Popup>}
        </div>
      </div>
    </div>
  )
}
