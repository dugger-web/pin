import { useEffect } from "react"

import { CardList } from "@/features/CardList/CardList"

import { useAppDispatch, useAppSelector } from "@/shared/hooks"
import { fetchItems } from "@/store/reducers/itemsSlice"
import { useDebounce } from "@/shared/hooks/useDebounce";

export const ExamplePage = () => {
  const dispatch = useAppDispatch()
  const { items, status, error, value } = useAppSelector(state => state.items)

  const debounceValue = useDebounce(value, 250)

  useEffect(() => {
    dispatch(fetchItems(debounceValue))
  }, [debounceValue])

  return (
    <div className="wrapper">
      {status ? <h2>{status}</h2> : <CardList cards={items} />}
      {error && <h2>{error}</h2>}
    </div>
  )
}
