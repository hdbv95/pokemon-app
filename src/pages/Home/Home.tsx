import { useEffect, useState } from "react"
import { getData } from "../../utils/api"
import { ApiResponse } from "../../types/types"

const Home = () => {
    const [data, setData] = useState<ApiResponse>()

    useEffect(() => {
        const fetchData = async () => {
            setData(await getData())
        }
        fetchData()
    }, [])

    return (
        <>
            {data ? data.results.map((pokemon, id) => <div key={id}>{pokemon.name}</div>) : <div>Loading...</div>}
        </>
    )
}

export default Home