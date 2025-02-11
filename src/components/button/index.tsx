interface ButtonProps {
    handleClick: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void) | undefined
    value: string | number
    isDisabled: boolean
}

const Button: React.FC<ButtonProps> = ({ handleClick, value, isDisabled }) => {

    return (
        <button
            className="bg-sky-500 px-1 py-1 text-white disabled:bg-gray-800/30 text-sm cursor-pointer"
            onClick={handleClick}
            disabled={isDisabled}
        >
            {value}
        </button>
    )
}

export default Button