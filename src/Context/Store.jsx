import { createContext, useEffect, useState } from "react";

export const Store = createContext()

export function StoreProvider({children}) {
    const [curretnUser, setCurretnUser] = useState(null)
    const [loading, setloading] = useState(false)
    const Backend_API = 'https://chai-aur-code-backend-exfp.onrender.com/api/v1/users'

    useEffect(() => {
        checkIsLoggedIn(true)
    }, [])
    

    const checkIsLoggedIn = async (retry) => {
        setloading(true)
        try {
            const res = await fetch(`${Backend_API}/current-user`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()

            console.log("DATA:",data);
            if(data.success) {
                setCurretnUser(data.data)
            } else if(data.message === 'Token Expired') {
                const refreshed = await refreshTokens()
                if(refreshed && retry) {
                    await checkIsLoggedIn(false)
                }
            }
        } catch (error) {
            console.error("failed to call backend to check is logged In!!")
        } finally {
            setloading(false)
        }
    }

    const refreshTokens = async () => {
        console.log("call refresh token");
        try {
            const res = await fetch(`${Backend_API}/refresh-token`, {
                method: "GET",
                credentials: "include"
            })
            const data = await res.json()

            if(data.success) {
                return true;
            }
        } catch (error) {
            console.error("Failed to refresh accessToken ", error)
        }
        return false;
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
