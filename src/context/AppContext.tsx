import { ISelectOptions } from '@interfaces/index'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AppContextProps {
  userNameGlobalValue: any
  stateGlobalValue: any
  cityGlobalValue: any
  setUserNameGlobalValue: any
  setStateGlobalValue: any
  setCityGlobalValue: any
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

const AppProvider: React.FC = ({ children }) => {
  const [userNameGlobalValue, setUserNameGlobalValue] = useState<string>('')
  const [stateGlobalValue, setStateGlobalValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )
  const [cityGlobalValue, setCityGlobalValue] = useState<ISelectOptions>(
    {} as ISelectOptions
  )

  const getValuesInStorage = () => {
    const userNameItem = localStorage.getItem('user-name')
    const regionStateItem = localStorage.getItem('region-state')
    const regionCityItem = localStorage.getItem('region-city')

    setUserNameGlobalValue(String(userNameItem))
    setStateGlobalValue(JSON.parse(JSON.stringify(regionStateItem)))
    setCityGlobalValue(JSON.parse(JSON.stringify(regionCityItem)))
  }

  useEffect(() => {
    getValuesInStorage()
  }, [])

  return (
    <AppContext.Provider
      value={{
        userNameGlobalValue,
        stateGlobalValue,
        cityGlobalValue,
        setUserNameGlobalValue,
        setStateGlobalValue,
        setCityGlobalValue
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
