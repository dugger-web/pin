import { FC, useState } from 'react'

import { Comments } from '@/components/Comments/Comments'
import { PropsCommentsList } from '@/shared/types/mock_comments'

import ArrowIcon from '/public/assets/images/icons/Arrow.svg'
import AvatarImage from '/public/assets/images/avatars-000653139876-l21k8r-t500x500.jpg'
import SendIcon from '/public/assets/images/icons/Send.svg'

import cn from 'classnames'
import Image from 'next/image'

import styles from './CommentsList.module.scss'
import { Input } from '@/components'

export const InputList = () => {
  const [isActive, setIsActive] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className={cn('relative', styles.inputList)}>
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
          {value.length ? <SendIcon className={styles.inputSend} /> : null}
        </div>
      </div>
    </div>
  )
}

export const CommentsList: FC<PropsCommentsList> = ({ comments }) => {
  const [show, setShow] = useState(true)

  return (
    <div>
      <div className={styles.commentsWrapper}>
        <div className='flex items-center mb-8'>
          <h2 className={styles.commentsTitle}>{comments.length} комментарий</h2>
          <div onClick={() => setShow(!show)} className={cn(styles.commentsIcon, {
            [styles.commentIconActive]: !show
          })}>
            <ArrowIcon width={20} height={20} />
          </div>
        </div>
        {show && comments.map(comment => <Comments key={comment.id} {...comment} />)}
        <InputList />
      </div>
    </div>
  )
}
