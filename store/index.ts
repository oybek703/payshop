import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { configureStore } from '@reduxjs/toolkit'
import cart from '@/store/cartSlice'
import { countryReducer } from '@/store/countrySlice'

const reducers = combineReducers({ cart, country: countryReducer })

const reducer = persistReducer({ key: 'root', storage }, reducers)

const store = configureStore({
  reducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof reducers>

export default store
