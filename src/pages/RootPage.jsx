import { Outlet, redirect } from "react-router-dom"
import NavBar from "../components/NavBar"
import { authProvider } from "../services/authService"

export function loader (){
    if(!authProvider.isAuthenticated){
        redirect("/login")
    }
    return null
}

function RootPage(){
    return (<div>
        <Outlet/>
        <NavBar/>
    </div>)
}

export default RootPage