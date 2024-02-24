import { redirect } from "react-router-dom"
import { authProvider } from "./authService"
import settings from "./settings"

export const pokemonProvider = {
    currentPokemonId: null,
    async getFavoritePokemonByUser() {
        const options = {
            headers: {
                Authorization: "Bearer " + authProvider.token
            }
        }

        const url = settings.BASEURL + "favorites"
        const response = await fetch(url, options)

        if (response.ok) {
            return await response.json()
        }

        if (response.status === 401) {
            authProvider.logout()
            return redirect("/login")
        }
    },

    async addFavoritePokemonByUser(data) {
        const options = {
            method: "POST",
            headers: {
                Authorization: "Bearer " + authProvider.token
            },
            body: JSON.stringify(data)
        }

        const url = settings.BASEURL + "favorites"
        const response = await fetch(url, options)

        if (response.ok) {
            return await response.json()
        }

        if (response.status === 401) {
            authProvider.logout()
            return redirect("/login")
        }
    },

    async removeFavoritePokemonById(id) {
        if (!id) throw new Error("Algo paso aqui")

        const options = {
            method: "DELETE",
            headers: {
                Authorization: "Bearer " + authProvider.token
            }
        }

        const url = settings.BASEURL + "favorites/" + id
        const response = await fetch(url, options)

        if (response.ok) {
            return true
        }

        if (response.status === 401) {
            authProvider.logout()
            return redirect("/login")
        }

        return false
    }
}
