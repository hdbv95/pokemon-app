import { getData } from './api'
import axios from 'axios'
import { apiResponse, basePokemonResponse } from './fixtures'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("Api calls", () => {
    test("getData()", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: apiResponse })
        const data = await getData()
        expect(data).toEqual(apiResponse)
    })

    test("getData with parameter", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: basePokemonResponse })
        const data = await getData("bulbasaur")
        expect(data).toEqual(
            {
                "name": "bulbasaur",
                "url": "https://pokeapi.co/api/v2/pokemon/1/"
            })
    })
})