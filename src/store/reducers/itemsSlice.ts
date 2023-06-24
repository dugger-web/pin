import { PropsPins } from '@/shared/types/mock_pins';
import { postItem } from './../../shared/api/endpoints';
import { TypeCard } from './../../shared/types/mock_card';
import { getItems } from "@/shared/api/endpoints"
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export const fetchItems = createAsyncThunk('items/fetchItems', async (search: string, { rejectWithValue }) => {
  try {
    const response = await getItems(search)

    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const fetchAddItem = createAsyncThunk('items/fetchAddItem', async (item: PropsPins, { rejectWithValue }) => {
  try {
    const { data } = await postItem(item)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

type TypeInitialState = {
  items: TypeCard[]
  status: null | string
  error: null | string,
  value: string
}

const initialState: TypeInitialState = {
  items: [],
  status: null,
  error: null,
  value: ''
}

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading' as string
    })
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload as TypeCard[]
      state.status = null
    })
    builder.addCase(fetchItems.rejected, (state, action: PayloadAction<any>) => {
      state.error = action.payload.message
      state.status = null
    })
  },
})

export default itemsSlice.reducer