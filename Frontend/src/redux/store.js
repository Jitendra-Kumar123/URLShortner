import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import urlReducer from './slices/urlSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    urls: urlReducer,
  },
})

export default store
