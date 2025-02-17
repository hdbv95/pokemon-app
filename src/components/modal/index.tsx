import React, { useEffect, useState } from 'react'
import { PokemonResponse, typeColors } from '../../types'
import PokemonImage from './modalItems/PokemonImage'
import PokemonInfo from './modalItems/PokemonInfo'
import AbilitiesList from './modalItems/AbilitiesList'
import TypesList from './modalItems/TypesList'
import MovesList from './modalItems/MovesList'
import "../../styles/index.css"

interface ModalProps {
    isOpen: boolean
    handleClose: () => void
    pokemon: PokemonResponse
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, pokemon }) => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true)
        } else {
            setTimeout(() => setIsVisible(false), 300)
        }
    }, [isOpen])

    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation()
    }

    const getGradient = () => {
        if (pokemon.types.length === 1) {
            const type = pokemon.types[0].type.name
            const colorStart = typeColors[type][0]
            const colorEnd = typeColors[type][1]
            return {
                background: `linear-gradient(to bottom, ${colorStart}, ${colorEnd})`
            }
        }
        if (pokemon.types.length > 1) {
            const colorStart = typeColors[pokemon.types[0].type.name][0]
            const colorEnd = typeColors[pokemon.types[1].type.name][1]
            return {
                background: `linear-gradient(to bottom, ${colorStart}, ${colorEnd})`
            }
        }
        return {
            background: `linear-gradient(to bottom, #FFFFFF, #FFFFFF)`
        }
    }

    return !isOpen || !pokemon ? null : (
        <div
            className={`fixed inset-0 flex items-center justify-center bg-gray-800/60 z-50 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} transition-opacity duration-300`}
            onClick={handleClose}
        >
            <div
                className={`relative w-[100%] max-w-[500px] h-[100%] max-h-[500px] p-4 flex flex-col items-center md:max-h-none md:h-auto md:overflow-visible overflow-auto rounded-lg bg-white border-4 border-double ${isVisible ? 'transform translate-y-0' : 'transform translate-y-10'} transition-transform duration-300`}
                onClick={handleModalClick}
            >
                <button
                    className="absolute top-2 right-2 text-xl font-bold text-gray-700 hover:text-gray-900 cursor-pointer"
                    onClick={handleClose}
                >
                    ×
                </button>

                <div className="flex flex-col items-center space-y-3 w-full">
                    <div className="flex flex-col items-center space-y-1 w-full">
                        <div className="flex items-center space-x-2 w-full justify-center">
                            <h2 className="capitalize text-xl font-semibold text-center">{pokemon.name}</h2>
                        </div>
                        <TypesList types={pokemon.types} gradient={getGradient()} />
                        <PokemonImage name={pokemon.name} imageUrl={pokemon?.sprites.front_default} />
                    </div>

                    <PokemonInfo id={pokemon.id} height={pokemon.height} weight={pokemon.weight} />

                    <AbilitiesList abilities={pokemon.abilities} />

                    <MovesList moves={pokemon.moves} />
                </div>
            </div>
        </div>
    )
}

export default Modal
