import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: () => [],
  reducers: {
    items: state => []
  }
})

export default cartSlice.reducer
