import React from 'react'

interface Type {
    type: {
        name: string
    }
}

interface TypesListProps {
    types: Type[]
    gradient: React.CSSProperties
}

const TypesList: React.FC<TypesListProps> = ({ types, gradient }) => {
    return (
        <ul data-testid="types" className="flex items-center justify-center space-x-2 py-1 px-2 rounded-full text-white overflow-x-auto" style={gradient}>
            {types.map((type, index) => (
                <li
                    key={index}
                    className={`capitalize text-xs ${index !== types.length - 1 ? 'border-r-2 border-white pr-2' : ''} py-1 px-2`}
                >
                    {type.type.name}
                </li>
            ))}
        </ul>
    )
}

export default TypesList
