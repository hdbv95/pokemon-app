import searchIcon from "../../assets/searchIcon.svg"

interface SearchBoxProps {
    search: string;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ search, handleChange, handleSubmit }) => {
    return (
        <form className="flex items-center gap-2 w-full max-w-md mx-auto" onSubmit={handleSubmit}>
            <input
                className="border-2 border-gray-400 rounded-md px-3 py-2 w-full md:w-auto"
                type="text"
                placeholder="Search..."
                value={search}
                onChange={handleChange}
            />
            <button
                className="bg-sky-500 p-2 rounded-md text-white enabled:cursor-pointer disabled:bg-gray-400 flex items-center justify-center"
                type="submit"
                disabled={!search.trim()}
            >
                <img src={searchIcon} alt="Search" className="w-5 h-5" />
            </button>
        </form>
    );
};

export default SearchBox;
