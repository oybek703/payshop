import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { countryReducer } from '@/redux/features/countrySlice'

const reducers = combineReducers({ country: countryReducer })

export const store = configureStore({
  devTools: true,
  reducer: reducers
})

export type RootState = ReturnType<typeof store.getState>
