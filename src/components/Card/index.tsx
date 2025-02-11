import { useEffect, useState } from "react"
import { BasePokemon } from "../../types/types"
import { getData } from "../../utils/api"

interface CardProps {
    pokemon: BasePokemon
}

const Card: React.FC<CardProps> = (props) => {
    const [pokemonData, setPokemonData] = useState<any>()

    const { pokemon } = props

    useEffect(() => {
        const fetchData = async () => {
            setPokemonData(await getData(pokemon.name))
        }
        fetchData()
    }, [pokemon])

    return (
        <div className="card">
            <img src={pokemonData?.sprites.front_default} alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
        </div>
    )
}

export default Card