import axios from "axios"

const baseURL = "https://pokeapi.co/api/v2/pokemon"

export async function getData(param?: string) {
    try {
        const url = param ? `${baseURL}/${param}` : baseURL
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error("Error fetching data:", error)
        throw error
    }
}

export async function getPage(url: string) {
    try {
        const response = await axios.get(url)
        return response.data
    } catch (error) {
        console.error("Error fetching page:", error)
        throw error
    }
}

export async function getSpecificPage(params: string) {
    try {
        const response = await axios.get(`${baseURL}${params}`)
        return response.data
    } catch (error) {
        console.error("Error fetching specific page:", error)
        throw error
    }
}