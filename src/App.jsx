import { useEffect, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list/user-list'
import { UserService } from './services/user-service'
import { ObservableUserStore } from './stores/userStore'

function App() {
  const [users, setUsers] = useState([])
  const [isUsersLoad, setIsUsersLoad] = useState(false)
  const [error, setError] = useState(null)

  

  const userStore = new ObservableUserStore()
  
  return (
    <div className='wrapper'>
      <UserList userStore={userStore}/>
    </div>
  )
}

export default App
