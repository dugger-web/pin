import { FC } from 'react'

import AvatarImage from '/public/assets/images/avatars-000653139876-l21k8r-t500x500.jpg'
import Image from 'next/image'
import { Button, Input } from '@/components'

import cn from 'classnames'

import styles from './PublicProfile.module.scss'
import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { FooterSave } from '../FooterSave/FooterSave'
import { SideBar } from '../SideBar/SideBar'

export const PublicProfile: FC = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    console.log(data)
  }

  return (
    <div className='wrapper'>
      <div className={cn(styles.publicContent, 'flex mt-9')}>
        <div>
          <SideBar />
        </div>
        <div className={styles.publicProfile}>
          <h2 className={styles.publicTitle}>Общедоступный профиль</h2>
          <span>В вашем профиле можно будет увидеть указанную информацию</span>
          <div className='mt-4'>
            <label className={styles.publicLabel}>Фотография</label>
            <div className='flex items-center mt-1'>
              <Image className={styles.publicImage} width={90} height={90} src={AvatarImage} alt='' />
              <Button className={cn('ml-4', styles.publicBtn)} variant='light' onClick={() => { }}>Изменить</Button>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='flex items-center mt-5'>
              <div>
                <Controller name='name' control={control} render={({ field: { onChange, value } }) => (
                  <>
                    <label>Имя</label>
                    <Input
                      onFocus={() => { }}
                      onBlur={() => { }}
                      value={value}
                      onChange={onChange}
                      variant='transparent'
                      className={cn(styles.publicInput, styles.publicName)}
                      withIcon={false}
                      placeholder='Имя'
                    />
                  </>
                )} />
              </div>
              <div>
                <Controller name='surname' control={control} render={({ field: { onChange, value } }) => (
                  <>
                    <label>Фамилия</label>
                    <Input
                      onFocus={() => { }}
                      onBlur={() => { }}
                      value={value}
                      onChange={onChange}
                      variant='transparent' className={cn(styles.publicInput, styles.publicSurname)} withIcon={false}
                      placeholder='Фамилия'
                    />
                  </>
                )} />
              </div>
            </div>
            <div>
              <div className='mt-5'>
                <Controller name='description' control={control} render={({ field: { onChange, value } }) => (
                  <>
                    <label>Описание</label>
                    <Input
                      onFocus={() => { }}
                      onBlur={() => { }}
                      value={value}
                      onChange={onChange}
                      variant='transparent' className={cn(styles.publicInput, styles.publicDescription)} withIcon={false}
                      placeholder='Описание'
                    />
                  </>
                )} />
              </div>
              <div className={styles.publicWebContent}>
                <Controller name='website' control={control} render={({ field: { onChange, value } }) => (
                  <>
                    <label>Веб сайт</label>
                    <Input
                      onFocus={() => { }}
                      onBlur={() => { }}
                      value={value}
                      onChange={onChange}
                      variant='transparent' className={cn(styles.publicInput, styles.publicWeb)} withIcon={false}
                      placeholder='Веб сайт'
                    />
                  </>
                )} />
              </div>
              <div className='mt-5'>
                <Controller name='username' control={control} render={({ field: { onChange, value } }) => (
                  <>
                    <label>Имя пользователя</label>
                    <Input
                      onFocus={() => { }}
                      onBlur={() => { }}
                      value={value}
                      onChange={onChange}
                      variant='transparent' className={cn(styles.publicInput, styles.publicUsername)} withIcon={false}
                      placeholder='Имя пользователя'
                    />
                  </>
                )} />
              </div>
            </div>
            <FooterSave />
          </form>
        </div>
      </div >
    </div >
  )
}
