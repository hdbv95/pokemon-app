import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Pagination from '.'

describe('Pagination Component', () => {
    const mockHandlePrevPage = jest.fn()
    const mockHandleNextPage = jest.fn()
    const mockHandleClick = jest.fn()

    const props = {
        paginationData: {
            currentPage: 0,
            pages: 5,
            handlePrevPage: mockHandlePrevPage,
            handleNextPage: mockHandleNextPage,
            handleClick: mockHandleClick,
            shownButtons: 3
        }
    }

    test('renders Previous and Next buttons', () => {
        render(<Pagination {...props} />)
        expect(screen.getByText('Previous')).toBeInTheDocument()
        expect(screen.getByText('Next')).toBeInTheDocument()
    })

    test('Previous button is disabled on first page', () => {
        render(<Pagination paginationData={{ ...props.paginationData, currentPage: 0 }} />)
        expect(screen.getByText('Previous')).toBeDisabled()
    })

    test('Next button is disabled on last page', () => {
        render(<Pagination paginationData={{ ...props.paginationData, currentPage: 4 }} />)
        expect(screen.getByText('Next')).toBeDisabled()
    })

    test('calls handlePrevPage on Previous button click', () => {
        render(<Pagination paginationData={{ ...props.paginationData, currentPage: 1 }} />)
        fireEvent.click(screen.getByText('Previous'))
        expect(mockHandlePrevPage).toHaveBeenCalled()
    })

    test('calls handleNextPage on Next button click', () => {
        render(<Pagination {...props} />)
        fireEvent.click(screen.getByText('Next'))
        expect(mockHandleNextPage).toHaveBeenCalled()
    })

    test('calls handleClick on page button click', async () => {
        render(<Pagination {...props} />)
        expect(screen.getByText('2')).toBeInTheDocument()
        fireEvent.click(screen.getByText('2'))
        expect(mockHandleClick).toHaveBeenCalled()
    })
})