import { useEffect, useState } from "react"
import { BasePokemon } from "../../types"
import { getData } from "../../utils/api"
import pokeBall from "../../assets/pokeball.png"
import "../../styles/index.css"

interface CardProps {
    pokemon: BasePokemon
    handleCardClick: (e: React.MouseEvent<HTMLDivElement>) => void // Properly typed event
}

const Card: React.FC<CardProps> = ({ pokemon, handleCardClick }) => {
    const [pokemonData, setPokemonData] = useState<any>()

    useEffect(() => {
        const fetchData = async () => {
            setPokemonData(await getData(pokemon.name))
        }
        fetchData()
    }, [pokemon])

    return (
        <div
            className="space-y-4 border-4 py-4 border-double shadow-md rounded-tl-lg rounded-br-lg w-40 h-50 transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg cursor-pointer"
            onClick={handleCardClick}
        >
            <div className="flex justify-center">
                {pokemonData?.sprites.front_default ? (
                    <img className="w-20 h-20" src={pokemonData.sprites.front_default} alt={pokemon.name} />
                ) : (
                    <img className="w-20 h-20" src={pokeBall} alt={pokemon.name} />
                )}
            </div>
            <h2 className="capitalize text-center text-sm break-words">{pokemon.name}</h2>
        </div>
    )
}

export default Card
