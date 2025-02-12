import React from 'react'
import pokeBall from "../../../assets/pokeball.png"

interface PokemonImageProps {
    name: string
    imageUrl: string | null
}

const PokemonImage: React.FC<PokemonImageProps> = ({ name, imageUrl }) => {
    return (
        <div className="flex justify-center">
            {imageUrl ? (
                <img className="w-24 h-24" src={imageUrl} alt={name} />
            ) : (
                <img className="w-12 h-12" src={pokeBall} alt={name} />
            )}
        </div>
    )
}

export default PokemonImage
