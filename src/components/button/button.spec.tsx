import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import Button from '../button'

describe('Button ', () => {
    const mockClick = jest.fn()
    const props = {
        handleClick: mockClick,
        value: "Click me",
        isDisabled: false
    }

    afterEach(() => {
        mockClick.mockClear()
    })

    test('renders button with the correct value', () => {
        render(<Button {...props} />)
        expect(screen.getByText('Click me')).toBeInTheDocument()
        render(<Button  {...props} value={42} />)
        expect(screen.getByText('42')).toBeInTheDocument()
    })

    test('button should trigger handleClick when clicked', () => {
        render(<Button {...props} />)
        fireEvent.click(screen.getByText('Click me'))
        expect(mockClick).toHaveBeenCalledTimes(1)
    })

    test('button should be disabled when isDisabled is true', () => {
        render(<Button  {...props} isDisabled={true} />)
        const button = screen.getByText('Click me') as HTMLButtonElement
        expect(button).toBeDisabled()
        fireEvent.click(button)
        expect(mockClick).not.toHaveBeenCalled();
    });

    test('button should not be disabled when isDisabled is false', () => {
        render(<Button {...props} />)
        const button = screen.getByText('Click me') as HTMLButtonElement
        expect(button).not.toBeDisabled()
        fireEvent.click(button)
        expect(mockClick).toHaveBeenCalledTimes(1)
    })
})
