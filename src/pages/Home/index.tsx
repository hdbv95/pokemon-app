import { useEffect, useState } from "react"
import { getData, getPage, getSpecificPage } from "../../utils/api"
import { ApiResponse, BasePokemon, PokemonResponse } from "../../types"
import Card from "../../components/Card"
import SearchBox from "../../components/searchBox"
import Pagination from "../../components/pagination"
import "../../styles/index.css"
import Modal from "../../components/modal"
import { useUser } from "../../context/UserContext"
import { Navigate } from "react-router"

const Home = () => {
    const { user } = useUser()
    const defaultOffset = 20
    const defaultLimit = 20
    const [data, setData] = useState<ApiResponse | null>()
    const [searched, setSearched] = useState<BasePokemon | undefined>(undefined)
    const [search, setSearch] = useState<string>("")
    const [pages, setPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonResponse | undefined>(undefined)

    const [isOpen, setIsOpen] = useState<boolean>(false)

    useEffect(() => {
        const fetchData = async () => {
            setData(await getData())
        }
        fetchData()
    }, [])

    useEffect(() => {
        setPages(data ? Math.ceil(data.count / defaultOffset) : 0)
    }, [data])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearched(undefined)
        setSearch(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearched(await getData(search))
    }

    const handleNextPage = async () => {
        const nextpage = data?.next
        setCurrentPage(currentPage + 1)
        setData(await getPage(nextpage ?? ""))
    }

    const handlePrevPage = async () => {
        const prevPage = data?.previous
        setCurrentPage(currentPage - 1)
        setData(await getPage(prevPage ?? ""))
    }

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        let clickedPage = 0
        if (e.currentTarget.textContent) clickedPage = parseInt(e.currentTarget.textContent)
        const params = `?offset=${(clickedPage * defaultLimit) - defaultOffset}&limit=${defaultLimit}`
        setCurrentPage(clickedPage - 1)
        setData(await getSpecificPage(params))
    }

    const handleCardClick = async (e: React.MouseEvent<HTMLDivElement>) => {
        setIsOpen(true)
        if (e.currentTarget.textContent) setSelectedPokemon(await getData(e.currentTarget.textContent))
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
            <SearchBox
                search={search}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <div className="flex-grow">
                {searched
                    ? <Card
                        pokemon={searched}
                        handleCardClick={handleCardClick}
                    />
                    : data
                        ? <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2">
                            {data.results.map((pokemon, id) => (
                                <Card
                                    key={id}
                                    pokemon={pokemon}
                                    handleCardClick={handleCardClick}
                                />
                            ))}
                        </div>
                        : <div>Loading...</div>}
            </div>
            <div className="flex justify-end">
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
