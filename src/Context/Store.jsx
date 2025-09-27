import { createContext, useEffect, useState } from "react";

export const Store = createContext()

export function StoreProvider({children}) {
    const [curretnUser, setCurretnUser] = useState(null)
    const [loading, setloading] = useState(false)
    const Backend_API = 'https://chai-aur-code-backend-exfp.onrender.com/api/v1/users'

    useEffect(() => {
        checkIsLoggedIn()
    }, [])

    const checkIsLoggedIn = async () => {
        setloading(true)
        try {
            const res = await fetch(`${Backend_API}/current-user`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()

            if(data.success) {
                setCurretnUser(data.data)
            }
            setloading(false)
        } catch (error) {
            console.error("failed to call backend to check is logged In!!")
            setloading(false)
        }
    }
    

    const values = {
        Backend_API,
        curretnUser,
        loading,
        setCurretnUser
    }

    return (
        <Store.Provider value={values}>
            {!loading ? children : <p>Loading....</p>}
        </Store.Provider>
    )
}