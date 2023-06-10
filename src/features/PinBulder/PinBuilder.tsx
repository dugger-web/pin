import { FC } from 'react'

import { Button } from '@/components'
import Image from 'next/image'

import ImageView from '/public/assets/images/df016746913dc6cefe09cc822a82636c.jpg'
import AddSvg from '/public/assets/images/icons/Add.svg'


import styles from './PinBuilder.module.scss'

export const PinBuilder: FC = () => {
  return (
    <div>
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
            <Button variant='access' onClick={() => { }}>Создать новый</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
