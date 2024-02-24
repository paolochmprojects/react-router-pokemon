import Input from "../components/Input";
import Button from "../components/Button";
import { authProvider } from "../services/authService";
import { Form, redirect, useLoaderData } from "react-router-dom";
import settings from "../services/settings";


export async function loader() {
    if (!authProvider.isAuthenticated) return redirect("/login")

    const option = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + authProvider.token
        }
    }

    const url = settings.BASEURL + "profile"

    const response = await fetch(url, option)

    if (response.ok) {
        const data = await response.json()
        return data
    } else {
        authProvider.logout()
        return redirect("/login")
    }
}

export async function action({ request }) {

    console.log("i was here")
    
    const formData = await request.formData()
    const {name, email, lastName} = Object.fromEntries(formData)

    const body = {
        first_name: name,
        last_name: lastName,
        email: email
    }    

    const url = settings.BASEURL + "profile"

    const options = {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + authProvider.token
        }
    }

    const response = await fetch(url, options)

    if (response.status === 401 ) {
        authProvider.logout()
        redirect("/login")
    }

    if (response.ok){
        const data = await response.json()
        return { data }
    } 

    return null
}

function ProfilePage() {

    const { first_name, last_name, email } = useLoaderData()

    return (<>
        <main className="max-w-96 mx-auto">
            <h1 className="mt-24 mx-16 text-2xl text-center font-poppins font-bold">
                Profile
            </h1>
            <Form
                method="POST"
                className="mt-12 mx-14 flex flex-col gap-8">
                <div>
                    <label htmlFor="emailInput">Email</label>
                    <Input id="emailInput"
                        name="email"
                        type="email" 
                        placeholder="example@mail.com" 
                        defaultValue={email}/>
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <Input id="passwordInput" 
                        type="password"
                        placeholder="*******" 
                        />
                </div>
                <div>
                    <label htmlFor="nameInput">Name</label>
                    <Input id="nameInput"
                        name="name"
                        type="name"
                        placeholder="Hiklief" 
                        defaultValue={first_name}/>
                </div>
                <div>
                    <label htmlFor="lastNameInput">Last Name</label>
                    <Input id="lastNameInput"
                        name="lastName"
                        type="name" 
                        placeholder="Rodriguez" 
                        defaultValue={last_name}/>
                </div>
                <Button text="Update" type="submit" style="primary" />
            </Form>
        </main>
    </>)
}

export default ProfilePage