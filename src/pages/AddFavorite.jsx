import { authProvider } from "../services/authService"
import settings from "../services/settings"

export async function action ({request}){
    const formData = await request.formData()
    const data = Object.fromEntries(formData)


    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authProvider.token
        }
    }

    console.log(options)
    const url = settings.BASEURL + "favorites"
    const response = await fetch(url, options)
    
    if (response.ok){
        console.log(await response.json())
    }

    return null
}