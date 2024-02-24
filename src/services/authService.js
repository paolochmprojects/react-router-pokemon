import { redirect } from "react-router-dom";
import settings from "./settings";

const tokenKey = "router-auth-token";
const savedToken = window.localStorage.getItem(tokenKey);

export const authProvider = {
    isAuthenticated: savedToken !== null,
    token: savedToken,
    async login({ email, password }) {

        const url = settings.BASEURL + "login";

        const options = {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, options);
        if (response.ok) {
            const body = await response.json();
            authProvider.isAuthenticated = true;
            authProvider.token = body.token;
            window.localStorage.setItem(tokenKey, body.token);
        } else {
            const error = await response.json();
            throw new Error(error.errors);
        }
    },

    // TODO: fix json response.
    async register({ email, password, name, lastName }) {

        const data = {
            email: email,
            password: password,
            first_name: name,
            last_name: lastName,
        }

        const url = settings.BASEURL + "signup"

        const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(url, options)

        if (response.ok) {
            redirect("/login")
        } else {
            let data
            try {
                data = await response.json();
            } catch (error) {
                throw new Error(response.statusText)
            }

            if (typeof data.errors === "object") {
                const errors = Object.entries(data.errors)
                const mensages = errors.map(([key, value])=>`${key}: ${value}`)
                throw new Error(mensages)
            }
        }

    },

    logout() {
        window.localStorage.removeItem(tokenKey);
        authProvider.isAuthenticated = false;
        authProvider.token = null;
    },
};