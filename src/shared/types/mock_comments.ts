export type PropsComments = {
  id: number
  name: string
  comment: string
  avatarUrl: string,
  isLiked?: boolean
  isHeart?: boolean

  setIsLiked?: (id: number, isLiked?: boolean) => void
  setWithoutLiked?: (id: number, isLiked?: boolean) => void

  setIsHeart?: (id: number, isHeart?: boolean) => void
  setWithoutHeart?: (id: number, isHeart?: boolean) => void
}


export type PropsCommentsList = {
  comments: PropsComments[]
}
