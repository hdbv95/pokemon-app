import '@testing-library/jest-dom'
import { render, screen, fireEvent } from "@testing-library/react"
import Modal from "."
import { pokemonResponse, singleTypePokemon, pokemonWithoutSprite } from "../../utils/fixtures"

jest.mock("../../assets/pokeball.png", () => "pokeBallMock")

// Test suite for Modal component
describe("Modal Component", () => {
    const mockhandleClose = jest.fn()

    const props = {
        isOpen: true,
        handleClose: () => { },
        pokemon: pokemonResponse
    }

    afterEach(() => {
        mockhandleClose.mockClear()
    })

    test("renders the modal when isOpen is true", () => {
        render(<Modal {...props} />)
        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument()
    })

    test("does not render the modal when isOpen is false", () => {
        render(<Modal {...props} isOpen={false} />)
        expect(screen.queryByText(/bulbasaur/i)).not.toBeInTheDocument()
    })

    test("calls handleClose when close button is clicked", () => {
        render(<Modal {...props} isOpen={true} handleClose={mockhandleClose} />)
        const closeButton = screen.getByRole("button", { name: /×/i })
        fireEvent.click(closeButton)
        expect(mockhandleClose).toHaveBeenCalledTimes(1)
    })

    test("renders the correct gradient for single type Pokémon", () => {
        render(<Modal {...props} pokemon={singleTypePokemon} />)
        const modal = screen.getByText(/bulbasaur/i).closest("div")
        expect(modal).toHaveStyle("background: linear-gradient(to bottom, #f08030, #f08d3c)")
    })

    test("renders the correct gradient for multiple types Pokémon", () => {
        render(<Modal {...props} />)
        const modal = screen.getByText(/bulbasaur/i).closest("div")
        expect(modal).toHaveStyle("background: linear-gradient(to bottom, #78c850, #a33ea1)")
    })

    test("renders Pokémon types with dividers and correct spacing", () => {
        render(<Modal {...props} />)
        const typeItems = screen.getByTestId('types').childNodes
        expect(typeItems.length).toBe(2)
        const firstType = typeItems[0]
        expect(firstType).toHaveClass("border-r-2")
    })

    test("renders fallback PokéBall image if sprite is missing", () => {
        render(<Modal isOpen={true} handleClose={() => { }} pokemon={pokemonWithoutSprite} />)
        const img = screen.getByAltText(/bulbasaur/i) as HTMLImageElement
        expect(img.src).toContain("pokeBallMock")
    })

    test("renders Pokémon ID, height, and weight correctly", () => {
        render(<Modal {...props} />)
        expect(screen.getByText(/ID:/i).textContent).toBe("ID: 1")
        expect(screen.getByText(/Height:/i).textContent).toBe("Height: 7 dm")
        expect(screen.getByText(/Weight:/i).textContent).toBe("Weight: 69 hg")
    })
})
