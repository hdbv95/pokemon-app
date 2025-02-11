import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBox from './index'

describe('SearchBox Component', () => {
    const mockHandleChange = jest.fn()
    const mockHandleSubmit = jest.fn()

    const props = {
        search: '',
        handleChange: mockHandleChange,
        handleSubmit: mockHandleSubmit
    }

    afterEach(() => {
        mockHandleChange.mockClear()
        mockHandleSubmit.mockClear()
    })

    test('renders input with placeholder', () => {
        render(<SearchBox {...props} />)
        const inputElement = screen.getByPlaceholderText('Search...')
        expect(inputElement).toBeInTheDocument()
    })

    test('calls handleChange on input change', () => {
        render(<SearchBox {...props} />)
        const inputElement = screen.getByPlaceholderText('Search...')
        fireEvent.change(inputElement, { target: { value: 'Pikachu' } })
        expect(mockHandleChange).toHaveBeenCalled()
    })

    test('calls handleSubmit on form submit', () => {
        render(<SearchBox {...props} />)
        const inputElement = screen.getByPlaceholderText('Search...')
        fireEvent.change(inputElement, { target: { value: 'Pikachu' } })
        fireEvent.submit(inputElement.closest('form')!)
        expect(mockHandleSubmit).toHaveBeenCalled()
    })
})