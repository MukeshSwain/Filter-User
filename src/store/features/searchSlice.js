import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from '@reduxjs/toolkit'

const initialState = {
  searchTerm: '',
  filters: {
    viewMode: 'grid', // 'grid' | 'list'
    filterBy: {
      name: true,
      email: true,
      company: true
    }
  }
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    clearSearch: (state) => {
      state.searchTerm = ''
    },
    setViewMode: (state, action) => {
      state.filters.viewMode = action.payload
    },
    toggleFilter: (state, action) => {
      const field = action.payload
      state.filters.filterBy[field] = !state.filters.filterBy[field]
    }
  }
})

// Basic selectors
export const selectSearchTerm = state => state.search.searchTerm
export const selectViewMode = state => state.search.filters.viewMode
export const selectFilters = state => state.search.filters.filterBy

// Memoized selector for filtered users
export const selectFilteredUsers = createSelector(
  [
    state => state.users.users,
    selectSearchTerm,
    selectFilters
  ],
  (users, searchTerm, filters) => {
    if (!searchTerm) return users

    const lowercaseSearch = searchTerm.toLowerCase()
    return users.filter(user => {
      const matchName = filters.name && user.name.toLowerCase().includes(lowercaseSearch)
      const matchEmail = filters.email && user.email.toLowerCase().includes(lowercaseSearch)
      const matchCompany = filters.company && user.company.name.toLowerCase().includes(lowercaseSearch)
      
      return matchName || matchEmail || matchCompany
    })
  }
)

export const { 
  setSearchTerm, 
  clearSearch, 
  setViewMode,
  toggleFilter
} = searchSlice.actions

export default searchSlice.reducer
