import { useEffect, useState } from 'react'
import './App.css'
import { UserList } from './components/user-list/user-list'
import { ObservableUserStore } from './stores/userStore'

function App() {
  const userStore = new ObservableUserStore()
  
  return (
    <div>
        <input style={{width: "1200px"}} onChange={(e) => userStore.getAllAsync(e.target.value)} placeholder="Поиск..."></input>
        <div className='wrapper'>
            <UserList userStore={userStore}/>
        </div>
    </div>
  )
}

export default App
