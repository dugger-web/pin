import { getIdeas } from '@/shared/api/endpoints';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TypeCard } from '@/shared/types/mock_card';

export const fetchIdeas = createAsyncThunk('fetchIdeas', async (_, { rejectWithValue }) => {
  try {
    const response = await getIdeas();

    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

type TypeInitialState = {
  ideas: TypeCard[]
  status: null | string
  error: null | string
}

const initialState: TypeInitialState = {
  ideas: [],
  status: null,
  error: null
}

const ideasSlice = createSlice({
  name: 'ideas',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(fetchIdeas.pending, (state) => {
      state.status = 'loading' as string
    })
    builder.addCase(fetchIdeas.fulfilled, (state, action) => {
      state.status = 'fulfilled'
      state.ideas = action.payload
    })
    builder.addCase(fetchIdeas.rejected, (state, action) => {
      state.error = action.payload as string
    })
  },
})

export default ideasSlice.reducer