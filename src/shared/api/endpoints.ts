import { PropsComments } from './../types/mock_comments';
import { api, APIResponseType } from './api';

import { TypeCard } from '../types/mock_card';

const endpoints = {
  items: '/items',
  ideas: '/ideas',
  comments: '/comments',
  filterItems: (search?: string) => `/items?q=${search}`,
  partyComment: (id: number) => `/comments/${id}`
}

const items = {
  async getItems(search?: string) {
    return await api.get<APIResponseType<TypeCard[]>>(endpoints.filterItems(search)).then(({ data }) => data)
  },
  async getIdeas() {
    return await api.get<APIResponseType<TypeCard[]>>(endpoints.ideas).then(({ data }) => data)
  },
  async getComments() {
    return await api.get<APIResponseType<PropsComments[]>>(endpoints.comments).then(({ data }) => data)
  }
}

export const postComment = (comment: PropsComments) => (
  api.post(endpoints.comments, comment)
)

export const isLikedComment = (id: number) => (
  api.patch(endpoints.partyComment(id), { isLiked: true })
)

export const isHeartComment = (id: number) => (
  api.patch(endpoints.partyComment(id), { isHeart: true })
)

export const isWithoutHeartComment = (id: number) => (
  api.patch(endpoints.partyComment(id), { isHeart: false })
)

export const isWithoutLikedComment = (id: number) => (
  api.patch(endpoints.partyComment(id), { isLiked: false })
)

export const { getItems, getIdeas, getComments } = items