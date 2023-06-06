export type TypeCard = {
  id: number | string
  name: string | null
  image: string
  avatar: string | null
  username: string | null
  className?: string
}

export type TypeCardList = {
  cards: TypeCard[]
}