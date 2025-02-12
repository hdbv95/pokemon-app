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
        <div className="flex flex-col items-start flex-grow">
            <p className="text-lg font-semibold text-left mb-2">Abilities:</p>
            <div className="grid grid-cols-3 gap-2 w-full">
                {abilities.map((ability, index) => (
                    <div
                        key={index}
                        className="capitalize text-center py-1 px-4 text-sm rounded-full bg-blue-400 hover:bg-blue-300 text-white cursor-pointer transition-all duration-300 transform hover:scale-105 break-words"
                    >
                        {ability.ability.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AbilitiesList
