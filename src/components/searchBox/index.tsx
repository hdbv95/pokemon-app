interface SearchBoxProps {
    search: string
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ search, handleChange, handleSubmit }) => {

    return (
        <form className="space-x-1 justify-items-center" onSubmit={handleSubmit}>
            <input className="border-4 border-double" type="text" placeholder="Search..." value={search} onChange={handleChange} />
            <button className="bg-sky-500 px-1 py-1 font-semibold text-white enabled:cursor-pointer disabled:bg-gray-800/30" type="submit" disabled={!search.trim()}>Search</button>
        </form>
    )
}

export default SearchBox