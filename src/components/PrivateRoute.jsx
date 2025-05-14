import { useNavigate, Outlet } from "react-router";
import { useEffect } from "react";

export default function PrivateRoute(){
    const navigate = useNavigate()

    useEffect(()=>{
        const auth = JSON.parse(localStorage.getItem('auth'))
        const isValid = auth && new Date(auth.expiresAt) > new Date()

        if(!isValid){
            localStorage.removeItem('auth')
            navigate('/connexion')
            return            
        }
    }, [navigate])


    return <Outlet/>
}