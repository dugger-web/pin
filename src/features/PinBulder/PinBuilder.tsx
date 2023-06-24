import { FC, useState } from 'react'

import { Button, Input } from '@/components'
import Image from 'next/image'

import ImageView from '/public/assets/images/df016746913dc6cefe09cc822a82636c.jpg'
import AddSvg from '/public/assets/images/icons/Add.svg'

import { ModalCreate } from '../ModalCreate/ModalCreate'
import { useAppDispatch } from '@/shared/hooks'

import { Controller, FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { fetchAddItem } from '@/store/reducers/itemsSlice'

import styles from './PinBuilder.module.scss'
import { PropsPins } from '@/shared/types/mock_pins'

export const PinBuilder: FC = () => {
  const dispatch = useAppDispatch()

  const [modal, setModal] = useState(false)
  const [file, setFile] = useState<null | PropsPins>(null)

  const { control, handleSubmit } = useForm({})

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    const newItem = {
      id: String(Date.now()),
      name: data.name,
      image: file?.image
    }

    dispatch(fetchAddItem(newItem))
  }

  return (
    <div>
      {file ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <hr className={styles.pinLinear} />
            <div className={styles.pinHorizon}>
              <div>
                <AddSvg />
              </div>
            </div>
            <div className={styles.pinFullLinear}></div>
          </div>
          <div className={styles.pinForm}>
            <div className='flex justify-end mt-8'>
              <Button className={styles.pinBtn} type='submit' variant='access' onClick={() => { }}>
                Опубликовать
              </Button>
            </div>
            <div className='flex justify-center'>
              <div>
                <Image
                  width={375}
                  height={375}
                  loader={() => file?.image as string}
                  className={styles.pinImageWrap}
                  src={file?.image as string}
                  alt=''
                />
              </div>
              <div className={styles.pinWrapperDescription}>
                <Controller
                  name='name'
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <label>Название</label>
                      <Input
                        placeholder='Добавить название'
                        value={value}
                        withIcon={false}
                        onFocus={() => { }}
                        onBlur={() => { }}
                        className={styles.pinName}
                        onChange={onChange}
                        type='text'
                      />
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </form>
      ) : (
        <div className={styles.pinContent}>
          <div>
            <hr className={styles.pinLinear} />
            <div className={styles.pinHorizon}>
              <div>
                <AddSvg />
              </div>
            </div>
            <div className={styles.pinFullLinear}></div>
          </div>
          <div>
            <Image className={styles.pinImage} width={403} height={273} src={ImageView} alt='' />
            <div>
              <h2 className={styles.pinTitle}>Начните создавать пины</h2>
              <p className={styles.pinDescription}>
                Срок действия черновиков истекает через 30 дней после того, как вы впервые их сохранили. Потом они удаляются.
              </p>
              <Button type='button' variant='access' onClick={() => setModal(true)}>Создать новый</Button>
            </div>
          </div>
          <div>
            {modal && <ModalCreate
              file={file as any}
              setFile={setFile as any}
              onClose={setModal}
            />}
          </div>
        </div>
      )}
    </div>
  )
}
