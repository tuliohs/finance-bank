import React, { createContext, useEffect, useState } from 'react'
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
  message: {},
  setMessage: () => { },
  token: "",
  setToken: () => { },
  currentSettings: { theme: THEMES.LIGHT }
})
export default StoreContext;

export const StoreProvider = ({ children }) => {
  //-------------User Config----------------------
  const [token, setToken, removeToken] = useStorage('token')
  const [user, setUser] = useState({})


  const [message, setMessage] = useState({});

  //-------------Theme----------------------------
  const [currentSettings, setCurrentSettings, restoreSettings] = useStorage('theme')
  const handleSaveSettings = () => {
    if (currentSettings?.theme === THEMES.DARK)
      setCurrentSettings({ theme: THEMES.LIGHT });
    else setCurrentSettings({ theme: THEMES.DARK });
  }
  useEffect(() => {
    const restoredSettings = restoreSettings();
    if (restoredSettings) {
      setCurrentSettings(restoredSettings);
    }
  }, [])

  return (
    <Context.Provider
      value={{
        token,
        setToken,
        removeToken,
        user,
        setUser,
        settings: currentSettings,
        saveSettings: handleSaveSettings,
        message, setMessage
      }}
    >
      {children  /*is the component received*/}
    </Context.Provider>
  )
}

