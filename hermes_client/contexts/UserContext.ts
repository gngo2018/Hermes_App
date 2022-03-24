import { createContext, useContext } from 'react'

export type UserState = {
    userName: string
    setUserName: (n: string) => void
}

export const UserContext = createContext<UserState>({
    userName: 'Guest',
    setUserName: (n:string) => {}
});

export const useUserContext = () => useContext(UserContext);