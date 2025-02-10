import { useEffect, useState } from "react"
import { getData } from "../../utils/api"
import { ApiResponse } from "../../types/types"
import Card from "../../components/Card"
import SearchBox from "../../components/searchBox"

const Home = () => {
    const [data, setData] = useState<ApiResponse>()
    const [searched, setSearched] = useState<any>()
    const [search, setSearch] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            setData(await getData())
        }
        fetchData()
    }, [])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearched(undefined)
        setSearch(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setSearched(await getData(search))
    }

    return (
        <>
            <SearchBox searchBoxData={{ search, handleChange, handleSubmit }} />
            {searched
                ? <Card pokemon={searched} />
                : data ? data.results.map((pokemon, id) => <Card key={id} pokemon={pokemon} />) : <div>Loading...</div>}
        </>
    )
}

export default Home