import { createBrowserRouter } from "react-router-dom"
import RootPage from "./pages/RootPage"
import RegisterPage, { action as registerAction, loader as registerLoader } from "./pages/RegisterPage"
import LoginPage, { action as loginAction, loader as loginLoader } from "./pages/LoginPage"
import SearchPage, { loader as searchLoader, action as searchAction } from "./pages/SearchPage"
import ProfilePage, { loader as profileLoader, action as profileAction } from "./pages/ProfilePage"
import FavoritePage, { loader as favoriteLoader } from "./pages/FavoritePage"
import { action as actionAddFavorite } from "./pages/AddFavorite"
import { action as actionRemoveFavorite } from "./pages/RemoveFavorite"

const router = createBrowserRouter([
    {
        path: "/",
        element: <RootPage />,
        children: [
            {
                index: true,
                loader: searchLoader,
                action: searchAction,
                element: <SearchPage />,
            },
            {
                path: "/profile",
                loader: profileLoader,
                action: profileAction,
                element: <ProfilePage />
            },
            {
                path: "/favorites",
                loader: favoriteLoader,
                element: <FavoritePage />
            },
            {
                path: "/favorites/add",
                action: actionAddFavorite
            },
            {
                path: "/favorites/:pokemonId/remove",
                action: actionRemoveFavorite,
            }
        ]
    },
    {
        path: "/login",
        action: loginAction,
        loader: loginLoader,
        element: <LoginPage />
    },
    {
        path: "/register",
        action: registerAction,
        loader: registerLoader,
        element: <RegisterPage />
    }
])

export default router