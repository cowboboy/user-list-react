import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { UserStore } from './stores/user-store.js'
import { createContext } from 'react'

export const StoreContext = createContext(null)

ReactDOM.createRoot(document.getElementById('root')).render(
    <StoreContext.Provider value={{
      users: new UserStore()
    }}>
        <App />
    </StoreContext.Provider>,
)
