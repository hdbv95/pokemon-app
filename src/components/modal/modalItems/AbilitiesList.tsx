import React from 'react'

interface Ability {
    ability: {
        name: string
    }
}

interface AbilitiesListProps {
    abilities: Ability[]
}

const AbilitiesList: React.FC<AbilitiesListProps> = ({ abilities }) => {
    return (
        <div className="flex flex-col">
            <p className="text-lg font-semibold text-left mb-2">Abilities:</p>
            <ul className="flex items-center justify-start space-x-2 py-1 px-2 overflow-x-auto">
                {abilities.map((ability, index) => (
                    <li
                        key={index}
                        className="capitalize text-center py-1 px-4 text-sm rounded-full bg-blue-400 hover:bg-blue-300 text-white cursor-pointer transition-all duration-300 transform hover:scale-105 whitespace-normal"
                    >
                        {ability.ability.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default AbilitiesList
