import { configureStore } from '@reduxjs/toolkit'

import ideasSlice from './reducers/ideasSlice'
import itemsSlice from './reducers/itemsSlice'
import pinsSlice from './reducers/pinsSlice'

const store = configureStore({
  reducer: {
    items: itemsSlice,
    ideas: ideasSlice,
    pins: pinsSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store