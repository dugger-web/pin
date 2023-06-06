import { api, APIResponseType } from './api';

import { TypeCard } from '../types/mock_card';

const endpoints = {
  items: '/items',
  ideas: '/ideas',
  filterItems: (search?: string) => `/items?q=${search}`
}

const items = {
  async getItems(search?: string) {
    return await api.get<APIResponseType<TypeCard[]>>(endpoints.filterItems(search)).then(({ data }) => data)
  },
  async getIdeas() {
    return await api.get<APIResponseType<TypeCard[]>>(endpoints.ideas).then(({ data }) => data)
  }
}

export const { getItems, getIdeas } = items