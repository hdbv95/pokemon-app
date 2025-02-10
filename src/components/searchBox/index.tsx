interface SearchBoxProps {
    searchBoxData: {
        search: string
        handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
        handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    }
}

const SearchBox: React.FC<SearchBoxProps> = (props) => {
    const { search, handleChange, handleSubmit } = props.searchBoxData

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search..." value={search} onChange={handleChange} />
            <button type="submit" disabled={!search.trim()}>Search</button>
        </form>
    )
}

export default SearchBox