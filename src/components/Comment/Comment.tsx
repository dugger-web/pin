import { FC, useRef, useState } from 'react'

import LoveIcon from '/public/assets/images/icons/Love.svg'
import LoveControll from '/public/assets/images/icons/Controll.svg'

import LoveLiked from '/public/assets/images/icons/LoveLike.svg'
import Like from '/public/assets/images/icons/Like.svg'

import { PropsComments } from '@/shared/types/mock_comments'

import cn from 'classnames'

import styles from './Comment.module.scss'
import Link from 'next/link'
import { Popup } from '@/features'
import { useOnClickOutside } from '@/shared/hooks/useOutsideClick'

export const Comment: FC<PropsComments> = ({ id, name, comment, avatarUrl, isLiked, isHeart, setIsHeart, setIsLiked, setWithoutLiked, setWithoutHeart }) => {
  const [overMouse, setOverMouse] = useState(false)

  const overlay = useRef<HTMLDivElement>(null)

  const [popupId, setPopupId] = useState<string | number | boolean>(false)

  const onClickPopupId = (idx: string | number) => {
    setPopupId(idx)

    if (popupId) {
      setPopupId(false)
    }
  }

  useOnClickOutside(overlay, () => setPopupId(false))

  const onMouseEnter = () => {
    setOverMouse(true)
  }

  const onMouseLeave = () => {
    setOverMouse(false)
  }

  return (
    <div className={styles.commentItem}>
      <div className={cn('flex mb-4', styles.commentItemWrap)}>
        <div>
          <img src={avatarUrl} className={styles.commentsImage} alt={name as string} />
        </div>
        <div className='flex flex-col'>
          <div className='flex ml-3'>
            <Link href={'/'} className={styles.commentName}>{name}</Link>
            <span className='ml-2'>{comment}</span>
          </div>
          <div className='flex items-center ml-3'>
            <span>4 m</span>
            <div className={cn('ml-4 mr-4 cursor-pointer', styles.commentAnswer)}>Ответить</div>
            {!isLiked && !isHeart ? (<div
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              {overMouse ? (
                <div className={cn('flex items-center relative', styles.commentReview)}>
                  <div onClick={() => setIsLiked!(id)} className={cn('mr-2 cursor-pointer')}>
                    <LoveLiked className={styles.commentLove} />
                  </div>
                  <div onClick={() => setIsHeart!(id)} className={'cursor-pointer'}>
                    <Like />
                  </div>
                </div>
              ) : (
                <div
                  className='cursor-pointer'
                >
                  <LoveIcon />
                </div>
              )}
            </div>) : (
              <div>
                {isLiked && (
                  <div className='cursor-pointer' onClick={() => setWithoutLiked!(id)}>
                    <LoveLiked className={styles.commentLove} />
                  </div>
                )}
                {isHeart && (
                  <div className='cursor-pointer' onClick={() => setWithoutHeart!(id)}>
                    <Like />
                  </div>
                )}
              </div>
            )}
            <div ref={overlay}>
              <div onClick={() => onClickPopupId(id)} className={cn(styles.commentControll, 'ml-3 relative cursor-pointer')}>
                <LoveControll />
              </div>
              {popupId === id && <Popup className={styles.commentPopup}>

              </Popup>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
