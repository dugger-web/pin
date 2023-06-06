import { FC, useState } from 'react'

import LoveIcon from '/public/assets/images/icons/Love.svg'
import LoveControll from '/public/assets/images/icons/Controll.svg'

import LoveLiked from '/public/assets/images/icons/LoveLike.svg'
import Like from '/public/assets/images/icons/Like.svg'

import { PropsComments } from '@/shared/types/mock_comments'

import cn from 'classnames'

import styles from './Comments.module.scss'
import Link from 'next/link'

export const Comments: FC<PropsComments> = ({ id, name, comment, avatarUrl }) => {
  const [overMouse, setOverMouse] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isHeart, setIsHeart] = useState(false)

  const onMouseEnter = () => {
    setOverMouse(true)
  }

  const onMouseLeave = () => {
    setOverMouse(false)
  }

  return (
    <div>
      <div className='flex'>
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
                  <div onClick={() => setIsLiked(false)}>
                    <LoveLiked className={styles.commentLove} />
                  </div>
                )}
                {isHeart && (
                  <div onClick={() => setIsHeart(false)}>
                    <Like />
                  </div>
                )}
              </div>
            )}
            <div className={cn('ml-3 cursor-pointer', styles.commentControll)}>
              <LoveControll />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
