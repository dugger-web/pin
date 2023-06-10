import { FC, useState } from 'react'

import { Comment } from '@/components/Comment/Comment'
import { PropsCommentsList } from '@/shared/types/mock_comments'

import ArrowIcon from '/public/assets/images/icons/Arrow.svg'
import AvatarImage from '/public/assets/images/avatars-000653139876-l21k8r-t500x500.jpg'
import SendIcon from '/public/assets/images/icons/Send.svg'

import cn from 'classnames'
import Image from 'next/image'

import styles from './CommentsList.module.scss'
import { Input } from '@/components'

type PropsInputList = {
  value: string
  setValue: (value: string) => void
  onAdd: (value: string) => void,
}

export const InputList: FC<PropsInputList> = ({ value, setValue, onAdd }) => {
  const [isActive, setIsActive] = useState(false)

  const addToValue = (value: string) => {
    if (value.length) {
      onAdd(value)
    }

    setValue('')
  }

  return (
    <div className={styles.inputList}>
      <div className={styles.inputContent}>
        <div>
          <Image width={50} height={50} className={styles.inputAvatar} src={AvatarImage} alt='' />
        </div>
        <hr className={styles.inputLinear} />
        <div onClick={() => setIsActive(true)} className={styles.inputWrapperComment}>
          <Input
            className={cn(styles.inputComment, { [styles.inputActive]: isActive }, 'ml-3')}
            onBlur={() => { }}
            onFocus={() => { }}
            value={value}
            onChange={setValue}
            placeholder='Добавить комментарий'
            withIcon={false}
          />
          {value.length ? (
            <div className='cursor-pointer' onClick={() => addToValue(value)}>
              <SendIcon className={styles.inputSend} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

type PropsCommentAdd = {
  onAdd: (value: string) => void
  setIsLiked?: (id: number, isLiked?: boolean) => void
  setIsHeart?: (id: number, isHeart?: boolean) => void

  setWithoutLiked?: (id: number, isLiked?: boolean) => void
  setWithoutHeart?: (id: number, isHeart?: boolean) => void
}

export const CommentsList: FC<PropsCommentsList & PropsCommentAdd> = ({ comments, onAdd, setIsLiked, setIsHeart, setWithoutLiked, setWithoutHeart }) => {
  const [show, setShow] = useState(true)
  const [value, setValue] = useState('')

  return (
    <div>
      <div className={styles.commentsWrapper}>
        {comments.length ? (
          <div className='flex items-center mb-8'>
            <h2 className={styles.commentsTitle}>{comments.length} комментарий</h2>
            <div onClick={() => setShow(!show)} className={cn(styles.commentsIcon, {
              [styles.commentIconActive]: !show
            })}>
              <ArrowIcon width={20} height={20} />
            </div>
          </div>
        ) : (
          <div>
            <h2 className={styles.commentsTitle}>
              Комментарии
            </h2>
            <p className={styles.commentsDescription}>
              У вас еще нет комментариев. Добавьте комментарий, чтобы начать обсуждение.
            </p>
          </div>
        )}
        <div className={cn({ [styles.commentList]: comments.length >= 4 })}>
          <div>
            {show && comments.map(comment => (
              <Comment
                key={comment.id}
                {...comment}
                setIsHeart={setIsHeart}
                setIsLiked={setIsLiked}
                setWithoutLiked={setWithoutLiked}
                setWithoutHeart={setWithoutHeart}
              />
            ))}
          </div>
        </div>
        <InputList value={value} setValue={setValue} onAdd={onAdd} />
      </div>
    </div>
  )
}
