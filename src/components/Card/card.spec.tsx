import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react"
import { pokemonResponse } from "../../utils/fixtures"
import { getData } from "../../utils/api"
import Card from "."

jest.mock('../../utils/api')
const mockedGetData = getData as jest.MockedFunction<typeof getData>

describe("Card", () => {
    test("renders pokemon data", async () => {
        const mockPokemonData = {
            sprites: {
                front_default: "mock-url"
            }
        }
        mockedGetData.mockResolvedValueOnce(mockPokemonData)
        await act(async () => render(<Card pokemon={ pokemonResponse } />))

        expect(screen.getByText(pokemonResponse.name)).toBeInTheDocument()
        expect(screen.getByAltText(pokemonResponse.name)).toHaveAttribute('src', 'mock-url')
    })
})