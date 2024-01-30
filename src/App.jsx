import './App.css'
import { UserList } from './components/user-list/user-list'
import UIModalStore from './stores/user-modal-store'
import { Modal } from './components/UI/modal/modal'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { StoreContext } from './main'

const modal = new UIModalStore()

const App = observer(() => {
  const {users} = useContext(StoreContext)
  return (
      <>
        <input style={{width: "1200px"}} onChange={(e) => users.getAll(e.target.value)} placeholder="Поиск..."></input>
        <Modal isVisible={modal.isVisible} hide={modal.hide} userId={modal.userId}/>
        <div className='wrapper'>
          <UserList showUser={modal.show}/>
        </div>
      </>
  )
})

export default App
