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
import { ModalCard } from '@/features/ModalCard/ModalCard'

export const Card: FC<TypeCard> = ({ id, name, image, className }) => {
  const overlay = useRef<HTMLDivElement>(null)

  const [popupId, setPopupId] = useState<string | number | boolean>(false)

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
                variant='access'
                onClick={() => { }}
                className={styles.cardSave}>
                Сохранить
              </Button>
            </div>
          </div>
          {popupId === id && <Popup className={cn(styles.cardPopup)}>
            <ModalCard />
          </Popup>}
        </div>
      </div>
    </div>
  )
}
