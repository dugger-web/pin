import { FC } from 'react'

import cn from 'classnames'

import SearchIcon from '/public/assets/images/icons/Search.svg'

import styles from './Input.module.scss'

type PropsInput = {
  type?: string
  width?: string
  height?: string
  focus?: boolean
  onFocus?: (focus?: boolean | undefined) => void
  onBlur?: (focus?: boolean | undefined) => void
  value?: string
  onChange?: (value: string) => void
  className?: string
  classNameIcon?: string
  withIcon: boolean
  placeholder?: string
}

export const Input: FC<PropsInput> = (
  {
    type = 'text',
    width,
    height,
    value,
    onChange,
    onFocus,
    onBlur,
    focus,
    className,
    classNameIcon,
    withIcon,
    placeholder
  }
) => {
  const style = { padding: '6px 40px' }

  return (
    <div className={cn(styles.inputWrapper, 'relative w-full mr-5')}>
      <input
        type={type}
        width={width}
        height={height}
        className={cn('absolute', styles.input, { [styles.withoutInput]: focus }, className)}
        value={value}
        onFocus={() => onFocus!(focus)}
        onBlur={() => onBlur!(focus)}
        onChange={(e) => onChange!(e.target.value)}
        placeholder={placeholder}
      />
      {withIcon && (
        <div className={styles.inputWithIcon}>
          {!focus && <SearchIcon className={cn(styles.inputSearch, 'absolute bottom-3.5', classNameIcon)} />}
        </div>
      )}
    </div>
  )
}
