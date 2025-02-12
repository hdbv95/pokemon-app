import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router'
import Login from '.'

// Mocking react-router useNavigate hook
const mockNavigate = jest.fn()
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate,
}))

const mockSetUser = jest.fn()
const mockUseUser = jest.fn()

// Mock the useUser context hook
jest.mock('../../context/UserContext', () => ({
    UserProvider: ({ children }: { children: React.ReactNode }) => children,
    useUser: () => mockUseUser(),
}))

describe('Login Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        localStorage.clear()
        mockNavigate.mockClear()
        mockUseUser.mockReturnValue({ user: null, setUser: mockSetUser })
    })

    test('should redirect to home if user is already logged in', async () => {
        mockUseUser.mockReturnValue({
            user: { name: 'admin' },
            setUser: mockSetUser
        })

        localStorage.setItem('user', JSON.stringify({ name: 'admin' }))

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
    })

    test('should show error message for incorrect login credentials', async () => {
        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        // Get inputs by their IDs
        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')

        // Simulate user typing incorrect credentials
        fireEvent.change(usernameInput, { target: { value: 'wrongUser' } })
        fireEvent.change(passwordInput, { target: { value: 'wrongPass' } })

        // Submit the form
        fireEvent.submit(screen.getByRole('form', { name: /login-form/i }))

        // Wait for the error message to appear
        await waitFor(() => {
            expect(screen.getByText('Invalid user or password')).toBeInTheDocument()
        })
    })

    test('should redirect to home and save user if credentials are correct', async () => {
        mockUseUser.mockReturnValue({ user: null, setUser: mockSetUser })

        render(
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        )

        // Get inputs by their IDs
        const usernameInput = screen.getByLabelText('Username')
        const passwordInput = screen.getByLabelText('Password')

        // Simulate user typing correct credentials
        fireEvent.change(usernameInput, { target: { value: 'admin' } })
        fireEvent.change(passwordInput, { target: { value: 'admin' } })

        // Submit the form
        fireEvent.submit(screen.getByRole('form', { name: /login-form/i }))

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/')
            expect(localStorage.getItem('user')).toEqual(JSON.stringify({ name: 'admin' }))
            expect(mockSetUser).toHaveBeenCalledWith({ name: 'admin' })
        })
    })

    test('should call navigate if user is already logged in', async () => {
        mockUseUser.mockReturnValue({
            user: { name: 'admin' },
            setUser: mockSetUser
        })

        render(
            <MemoryRouter initialEntries={['/login']}>
                <Routes>
                    <Route path="/" element={<div>Home</div>} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </MemoryRouter>
        )

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/')
        })
    })
})
