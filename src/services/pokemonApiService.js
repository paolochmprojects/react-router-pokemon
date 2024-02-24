import settings from "./settings"

export const pokemonApiProvider = {
    currentPokemon: null, //  must an id for current pokemon loking for
    async searchPokemon(query) {
        const url = settings.POKEMONURL + "pokemon/" + query.toString().toLowerCase()

        const response = await fetch(url)

        if (response.ok) {
            let data;
            data = await response.json()

            return {
                id: data.id,
                height: data.height,
                name: data.name,
                types: data.types.map(type => type.type.name),
                weight: data.weight,
                imgUrl: data.sprites.other['official-artwork'].front_default
            }
        }

        if (response.status === 404) {
            throw new Error(`Error: ${query} pokemon dosen't exist`)
        }
    }
}