interface ButtonProps {
    handleClick: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
    value: string | number
    isDisabled: boolean
}

const Button: React.FC<ButtonProps> = ({ handleClick, value, isDisabled }) => {

    return (
        <button
            className="bg-sky-500 px-3 py-1 text-white disabled:bg-gray-800/30 text-xs enabled:cursor-pointer"
            onClick={handleClick}
            disabled={isDisabled}
        >
            {value}
        </button>
    )
}

export default Button