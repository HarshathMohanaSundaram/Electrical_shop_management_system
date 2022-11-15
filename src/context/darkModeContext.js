import { useReducer } from "react"
import { createContext } from "react"
import DarkModeReducer from "./darkModeReducer"
import React from "react"

const INITITAL_MODE={
    darkMode : false
}

export const DarkModeContext = createContext(INITITAL_MODE)

export const DarkModeContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(DarkModeReducer, INITITAL_MODE);

    return <DarkModeContext.Provider value={{darkMode: state.darkMode, dispatch}}>{children}</DarkModeContext.Provider>
}