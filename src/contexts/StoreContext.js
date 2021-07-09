import React, { createContext, useState } from 'react'
import Context from './StoreContext'
import useStorage from 'utils/hooks/useStorage'

const StoreContext = createContext({})
export default StoreContext;

export const StoreProvider = ({ children }) => {
  const [token, setToken, removeToken] = useStorage('token')

  const [user, setUser] = useState({})
  return (
    <Context.Provider
      value={{
        token,
        setToken,
        removeToken,
        user,
        setUser
      }}
    >
      {children  /*is the component received*/}
    </Context.Provider>
  )
}

