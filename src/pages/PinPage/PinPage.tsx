import { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { useRouter } from 'next/router'
import { fetchItems } from '@/store/reducers/itemsSlice'
import { DetailsContent } from '@/features/DetailsContent/DetailsContent'

export const PinPage: FC = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { items, error, value } = useAppSelector(state => state.items)

  const { id } = router.query

  const pin = items.filter(item => item.id === id)

  useEffect(() => {
    dispatch(fetchItems(value))
  }, [])

  return (
    <div className='wrapper'>
      <DetailsContent cards={pin} />
      {error && <h2>{error}</h2>}
    </div>
  )
}
