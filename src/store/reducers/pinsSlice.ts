import { postPins } from './../../shared/api/endpoints';
import { PropsPins } from './../../shared/types/mock_pins';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getPins } from '@/shared/api/endpoints';

export const fetchPins = createAsyncThunk('pins/fetchPins', async (_, { rejectWithValue }) => {
  try {
    const response = await getPins()

    return response
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const fetchAddPin = createAsyncThunk('pins/fetchAddPin', async (pin: PropsPins, { rejectWithValue }) => {
  try {
    const { data } = await postPins(pin)

    return data
  } catch (error) {
    return rejectWithValue(error)
  }
})

type TypeInitialState = {
  pins: PropsPins[]
  status: null | string
  error: null | string
}

const initialState: TypeInitialState = {
  pins: [],
  status: null,
  error: null,
}

const pinsSlice = createSlice({
  name: 'pins',
  initialState,
  reducers: {

  },
  extraReducers(builder) {
    builder.addCase(fetchPins.pending, (state) => {
      state.status = 'loading' as string | null
    })
    builder.addCase(fetchPins.fulfilled, (state, action) => {
      state.status = 'fullfiled'
      state.pins = action.payload as any
    })
    builder.addCase(fetchPins.rejected, (state, action) => {
      state.error = action.payload as string
    })
    builder.addCase(fetchAddPin.fulfilled, (state, action) => {
      state.pins.push(action.payload as any)
    })
  },
})


export default pinsSlice.reducer