import { redirect, useActionData, useLoaderData } from "react-router-dom"
import { authProvider } from "../services/authService"
import pokeType from "../utils/pokemonTypes.json"
import starActiveImg from "../assets/start-active.svg"
import { pokemonProvider } from "../services/pokemonService"

export async function loader() {
    if (!authProvider.isAuthenticated) return redirect("/login")
    
    try {
        const data = await pokemonProvider.getFavoritePokemonByUser()
        return { data }
    } catch (error) {
        return error
    }
}

function FavoritePage() {

    const { data } = useLoaderData()
    const dataAction = useActionData()

    console.log(dataAction)
    return (<>
        <main className="overflow-scroll">
            <h1 className="text-center text-2xl font-poppins font-bold mt-8">Favorites</h1>
            <div className="flex flex-wrap justify-center mt-8 gap-4">
                {data.map((pokemon) => {
                    return <div key={`pokemon-` + pokemon.id}
                        className="outline outline-1 rounded-xl w-24 h-24 relative"
                        style={{
                            outlineColor: pokeType[pokemon.pokemon_type],
                            backgroundColor: pokeType[pokemon.pokemon_type]
                        }}>
                        <p className="absolute right-1 top-1 text-[10px] font-medium"
                            style={{ color: pokeType[pokemon.pokemon_type] }}>
                            #{pokemon.pokemon_id < 10 ? "00" : pokemon.pokemon_id < 100 ? "0" : ""}{pokemon.pokemon_id}
                        </p>
                        <img className="absolute w-4 top-1 left-1" src={starActiveImg} alt="" />
                        <div className="pt-3 bg-white">
                            <img className="bg-white w-16 mx-auto" src={pokemon.pokemon_avatar_url} alt="" />
                        </div>
                        <h1 className="py-[2px] font-poppins text-center text-[10px] text-white capitalize">{pokemon.pokemon_name}</h1>
                    </div>
                })}
            </div>
        </main>
    </>)
}

export default FavoritePage