import { pokemonProvider } from "../services/pokemonService"

export async function action({ params }) {

    const {pokemonId } = params

    try {
        return await pokemonProvider.removeFavoritePokemonById(pokemonId)
    } catch (error) {
        return error
    }
}