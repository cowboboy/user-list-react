import { useEffect, useState } from 'react'
import './App.css'
import { UserList } from './components/UI/user-list'
import { useFetch } from './hooks/useFetch'
import { UserService } from './services/user-service'

function App() {
  const [users, setUsers] = useState([])
  const [isUsersLoad, setIsUsersLoad] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    (
      async function() {
        try {
          setIsUsersLoad(true)
          setUsers(await UserService.getAll())
        } catch (err) {
          setError(err)
        } finally {
          setIsUsersLoad(false)
        }
      }
    )()
  }, [])
  
  return (
    <div className='wrapper'>
      <UserList users={users} isUsersLoad={isUsersLoad}/>
    </div>
  )
}

export default App
