import { FC, useRef, useState } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import cn from 'classnames'

import { Button, Input } from '@/components'
import { ContentSearch, Popup, UserInfo } from '@/features'

import Logo from '/public/assets/images/icons/Logo.svg'
import Notification from '/public/assets/images/icons/Notification.svg'
import Messages from '/public/assets/images/icons/Messages.svg'
import AvatarImage from '/public/assets/images/avatars-000653139876-l21k8r-t500x500.jpg'
import Arrow from '/public/assets/images/icons/Arrow.svg'

import { useOnClickOutside } from '@/shared/hooks/useOutsideClick'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useDebounce } from '@/shared/hooks/useDebounce'

import { useLocalStorage } from '@/shared/hooks/useLocalStorage'
import { TypeCard } from '@/shared/types/mock_card'

import styles from './Header.module.scss'

export type PropsRequestSearch = {
  search?: string
  filteredItems: TypeCard[]
}

type PropsBlur = {
  focus: boolean
  setFocus: (focus: boolean) => void
}

const RequestSearchItem: FC<any> = ({ id, name, image, onClickAdd }) => {
  const onAddToSearch = () => {
    const obj = {
      id,
      name,
      image
    }

    onClickAdd(obj)
  }

  return (
    <div onClick={onAddToSearch}>
      <h5>{name}</h5>
    </div>
  )
}

const RequestSearch: FC<PropsRequestSearch> = ({ search, filteredItems }) => {
  const [requestItems, setRequestItems] = useLocalStorage('requestItems', [])

  const onAddNewValue = (obj: TypeCard) => {
    const foundItem = requestItems.find((item: TypeCard) => item.id === obj.id)

    if (foundItem) return;

    setRequestItems((prevState: []) => [...prevState, obj] as TypeCard[])
  }

  const onRemoveItem = (id: number | string) => {
    setRequestItems((prevState: []) => prevState.filter((item: TypeCard) => item.id !== id))
  }

  return (
    <div className={styles.requestSearch}>
      <span className='mt-5'>Недавние поисковые запросы</span>
      <div className='flex items-center mt-2'>
        {requestItems.map(({ id, name }: TypeCard) => (
          <div key={id}>
            <button className={cn(styles.requestName, 'flex items-center')}>
              {name}
              <svg onClick={() => onRemoveItem(id)} className={styles.requestRemove} height="12" width="12" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="m15.18 12 7.16-7.16c.88-.88.88-2.3 0-3.18-.88-.88-2.3-.88-3.18 0L12 8.82 4.84 1.66c-.88-.88-2.3-.88-3.18 0-.88.88-.88 2.3 0 3.18L8.82 12l-7.16 7.16c-.88.88-.88 2.3 0 3.18.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66L12 15.18l7.16 7.16c.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66.88-.88.88-2.3 0-3.18L15.18 12z"></path></svg>
            </button>
          </div>
        ))}
      </div>
      {search!.length ? filteredItems.map(item => (
        <RequestSearchItem key={item.id} {...item} onClickAdd={onAddNewValue} />
      )) : ''}
    </div>
  )
}

export const Header: FC<PropsBlur> = ({ focus, setFocus }) => {
  const refContentSearch = useRef<HTMLDivElement>(null)
  const refPopup = useRef<HTMLDivElement>(null)
  const refCreate = useRef<HTMLDivElement>(null)

  const { items, value } = useAppSelector(state => state.items)

  const [search, setSearch] = useState(value)
  const [popup, setPopup] = useState(false)
  const [popupCreate, setPopupCreate] = useState(false)

  const unique = items.filter((obj, index, array) => {
    return index === array.findIndex(o => obj.name === o.name);
  });

  const debounceSearch = useDebounce(search, 500)

  const filteredItems = unique.filter(item => {
    return item.name?.toLowerCase().includes(debounceSearch.toLowerCase())
  })

  useOnClickOutside(refPopup, () => setPopup(false))
  useOnClickOutside(refContentSearch, () => setFocus(false))
  useOnClickOutside(refCreate, () => setPopupCreate(false))

  return (
    <header className='header mt-3 '>
      <div className="wrapper">
        <div className='flex items-center justify-center w-full'>
          <div className='flex items-center'>
            <div className={styles.headerLogo}>
              <Link href='/'>
                <Logo />
              </Link>
            </div>
            <Button className={cn(styles.headerHome)} onClick={() => { }} variant='dark'>
              Главная
              <Arrow className={cn(styles.headerArrow, 'ml-2 cursor-pointer')} />
            </Button>
            <div ref={refCreate}>
              <Button onClick={() => setPopupCreate(!popupCreate)} className={cn(styles.headerCreate, 'flex items-center')} variant='transparent'>
                Создать
                <Arrow className='ml-2 cursor-pointer' />
              </Button>
              {popupCreate && <Popup className={styles.popupCreate}>
                <div className={styles.popupIdea}>
                  <Link onClick={() => setPopupCreate(false)} href={'/builder/builder'}>
                    <h3>Создать пин-идею</h3>
                  </Link>
                </div>
                <div className={styles.popupIdea}>
                  <h3>Создать пин</h3>
                </div>
              </Popup>}
            </div>
          </div>
          <div ref={refContentSearch} className='w-full mr-5 ml-4'>
            <Input
              type='text'
              value={search}
              onChange={setSearch}
              focus={focus}
              width={`100%`}
              onFocus={() => setFocus(!focus)}
              onBlur={() => setFocus(true)}
              placeholder='Search'
              withIcon={true}
            />
            {focus && (
              <ContentSearch>
                <RequestSearch filteredItems={filteredItems} search={search} />
              </ContentSearch>
            )}
          </div>
          <div className='flex items-center'>
            <div className={styles.headerNot}>
              <Notification className={cn('cursor-pointer')} />
            </div>
            <div className={styles.headerMessages}>
              <Messages className={cn('cursor-pointer')} />
            </div>
            <div className={styles.headerAvatar}>
              <Image width={25} height={25} className={cn('rounded-full cursor-pointer')} src={AvatarImage} alt='Avatar' />
            </div>
            <div ref={refPopup}>
              <div onClick={() => setPopup(!popup)} className={styles.headerArrowAvatar}>
                <Arrow className={cn('cursor-pointer ')} />
              </div>
              {popup && (
                <Popup>
                  <UserInfo />
                </Popup>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
