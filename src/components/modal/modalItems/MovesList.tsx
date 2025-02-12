import React from 'react'

interface Move {
    move: {
        name: string
    }
}

interface MovesListProps {
    moves: Move[]
}

const MovesList: React.FC<MovesListProps> = ({ moves }) => {
    return (
        <div className="flex flex-col items-start flex-grow">
            <p className="text-lg font-semibold text-left mb-2">Moves:</p>
            <div className="grid grid-cols-3 gap-2 w-full">
                {moves.slice(0, 12).map((move, index) => (
                    <div
                        key={index}
                        className="capitalize text-center py-1 px-3 text-sm rounded-full bg-blue-500 hover:bg-blue-400 text-white cursor-pointer transition-all duration-300 transform hover:scale-105 break-words"
                    >
                        {move.move.name}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MovesList
