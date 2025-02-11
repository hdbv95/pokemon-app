// src/pages/Home.tsx
import { useEffect, useState } from "react"
import { getData, getPage, getSpecificPage } from "../../utils/api"
import { ApiResponse } from "../../types/types"
import Card from "../../components/Card"
import SearchBox from "../../components/searchBox"
import Pagination from "../../components/pagination"
import "../../styles/index.css"

const Home = () => {
    const defaultOffset = 20
    const defaultLimit = 20
    const [data, setData] = useState<ApiResponse>()
    const [searched, setSearched] = useState<any>()
    const [search, setSearch] = useState<string>("")
    const [pages, setPages] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(0)

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
        if (e.currentTarget.textContent) clickedPage = parseInt(e.currentTarget.textContent);
        const params = `?offset=${(clickedPage * defaultLimit) - defaultOffset}&limit=${defaultLimit}`
        setCurrentPage(clickedPage - 1)
        setData(await getSpecificPage(params))
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
                    />
                    : data
                        ? <div className="grid md:grid-cols-4 md:gap-4 grid-cols-2 gap-2">
                            {data.results.map((pokemon, id) => (
                                <Card
                                    key={id}
                                    pokemon={pokemon}
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
        </div>
    )
}

export default Home
