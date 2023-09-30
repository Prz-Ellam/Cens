import { createContext, useReducer } from 'react';

const state = {
    user: null
}

export const context = createContext(state);

export const ContextProvider = ({children}) => {
    
}