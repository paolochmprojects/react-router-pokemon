import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import { authProvider } from "../services/authService";


export async function loader() {
    // verified user authenticated
    if (authProvider.isAuthenticated) return redirect("/")
    return null
}

export async function action({ request }) {

    // get data
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await authProvider.login(data)
    } catch (err) {
        return err
    }
    return null
}

function LoginPage() {

    const navigate = useNavigate()
    const error = useActionData()

    return (<>
        <main className="max-w-96 mx-auto">
            <h1 className="mt-24 mx-16 text-2xl text-center font-poppins font-bold">
                Welcome to Poke Collection
            </h1>
            <Form
                method="POST"
                className="mt-12 mx-14 flex flex-col gap-8">
                {error&&<div className="bg-red-500 rounded-full text-center p-2 text-white font-poppins">{error.message}</div>}
                <div>
                    <label htmlFor="emailInput">Email</label>
                    <Input id="emailInput"
                        name="email"
                        type="email"
                        placeholder="example@mail.com"
                        required={true} />
                </div>
                <div>
                    <label htmlFor="passwordInput">Password</label>
                    <Input id="passwordInput"
                        name="password"
                        type="password"
                        placeholder="*******"
                        required={true} />
                </div>
                <Button text="Login" type="submit" style="primary" />
                <Button onClick={() => navigate("/register")} text="Create Account" type="button" style="secondary" />
            </Form>
        </main>
    </>)
}

export default LoginPage