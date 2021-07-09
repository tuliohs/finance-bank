import React, { createContext, useState } from 'react'
import Context from './StoreContext'
import useStorage from 'utils/hooks/useStorage'
import { THEMES } from 'utils/constants';

const defaultSettings = {
  theme: THEMES.LIGHT,
}

const StoreContext = createContext({
  settings: defaultSettings,
  saveSettings: () => { },
  user: {},
  setUser: () => { },
  token: "",
})
export default StoreContext;

export const StoreProvider = ({ children }) => {
  const [token, setToken, removeToken] = useStorage('token')

  const [user, setUser] = useState({})
  const [settings, saveSettings] = useState({ theme: THEMES.LIGHT })

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        removeToken,
        user,
        setUser,
        settings,
        saveSettings
      }}
    >
      {children  /*is the component received*/}
    </Context.Provider>
  )
}

