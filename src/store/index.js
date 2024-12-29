import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './features/usersSlice'
import searchReducer from './features/searchSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    search: searchReducer
  }
})
