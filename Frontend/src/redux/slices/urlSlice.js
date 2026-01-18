import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  urls: [],
  loading: false,
  error: null,
}

const urlSlice = createSlice({
  name: 'urls',
  initialState,
  reducers: {
    fetchUrlsStart: (state) => {
      state.loading = true
      state.error = null
    },
    fetchUrlsSuccess: (state, action) => {
      state.loading = false
      state.urls = action.payload
      state.error = null
    },
    fetchUrlsFailure: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    addUrl: (state, action) => {
      state.urls.push(action.payload)
    },
    deleteUrl: (state, action) => {
      state.urls = state.urls.filter(url => url.id !== action.payload)
    },
    updateUrl: (state, action) => {
      const index = state.urls.findIndex(url => url.id === action.payload.id)
      if (index !== -1) {
        state.urls[index] = action.payload
      }
    },
    clearError: (state) => {
      state.error = null
    },
  },
})

export const { fetchUrlsStart, fetchUrlsSuccess, fetchUrlsFailure, addUrl, deleteUrl, updateUrl, clearError } = urlSlice.actions
export default urlSlice.reducer
