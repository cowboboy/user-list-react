import './App.css'
import { UserList } from './components/user-list/user-list'
import UIModalStore from './stores/user-modal-store'
import { Modal } from './components/UI/modal/modal'
import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import { StoreContext } from './main'
import { SearchInput } from './components/UI/search-input/search-input'

const modal = new UIModalStore()

const App = observer(() => {
  const {users} = useContext(StoreContext)
  return (
      <div className="wrapper">
        
        <Modal isVisible={modal.isVisible} hide={modal.hide} userId={modal.userId}/>
        <div className='content'>
          <SearchInput onChange={e => users.getAll(e.target.value)}/>
          <UserList showUser={modal.show}/>
        </div>
      </div>
  )
})

export default App
