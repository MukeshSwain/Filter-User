import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUsers as fetchUsersApi } from '../../services/api'

// Async thunk for fetching users
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchUsersApi()
      return response
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const initialState = {
  users: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
  selectedUser: null,
  sortOrder: 'asc'
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    selectUser: (state, action) => {
      state.selectedUser = state.users.find(user => user.id === action.payload)
    },
    clearSelectedUser: (state) => {
      state.selectedUser = null
    },
    sortUsersByName: (state) => {
      state.users.sort((a, b) => {
        const compareResult = a.name.localeCompare(b.name)
        return state.sortOrder === 'asc' ? compareResult : -compareResult
      })
      // Toggle sort order for next click
      state.sortOrder = state.sortOrder === 'asc' ? 'desc' : 'asc'
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.users = action.payload
        state.error = null
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload || 'Failed to fetch users'
      })
  }
})

// Selectors
export const selectAllUsers = state => state.users.users
export const selectUsersStatus = state => state.users.status
export const selectUsersError = state => state.users.error
export const selectSelectedUser = state => state.users.selectedUser
export const selectSortOrder = state => state.users.sortOrder

export const { selectUser, clearSelectedUser, sortUsersByName } = usersSlice.actions

export default usersSlice.reducer
