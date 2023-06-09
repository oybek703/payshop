import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICountry } from '@/interfaces/ip-detection.interfaces'

const initialState: ICountry = {
  name: 'Uzbekistan',
  flag: '/images/flag.png',
  currency: 'UZS'
}

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    setCountry: (state: ICountry, action: PayloadAction<ICountry>) => {
      state.name = action.payload.name
      state.flag = action.payload.flag
      state.currency = action.payload.currency
    }
  }
})

export const countryReducer = countrySlice.reducer
export const countryActions = countrySlice.actions
