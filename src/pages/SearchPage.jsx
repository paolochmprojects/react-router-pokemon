import Button from "../components/Button"
import Input from "../components/Input"
import bulbasaurImg from "../assets/bulbasaur.png"
import { authProvider } from "../services/authService"
import { Form, redirect, useActionData, useLoaderData } from "react-router-dom"
import PokemonCard from "../components/PokemonCard"
import { pokemonApiProvider } from "../services/pokemonApiService"
import { pokemonProvider } from "../services/pokemonService"

export async function loader() {
    if (!authProvider.isAuthenticated) return redirect("/login")

    try {
        const data = await pokemonProvider.getFavoritePokemonByUser()
        return { data }
    } catch (err) {
        return err
    }
}

export async function action({ request }) {

    const formData = await request.formData()
    const { query } = Object.fromEntries(formData)

    if (query === "") return null

    try {
        return await pokemonApiProvider.searchPokemon(query)
    } catch (err) {
        return err
    }
}

function SearchPage() {

    const data = useActionData()
    const { data: pokeFav } = useLoaderData()

    return (
        <main>
            <Form className="flex mx-10 mt-8" method="POST">
                <div className="w-2/3">
                    <Input name="query" type="text" placeholder="bulbasaur" required={true} />
                </div>
                <div className="w-1/3 pl-4">
                    <Button text="search" style="primary" type="submit" />
                </div>
            </Form>
            {!data && <div className="mt-16 flex flex-col justify-center items-center">
                <img src={bulbasaurImg} alt="bulbasaur-preview" />
                <p className="mt-4">Ready to search</p>
            </div>}

            {data instanceof Error && <div
                className="mt-3 bg-red-500 rounded-full text-center p-2 text-white font-poppins">
                {data.message}
            </div>}
            {data && !(data instanceof Error) && <PokemonCard data={data} pokeFav={pokeFav} />}
        </main>)
}

export default SearchPage