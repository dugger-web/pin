import { FC } from 'react'

import cn from 'classnames'

import UserAvatar from '/public/assets/images/avatars-000653139876-l21k8r-t500x500.jpg'

import styles from './UserInfo.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { mock_link } from '@/shared/mocks/mock_link'

export const UserInfo: FC = () => {
  return (
    <div className={styles.user}>
      <div className={styles.userWrapper}>
        <div className={styles.userProfile}>
          <label className={styles.userLabel}>Сейчас:</label>
          <div className={cn(styles.userProfileWrapper, 'flex items-center w-100')}>
            <Image className={styles.userAvatar} width={60} height={60} src={UserAvatar} alt={''} />
            <div className={cn(styles.userAvatarWrapper, 'ml-2 w-100')}>
              <h5 className={styles.userName}>Amirkhan Magomedov</h5>
              <div className='flex items-center justify-between w-100'>
                <p className={styles.userPrivate}>Личный</p>
                <div className={styles.userArrow}>
                  <svg height="12" width="12" viewBox="0 0 24 24" aria-label="Selected item" role="img"><path d="M9.17 21.75.73 12.79c-.97-1.04-.97-2.71 0-3.75a2.403 2.403 0 0 1 3.53 0l4.91 5.22L19.74 3.03c.98-1.04 2.55-1.04 3.53 0 .97 1.03.97 2.71 0 3.74L9.17 21.75z"></path></svg>
                </div>
              </div>
              <p className={styles.userEmail}>amirkhanmags@gmail.com</p>
            </div>
          </div>
        </div>
        <div className={styles.userAccounts}>
          <label className={cn(styles.userLabel, 'mt-4 block')}>Ваши аккаунты</label>
          <div className='mt-4'>
            <a className={cn(styles.userAcc)}>
              <Link passHref href='/'>
                Добавить аккаунт
              </Link>
            </a>
            <a className={cn(styles.userAcc)}>
              <Link passHref href='/'>
                Перейти на бизнес-аккаунт
              </Link>
            </a>
          </div>
        </div>
        <div className={styles.additionally}>
          <label className={cn(styles.userLabel, 'mt-3 block')}>Дополнительно</label>
          {mock_link.map(link => (
            <div className={cn('flex items-center', styles.userItemBlock)} key={link.id}>
              <a className={cn(styles.userItem)}>
                <div className={cn(styles.userLink, {
                  [styles.userLinkItem]: link.id === 7
                })}>
                  <Link passHref href='/'>
                    {link.name}
                  </Link>
                </div>
              </a>
              {link.isIcon && (
                <div className={styles.userArrow}>
                  <svg height="12" width="12" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img"><path d="M4.928 1a2.357 2.357 0 1 0 0 4.714h10.024L1.69 18.976a2.36 2.36 0 0 0 0 3.334 2.35 2.35 0 0 0 1.668.69c.603 0 1.206-.229 1.667-.69l13.26-13.263v10.024a2.358 2.358 0 1 0 4.715 0V1H4.928Z"></path></svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
