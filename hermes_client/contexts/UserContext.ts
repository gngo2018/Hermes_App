import { createContext, useContext } from 'react'

export type UserState = {
    userName: string
    setUserName: (n: string) => void
    profileColor: string
    setProfileColor: (c: string) => void
}

export const UserContext = createContext<UserState>({
    userName: 'Guest',
    setUserName: (n:string) => {},
    profileColor: 'red',
    setProfileColor: (c:string) => {}
});

export const useUserContext = () => useContext(UserContext);