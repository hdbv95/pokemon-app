import { useEffect, useMemo, useState } from "react"
import { getData, getPage, getSpecificPage } from "../../utils/api"
import { ApiResponse, BasePokemon, PokemonResponse } from "../../types"
import Card from "../../components/Card"
import SearchBox from "../../components/searchBox"
import Pagination from "../../components/pagination"
import "../../styles/index.css"
import Modal from "../../components/modal"
import { useUser } from "../../context/UserContext"
import { Navigate } from "react-router"
import Logout from "../../components/button/logout"

const Home = () => {
    const { user } = useUser()
    const defaultOffset = 20
    const defaultLimit = 20
    const [data, setData] = useState<ApiResponse | null>()
    const [search, setSearch] = useState<string>("")
    const [filteredData, setFilteredData] = useState<BasePokemon[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonResponse | undefined>(undefined)
    const [error, setError] = useState<string>("")

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData()
                setData(response)
                setFilteredData(response?.results || [])
            } catch (err) {
                setError("Failed to fetch Pokémon data. Please try again later.")
            }
        }
        fetchData()
    }, [])

    const pages = useMemo(() => (data ? Math.ceil(data.count / defaultOffset) : 0), [data])

    useEffect(() => {
        if (search.trim()) {
            const filtered = data?.results.filter(pokemon =>
                pokemon.name.toLowerCase().includes(search.toLowerCase())
            )
            setFilteredData(filtered || [])
        } else {
            setFilteredData(data?.results || [])
        }
    }, [search, data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
        setError("")
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (search.trim()) {
            try {
                setError("")
                const response = await getData(search)
                setFilteredData([{ ...response }])
            } catch (error) {
                setError("No results found. Please try a different search.")
            }
        }
    }


    const handleNextPage = async () => {
        const nextpage = data?.next
        if (nextpage) {
            try {
                setCurrentPage(currentPage + 1)
                setData(await getPage(nextpage ?? ""))
                setError("")
            } catch (error) {
                setError("Failed to load next page. Please try again.")
            }
        }
    }

    const handlePrevPage = async () => {
        const prevPage = data?.previous
        if (prevPage) {
            try {
                setCurrentPage(currentPage - 1)
                setData(await getPage(prevPage ?? ""))
                setError("")
            } catch (error) {
                setError("Failed to load next page. Please try again.")
            }
        }
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        let clickedPage = 0
        if (e.currentTarget.textContent) clickedPage = parseInt(e.currentTarget.textContent)
        const params = `?offset=${(clickedPage * defaultLimit) - defaultOffset}&limit=${defaultLimit}`
        setCurrentPage(clickedPage - 1)
        setData(await getSpecificPage(params))
    }

    const handleCardClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        try {
            setIsOpen(true)
            if (e.currentTarget.textContent) setSelectedPokemon(await getData(e.currentTarget.textContent))
            setError("")
        } catch (err) {
            setError("Failed to load Pokémon details. Please try again.")
        }
    }

    const handleModalClose = () => {
        setIsOpen(false)
        setSelectedPokemon(undefined)
    }

    if (!user) {
        return <Navigate to="/login" />
    }

    return (
        <div className="container space-y-4 flex flex-col min-h-screen">
            {error && <div className="text-red-500 text-center">{error}</div>}
            <div className="flex sm:flex-row flex-col-reverse">
                <SearchBox search={search} handleChange={handleChange} handleSubmit={handleSubmit} />
                <Logout />
            </div>
            <div className="md:m-5">
                {filteredData.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {
                            filteredData.map((pokemon, id) => (
                                <Card key={id} pokemon={pokemon} handleCardClick={handleCardClick} />
                            ))

                        }

                    </div>
                ) : (
                    <div className="text-center">No Pokémon found</div>
                )}
            </div>
            <div className="flex justify-center w-full">
                <Pagination
                    currentPage={currentPage}
                    pages={pages}
                    handlePrevPage={handlePrevPage}
                    handleNextPage={handleNextPage}
                    handleClick={handleClick}
                />
            </div>
            {selectedPokemon && <Modal
                isOpen={isOpen}
                handleClose={handleModalClose}
                pokemon={selectedPokemon}
            />
            }
        </div>
    )
}

export default Home
