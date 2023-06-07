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

export const Comment: FC<PropsComments> = ({ id, name, comment, avatarUrl }) => {
  const [overMouse, setOverMouse] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHeart, setIsHeart] = useState(false)
  const [popup, setPopup] = useState(false)

  const ref = useRef(null)

  const onMouseEnter = () => {
    setOverMouse(true)
  }

  const onMouseLeave = () => {
    setOverMouse(false)
  }

  useOnClickOutside(ref, () => setPopup(false))

  return (
    <div>
      <div className='flex mb-4'>
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
                  <div onClick={() => setIsLiked(true)} className={cn('mr-2 cursor-pointer')}>
                    <LoveLiked className={styles.commentLove} />
                  </div>
                  <div onClick={() => setIsHeart(true)} className={'cursor-pointer'}>
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
                  <div className='cursor-pointer' onClick={() => setIsLiked(false)}>
                    <LoveLiked className={styles.commentLove} />
                  </div>
                )}
                {isHeart && (
                  <div className='cursor-pointer' onClick={() => setIsHeart(false)}>
                    <Like />
                  </div>
                )}
              </div>
            )}
            <div ref={ref}>
              <div onClick={() => setPopup(!popup)} className={cn(styles.commentControll, 'ml-3 relative cursor-pointer')}>
                <LoveControll />
              </div>
              {popup && <Popup className={styles.commentPopup}>

              </Popup>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
