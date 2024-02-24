import Input from "../components/Input";
import Button from "../components/Button";
import { Form, redirect, useActionData, useNavigate } from "react-router-dom";
import { authProvider } from "../services/authService";

export function loader() {
    if (authProvider.isAuthenticated) {
        return redirect("/")
    }
    return null
}

export async function action({ request }) {
    const formData = await request.formData()
    const data = Object.fromEntries(formData)

    try {
        await authProvider.register(data)
        return redirect("/login")
    } catch (err) {
        return err
    }
}

function RegisterPage() {

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
                {error && <div className="bg-red-500 rounded-2xl p-2 text-sm text-white font-poppins capitalize">
                    {error.message.split(",").join("\n")}
                </div>}
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
                <div>
                    <label htmlFor="nameInput">Name</label>
                    <Input id="nameInput"
                        name="name"
                        type="name"
                        placeholder="Hiklief"
                        required={true} />
                </div>
                <div>
                    <label htmlFor="lastNameInput">Last Name</label>
                    <Input id="lastNameInput"
                        name="lastName"
                        type="name"
                        placeholder="Rodriguez"
                        required={true} />
                </div>
                <Button text="Create Account" type="submit" style="primary" />
                <Button onClick={() => navigate("/login")} text="Login" type="button" style="secondary" />
            </Form>
        </main>
    </>)
}

export default RegisterPage