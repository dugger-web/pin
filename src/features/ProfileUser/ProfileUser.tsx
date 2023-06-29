import Image from 'next/image'
import { FC } from 'react'

import AvatarImage from '/public/assets/images/avatars-000653139876-l21k8r-t500x500.jpg'

import { Button } from '@/components'

import cn from 'classnames'

import styles from './ProfileUser.module.scss'

export const ProfileUser: FC = () => {
  return (
    <div>
      <div className={styles.profileWrapper}>
        <div>
          <Image className={styles.profileImage} src={AvatarImage} width={100} height={100} alt='' />
        </div>
        <div className='text-center'>
          <h2 className='text-center text-4xl font-semibold'>Amirkhan Magomedov</h2>
          <span className='mt-3 block'>@amirkhanmags</span>
          <div>0 подписок</div>
          <div className='mt-4'>
            <Button className={cn(styles.profileShare)} onClick={() => { }}>
              Поделиться
            </Button>
            <Button className={cn(styles.profileChange, 'ml-2')} onClick={() => { }}>
              Изменить профиль
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
