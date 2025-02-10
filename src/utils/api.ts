import axios from "axios"

const baseURL = "https://pokeapi.co/api/v2/pokemon"

export async function getData(param?: string) {
    const url = param ? `${baseURL}/${param}` : baseURL
    const response = await axios.get(url)
    return response.data
}