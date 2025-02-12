import { render, screen, fireEvent } from "@testing-library/react"
import { useUser } from "../../context/UserContext"
import Logout from "./logout"

// Mock useUser hook
jest.mock("../../context/UserContext", () => ({
    useUser: jest.fn()
}))
const mockLogout = jest.fn()

describe("Logout Component", () => {
    it("renders logout button correctly", () => {
        (useUser as jest.Mock).mockReturnValue({ logout: jest.fn() })
        render(<Logout />)
        const button = screen.getByRole("button")
        expect(button).toBeInTheDocument()
    })

    it("calls logout function on button click", () => {
        (useUser as jest.Mock).mockReturnValue({ logout: mockLogout })
        render(<Logout />)
        const button = screen.getByRole("button")
        fireEvent.click(button)
        expect(mockLogout).toHaveBeenCalledTimes(1)
    })
})
