import { ISelectOptions } from '@interfaces/index'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AppContextProps {
  userNameValue: string
  stateValue: ISelectOptions
  cityValue: ISelectOptions
}

export const AppContext = createContext<AppContextProps>({} as AppContextProps)

const AppProvider: React.FC = ({ children }) => {
  const [userNameValue, setUserNameValue] = useState<string>('')
  const [stateValue, setStateValue] = useState<ISelectOptions>({} as ISelectOptions)
  const [cityValue, setCityValue] = useState<ISelectOptions>({} as ISelectOptions)

  const getValuesInStorage = () => {
    const userNameItem = localStorage.getItem('user-name')
    const regionStateItem = localStorage.getItem('region-state')
    const regionCityItem = localStorage.getItem('region-city')

    setUserNameValue(String(userNameItem))
    setStateValue(JSON.parse(JSON.stringify(regionStateItem)))
    setCityValue(JSON.parse(JSON.stringify(regionCityItem)))
  }

  useEffect(() => {
    getValuesInStorage()
  }, [])

  return (
    <AppContext.Provider
      value={{
        userNameValue,
        stateValue,
        cityValue
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useAppContext = () => useContext(AppContext)

export default AppProvider
