import axios from "axios"

const baseURL = "https://pokeapi.co/api/v2/pokemon"

export async function getData(param?: string) {
    const response = await axios.get(new URL(param ?? '', baseURL).toString())
    return response.data
}