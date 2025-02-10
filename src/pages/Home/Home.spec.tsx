import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react"
import Home from "./Home"
import { apiResponse } from "../../utils/fixtures"
import { getData } from "../../utils/api"

jest.mock('../../utils/api')
const mockedGetData = getData as jest.MockedFunction<typeof getData>

describe("Home", () => {
    test("renders loading", async () => {
        mockedGetData.mockResolvedValueOnce(new Promise(() => { }))
        render(<Home />)
        expect(screen.getByText("Loading...")).toBeInTheDocument()
    })
    test("renders list of pokemons", async () => {
        mockedGetData.mockResolvedValueOnce(apiResponse)
        await act(async () => render(<Home />));
        expect(screen.getByText("bulbasaur")).toBeInTheDocument()
    })
})