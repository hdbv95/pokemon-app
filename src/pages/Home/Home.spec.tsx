import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react"
import axios from "axios"
import Home from "./Home"
import { apiResponse } from "../../utils/fixtures"

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("Home", () => {
    test("renders loading", async () => {
        mockedAxios.get.mockResolvedValueOnce(new Promise(() => { }))
        render(<Home />)
        expect(screen.getByText("Loading...")).toBeInTheDocument()
    })
    test("renders list of pokemons", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: apiResponse })
        await act(async () => render(<Home />));
        expect(screen.getByText("bulbasaur")).toBeInTheDocument()
    })
})