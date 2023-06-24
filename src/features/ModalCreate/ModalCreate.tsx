import { ChangeEvent, FC, useEffect, useRef, useState } from 'react'

import cn from 'classnames'

import CloseSvg from '/public/assets/images/icons/Close.svg'
import QuestionSvg from '/public/assets/images/icons/Questions.svg'
import DownloadSvg from '/public/assets/images/icons/Download.svg'

import styles from './ModalCreate.module.scss'
import { useAppDispatch } from '@/shared/hooks'
import { fetchPins } from '@/store/reducers/pinsSlice'
import { PropsPins } from '@/shared/types/mock_pins'

type PropsModalCreate = {
  onClose: (modal: boolean) => void
  file: null
  setFile: (pin: PropsPins) => void
}

export const ModalCreate: FC<PropsModalCreate> = ({ onClose, file, setFile }) => {
  const dispatch = useAppDispatch()

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleUploadClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    reader.onload = (ev) => {
      if (e.target.files) {

        const newPin = {
          id: Date.now(),
          name: e.target.files[0].name,
          image: ev.target?.result
        }

        setFile(newPin)
      }
    }

    reader.readAsDataURL(e.target.files![0] as File)
  };

  useEffect(() => {
    dispatch(fetchPins())
  }, [])

  return (
    <div className={styles.modal}>
      <div className={cn(styles.modalWrapper)}>
        <div className='flex justify-between items-center'>
          <div onClick={() => onClose(false)}>
            <CloseSvg className='cursor-pointer' />
          </div>
          <h2 className={styles.modalTitle}>Загрузите материалы для создания пинов</h2>
          <div>
            <QuestionSvg className='cursor-pointer' />
          </div>
        </div>
        <div onClick={handleUploadClick} className={cn(styles.modalDownload, 'cursor-pointer')}>
          <div>
            <DownloadSvg className={styles.modalDownloadIcon} />
          </div>
          <input style={{ display: 'none' }} ref={inputRef} onChange={handleFileChange} type="file" />
          <p className={styles.modalText}>
            Перетащите изображения или видео либо нажмите,чтобы добавить их
          </p>
        </div>
      </div>
    </div>
  )
}
