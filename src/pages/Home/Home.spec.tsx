import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import Home from "."
import { apiResponse } from "../../utils/fixtures"
import { getData } from "../../utils/api"

jest.mock('../../utils/api')
const mockedGetData = getData as jest.MockedFunction<typeof getData>
jest.spyOn(require('../../context/UserContext'), 'useUser').mockReturnValue({
    user: { name: "test user" }
})

describe("Home", () => {

    afterEach(() => {
        mockedGetData.mockClear()
    })

    test("renders loading", async () => {
        mockedGetData.mockResolvedValueOnce(new Promise(() => { }))
        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        )
        expect(screen.getByText("No Pokémon found")).toBeInTheDocument()
    })

    test("renders list of pokemons", async () => {
        mockedGetData.mockResolvedValueOnce(apiResponse)

        await act(async () => render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        ))

        const pokemon = await screen.findByText("bulbasaur")
        expect(pokemon).toBeInTheDocument()
    })
})
