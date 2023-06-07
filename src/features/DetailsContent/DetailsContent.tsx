import { FC, useState } from 'react'

import { TypeCardList } from '@/shared/types/mock_card'
import Image from 'next/image'

import cn from 'classnames'

import ArrowIcon from '/public/assets/images/icons/Arrow.svg'

import { Button } from '@/components/Button/Button'
import { CommentsList } from '../CommentsList/CommentsList'
import { mock_comments } from '@/shared/mocks/mock_comments'

import styles from './DetailsContent.module.scss'
import { Popup } from '../Popup/Popup'
import { ModalCard } from '../ModalCard/ModalCard'

type PropsDetailsContent = TypeCardList

export const DetailsContent: FC<PropsDetailsContent> = ({ cards }) => {
  const [comments, setComments] = useState(mock_comments)
  const [popup, setPopup] = useState(false)

  const onAddNewComment = (value: string) => {
    const comment = {
      id: 1,
      comment: value,
      name: 'Amirkhan',
      avatarUrl: 'https://i.pinimg.com/75x75_RS/c3/14/6c/c3146c156e286e73812ba09aab08b265.jpg',
    }

    setComments(prevState => [...prevState, comment] as never)
  }

  return (
    <div>
      {cards.map(card => (
        <div key={card.id}>
          <div className={styles.details}>
            <div>
              <Image
                width={100}
                height={100}
                loader={() => card.image}
                className={styles.detailsImage}
                src={card.image}
                alt={card.name as string}
              />
            </div>
            <div className={cn(styles.detailsContent)}>
              <div className='flex items-center justify-between'>
                <div className='flex'>
                  <div>
                    <svg height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M12 9c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3M3 9c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm18 0c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"></path></svg>
                  </div>
                  <div className='mr-4 ml-4'>
                    <svg height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z"></path></svg>
                  </div>
                  <div>
                    <svg height="20" width="20" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="m21 7.24-4.05 4.05-1.06-1.06.67-.67a1.5 1.5 0 1 0-2.12-2.12l-.67.67-1.06-1.06L16.76 3zm-9.7 9.7L7.23 21 3 16.76l4.05-4.05 1.06 1.06-.67.67a1.5 1.5 0 0 0 2.12 2.12l.67-.67zM14.63.89l-4.05 4.05a3 3 0 0 0 0 4.24l1.06 1.06-1.42 1.42-1.06-1.06a3 3 0 0 0-4.24 0L.88 14.64a3 3 0 0 0 0 4.24l4.24 4.24a3 3 0 0 0 4.24 0l4.05-4.05a3 3 0 0 0 0-4.24l-1.06-1.06 1.42-1.42 1.06 1.06a3 3 0 0 0 4.24 0l4.05-4.05a3 3 0 0 0 0-4.24L18.88.88a3 3 0 0 0-4.24 0z"></path></svg>
                  </div>
                </div>
                <div className={cn('flex items-center cursor-pointer', styles.detailsInfo)}>
                  <div className='flex items-center' onClick={() => setPopup(!popup)}>
                    <span>{card.name}</span>
                    <div className={styles.detailsArrow}>
                      <ArrowIcon className={'ml-3'} />
                      {popup && <Popup className={styles.detailsCard}>
                        <ModalCard />
                      </Popup>}
                    </div>
                  </div>
                  <Button variant='access' className={styles.detailsSave} onClick={() => { }}>Сохранить</Button>
                </div>
              </div>
              <CommentsList comments={comments} onAdd={onAddNewComment} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
