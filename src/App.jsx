import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchUsers,
  selectUser,
  clearSelectedUser,
  sortUsersByName,
  selectAllUsers,
  selectUsersStatus,
  selectUsersError,
  selectSelectedUser,
  selectSortOrder
} from './store/features/usersSlice'
import {
  setSearchTerm,
  selectSearchTerm,
  selectViewMode,
  selectFilteredUsers,
  setViewMode,
  toggleFilter,
  selectFilters
} from './store/features/searchSlice'
import './App.css'

function UserListItem({ user, onSelect }) {
  return (
    <div 
      className="hover-card p-4 bg-white rounded-2xl border border-gray-100"
      onClick={() => onSelect(user.id)}
    >
      <div className="flex items-center space-x-4">
        <div className="hidden sm:flex w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl items-center justify-center flex-shrink-0 shadow-lg">
          <span className="text-lg text-white font-semibold">
            {user.name.charAt(0)}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate text-lg">{user.name}</h3>
          <p className="text-gray-500 truncate">{user.email}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="badge">{user.company.name}</span>
          </div>
        </div>
        <button 
          className="ml-2 p-2 rounded-xl hover:bg-gray-50 text-gray-400 hover:text-blue-500 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            window.open(`http://${user.website}`, '_blank');
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

function UserGridItem({ user, onSelect }) {
  return (
    <div 
      className="hover-card p-6 glass-effect border border-gray-100"
      onClick={() => onSelect(user.id)}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center shadow-lg mb-4">
          <span className="text-2xl sm:text-3xl text-white font-semibold">
            {user.name.charAt(0)}
          </span>
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2 text-center truncate w-full">{user.name}</h2>
        <p className="text-gray-500 mb-3 text-center truncate w-full">{user.email}</p>
        <div className="flex justify-center mb-4">
          <span className="badge">{user.company.name}</span>
        </div>
        <a
          href={`http://${user.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <span>Visit Website</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
        </a>
      </div>
    </div>
  )
}

function UserDetail({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto glass-effect rounded-2xl animate-scale-in">
        <div className="sticky top-0 backdrop-blur-xl bg-white/90 px-6 py-4 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl text-white font-semibold">
                  {user.name.charAt(0)}
                </span>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold gradient-text truncate max-w-[200px]">{user.name}</h2>
                <p className="text-gray-500 text-sm truncate max-w-[200px]">{user.company.name}</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Email</p>
              <p className="text-gray-800 break-all">{user.email}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Phone</p>
              <p className="text-gray-800">{user.phone}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Username</p>
              <p className="text-gray-800">{user.username}</p>
            </div>
            <div className="p-4 rounded-xl bg-gray-50">
              <p className="text-sm text-gray-500 mb-1">Website</p>
              <a 
                href={`http://${user.website}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700 transition-colors break-all"
              >
                {user.website}
              </a>
            </div>
          </div>
          
          <div className="p-4 rounded-xl bg-gray-50">
            <p className="text-sm text-gray-500 mb-1">Address</p>
            <p className="text-gray-800">
              {user.address.street}, {user.address.suite}<br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SearchFilters() {
  const dispatch = useDispatch()
  const filters = useSelector(selectFilters)

  return (
    <div className="glass-effect p-4 rounded-2xl space-y-2">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Search Filters</h3>
      <div className="flex flex-wrap gap-2">
        <label className="checkbox-label flex-1 min-w-[140px] bg-white shadow-sm">
          <input
            type="checkbox"
            checked={filters.name}
            onChange={() => dispatch(toggleFilter('name'))}
            className="checkbox"
          />
          <span>Names</span>
        </label>
        <label className="checkbox-label flex-1 min-w-[140px] bg-white shadow-sm">
          <input
            type="checkbox"
            checked={filters.email}
            onChange={() => dispatch(toggleFilter('email'))}
            className="checkbox"
          />
          <span>Emails</span>
        </label>
        <label className="checkbox-label flex-1 min-w-[140px] bg-white shadow-sm">
          <input
            type="checkbox"
            checked={filters.company}
            onChange={() => dispatch(toggleFilter('company'))}
            className="checkbox"
          />
          <span>Companies</span>
        </label>
      </div>
    </div>
  )
}

function App() {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)
  const searchTerm = useSelector(selectSearchTerm)
  const status = useSelector(selectUsersStatus)
  const error = useSelector(selectUsersError)
  const selectedUser = useSelector(selectSelectedUser)
  const viewMode = useSelector(selectViewMode)
  const sortOrder = useSelector(selectSortOrder)

  const filteredUsers = useSelector(state => selectFilteredUsers(state))

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUsers())
    }
  }, [status, dispatch])

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value))
  }

  const handleSort = () => {
    dispatch(sortUsersByName())
  }

  const handleSelectUser = (userId) => {
    dispatch(selectUser(userId))
  }

  const handleCloseDetail = () => {
    dispatch(clearSelectedUser())
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="loading-dots">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
  }

  if (status === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 rounded-2xl glass-effect max-w-md">
          <svg className="w-12 h-12 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Users</h2>
          <p className="text-gray-500 mb-4">{error}</p>
          <button 
            onClick={() => dispatch(fetchUsers())}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 text-center sm:text-left">
            User Directory
          </h1>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
            <button
              onClick={handleSort}
              className="btn-primary flex items-center justify-center gap-2"
            >
              <span>Sort by Name</span>
              <span className="text-lg">{sortOrder === 'asc' ? '↑' : '↓'}</span>
            </button>
            <button
              onClick={() => dispatch(setViewMode(viewMode === 'grid' ? 'list' : 'grid'))}
              className="btn-secondary"
            >
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
          </div>
        </div>
        
        <div className="space-y-4 mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="input pl-12"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
          <SearchFilters />
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
            {filteredUsers.map(user => (
              <UserGridItem
                key={user.id}
                user={user}
                onSelect={handleSelectUser}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-4 p-4 bg-gray-50/50 rounded-2xl border border-gray-100">
            {filteredUsers.map(user => (
              <UserListItem
                key={user.id}
                user={user}
                onSelect={handleSelectUser}
              />
            ))}
          </div>
        )}

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="glass-effect inline-block p-8 rounded-2xl">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-500 text-lg mb-4">No users found matching your search criteria</p>
              <button 
                onClick={() => dispatch(setSearchTerm(''))}
                className="btn-secondary"
              >
                Clear Search
              </button>
            </div>
          </div>
        )}

        {selectedUser && (
          <UserDetail
            user={selectedUser}
            onClose={handleCloseDetail}
          />
        )}
      </div>
    </div>
  )
}

export default App
