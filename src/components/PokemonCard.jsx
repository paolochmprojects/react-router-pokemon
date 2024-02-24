import Button from "./Button"
import StartImg from "../assets/start.svg"
import StartActiveImg from "../assets/start-active.svg"
import pokeTypes from "../utils/pokemonTypes.json"
import heightImg from "../assets/height.svg"
import weightImg from "../assets/weight.svg"
import { useFetcher } from "react-router-dom"

function PokemonCard({ data, pokeFav }) {

    const fetcher = useFetcher()
    const { id, height, name, types, weight, imgUrl } = data

    const favorite = pokeFav.find(poke => poke.pokemon_id === id.toString())

    console.log("fav:",favorite)

    return (<>
        <div className="w-56 mx-auto mt-8">
            <h1 className="text-center font-poppins font-bold text-2xl capitalize">{name}</h1>
            <h3 className="text-center font-poppins text-md font-bold">#{id < 10 ? "00" : id < 100 ? "0" : ""}{id}</h3>
            <img src={imgUrl} className="w-28 mx-auto" alt={`pokemon-${id}`} />
            <div className="flex gap-2 justify-center flex-wrap capitalize">
                {types.map((type, index) => {
                    return <div key={`type-${index}`}
                        className="text-white font-semibold text-xs font-poppins py-1 px-2 rounded-full"
                        style={{ background: pokeTypes[type] }}>
                        {type}
                    </div>
                })}
            </div>
            <div className="flex justify-center my-9 h-12 text-gray-500">
                <div className="h-full w-1/2 flex flex-col gap-2 justify-center items-center">
                    <div className="flex gap-2 w-full justify-center">
                        <img src={weightImg} alt="weight" />
                        <p className="text-sm">{weight} kg</p>
                    </div>
                    <p className="text-xs">
                        Weight
                    </p>
                </div>
                <div className="h-full w-1/2 flex flex-col gap-2 justify-center items-center border-l-2">
                    <div className="flex gap-2 w-full justify-center">
                        <img src={heightImg} alt="height" />
                        <p className="text-sm">{height} m</p>
                    </div>
                    <p className="text-xs">
                        Height
                    </p>
                </div>
            </div>

            {!favorite ? <fetcher.Form className="w-40 mx-auto" 
                    action="/favorites/add" method="POST">
                <input className="hidden" type="text" name="pokemon_name" defaultValue={name} />
                <input className="hidden" type="number" name="pokemon_id" defaultValue={id} />
                <input className="hidden" type="text" name="pokemon_type" defaultValue={types[0]} />
                <input className="hidden" type="text" name="pokemon_avatar_url" defaultValue={imgUrl} />
                <Button type="submit" text="Mark as Favorite" icon={StartImg} style="primary" />
            </fetcher.Form>:
            <fetcher.Form className="w-40 mx-auto" 
                    action={`/favorites/${favorite.id}/remove`} method="POST">
                <Button type="submit" text="Remove Favorite" icon={StartActiveImg} style="primary" />
            </fetcher.Form>}
        </div>
    </>)
}

export default PokemonCard