import React from 'react'

interface PokemonInfoProps {
    id: number
    height: number
    weight: number
}

const PokemonInfo: React.FC<PokemonInfoProps> = ({ id, height, weight }) => {
    return (
        <div className="grid grid-cols-3 gap-x-2 text-xs font-medium text-gray-700">
            <p>ID: {id}</p>
            <p>Height: {height} dm</p>
            <p>Weight: {weight} hg</p>
        </div>
    )
}

export default PokemonInfo
