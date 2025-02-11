import React from 'react'
import { PokemonResponse, typeColors } from '../../types'
import pokeBall from "../../assets/pokeball.png"
import "../../styles/index.css"

interface ModalProps {
    isOpen: boolean
    handleClose: () => void
    pokemon: PokemonResponse
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, pokemon }) => {

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const getGradient = () => {
        if (pokemon.types.length === 1) {
            const type = pokemon.types[0].type.name;
            const colorStart = typeColors[type][0];
            const colorEnd = typeColors[type][1];
            return {
                background: `linear-gradient(to bottom, ${colorStart}, ${colorEnd})`
            };
        }
        if (pokemon.types.length > 1) {
            const colorStart = typeColors[pokemon.types[0].type.name][0];  // First type color start
            const colorEnd = typeColors[pokemon.types[1].type.name][1];    // Second type color end
            return {
                background: `linear-gradient(to bottom, ${colorStart}, ${colorEnd})`
            };
        }
        return {
            background: `linear-gradient(to bottom, #FFFFFF, #FFFFFF)`
        };
    };

    return !isOpen || !pokemon ? null : (
        <div
            className="fixed inset-0 flex items-center justify-center bg-gray-800/60 z-50"
            onClick={handleClose}
        >
            <div
                className="relative w-full max-w-lg p-6 rounded-lg shadow-lg bg-white border-4 border-double"
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900 cursor-pointer"
                    onClick={handleClose}
                >
                    ×
                </button>
                <div className="container space-y-4">
                    <h2 className="capitalize text-xl font-semibold">{pokemon.name}</h2>
                    <div className="flex justify-center">
                        {pokemon?.sprites.front_default ? (
                            <img className="w-50 h-50" src={pokemon.sprites.front_default} alt={pokemon.name} />
                        ) : (
                            <img className="w-10 h-10" src={pokeBall} alt={pokemon.name} />
                        )}
                    </div>
                    <p>ID: {pokemon.id}</p>
                    <p>Height: {pokemon.height} decimetres</p>
                    <p>Weight: {pokemon.weight} hectograms</p>
                    <p>Types:</p>
                    <ul
                        className="flex items-center justify-center space-x-3 py-2 px-4 rounded-full text-white"
                        style={getGradient()}
                    >
                        {pokemon.types.map((type, index) => (
                            <li
                                key={index}
                                className={`capitalize ${index !== pokemon.types.length - 1 ? 'border-r-2 border-white pr-3' : ''}`}
                            >
                                {type.type.name}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Modal
