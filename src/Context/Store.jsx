import { createContext, useEffect, useState } from "react";

export const Store = createContext()

export function StoreProvider({children}) {
    const [curretnUser, setCurretnUser] = useState(null)
    const [token, setToken] = useState('');
    const Backend_API = 'http://localhost:8000/api/v1/users'

    useEffect(() => {
        checkIsLoggedIn()
    }, [])

    const checkIsLoggedIn = async () => {
        try {
            const res = await fetch(`${Backend_API}/current-user`)
            const data = await res.json()

            if(data.success) {
                setCurretnUser(data.data)
            }
        } catch (error) {
            console.error("failed to call backend to check is logged In!!")
        }
    }
    

    const values = {
        Backend_API,
        curretnUser,
        token,
        setToken,
        setCurretnUser
    }

    return (
        <Store.Provider value={values}>
            {children}
        </Store.Provider>
    )
}