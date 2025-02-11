import '@testing-library/jest-dom'
import { act, render, screen } from "@testing-library/react"
import { basePokemonResponse } from "../../utils/fixtures"
import { getData } from "../../utils/api"
import Card from "."

jest.mock('../../utils/api')
const mockedGetData = getData as jest.MockedFunction<typeof getData>
const handleCardClickMock = jest.fn()

describe("Card", () => {
    afterEach(() => {
        mockedGetData.mockClear()
        handleCardClickMock.mockClear()
    })

    test("renders pokemon data", async () => {
        const mockPokemonData = {
            sprites: {
                front_default: "mock-url"
            }
        }
        mockedGetData.mockResolvedValueOnce(mockPokemonData)
        await act(async () => render(<Card pokemon={basePokemonResponse} handleCardClick={handleCardClickMock} />))

        expect(screen.getByText(basePokemonResponse.name)).toBeInTheDocument()
        expect(screen.getByAltText(basePokemonResponse.name)).toHaveAttribute('src', 'mock-url')
    })
})