import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchBox from './index'

describe('SearchBox Component', () => {
    const mockHandleChange = jest.fn()
    const mockHandleSubmit = jest.fn()

    const props = {
        searchBoxData: {
            search: '',
            handleChange: mockHandleChange,
            handleSubmit: mockHandleSubmit
        }
    }

    test('renders input with placeholder', () => {
        const { getByPlaceholderText } = render(<SearchBox {...props} />)
        const inputElement = getByPlaceholderText('Search...')
        expect(inputElement).toBeInTheDocument()
    })

    test('calls handleChange on input change', () => {
        const { getByPlaceholderText } = render(<SearchBox {...props} />)
        const inputElement = getByPlaceholderText('Search...')
        fireEvent.change(inputElement, { target: { value: 'Pikachu' } })
        expect(mockHandleChange).toHaveBeenCalled()
    })

    test('calls handleSubmit on form submit', () => {
        const { getByPlaceholderText } = render(<SearchBox {...props} />)
        const inputElement = getByPlaceholderText('Search...')
        fireEvent.change(inputElement, { target: { value: 'Pikachu' } })
        fireEvent.submit(inputElement.closest('form')!)
        expect(mockHandleSubmit).toHaveBeenCalled()
    })
})