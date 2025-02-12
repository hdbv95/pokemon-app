import { useEffect, useState } from "react"
import Button from "../button"

interface PaginationProps {
    currentPage: number
    pages: number
    handlePrevPage: () => void
    handleNextPage: () => void
    handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    shownButtons?: number
}

const Pagination: React.FC<PaginationProps> = ({ pages, currentPage, handlePrevPage, handleNextPage, handleClick, shownButtons = 3 }) => {
    const [dynamicButtons, setDynamicButtons] = useState<number[]>([])

    useEffect(() => {
        let start = 0
        let end = pages

        if (pages > shownButtons) {
            const middle = Math.floor(shownButtons / 2)
            if (currentPage <= middle) {
                // Near the beginning
                start = 0
                end = shownButtons
            } else if (currentPage >= pages - middle - 1) {
                // Near the end
                start = pages - shownButtons
                end = pages
            } else {
                // In the middle
                start = currentPage - middle
                end = currentPage + middle + (shownButtons % 2) // Adjust for even/odd shownButtons
            }
        }
        setDynamicButtons(Array.from({ length: end - start }, (_, i) => start + i))
    }, [currentPage, shownButtons, pages])

    return (
        <div className="flex items-center space-x-1 min-w-[240px] justify-center">
            <Button
                handleClick={handlePrevPage}
                isDisabled={currentPage === 0}
                value={"Previous"}
            />

            {/* Render first page button, but only if it's not in dynamicButtons */}
            {pages > 0 && !dynamicButtons.includes(0) && (
                <Button key={0}
                    handleClick={handleClick}
                    isDisabled={currentPage === 0}
                    value={1}
                />
            )}

            {/* Render ellipsis if needed */}
            {dynamicButtons[0] > 1 && pages > shownButtons && <span className="text-xs">...</span>}

            {/* Render dynamic buttons */}
            {dynamicButtons.map((elem) => (
                <Button key={elem}
                    handleClick={handleClick}
                    isDisabled={currentPage === elem}
                    value={elem + 1}
                />
            ))}

            {/* Render ellipsis if needed */}
            {dynamicButtons.length > 0 && dynamicButtons[dynamicButtons.length - 1] < pages - 2 && pages > shownButtons && <span className="text-xs">...</span>}

            {/* Render last page button, but only if it's not in dynamicButtons */}
            {pages > 1 && !dynamicButtons.includes(pages - 1) && (
                <Button
                    key={pages - 1}
                    handleClick={handleClick}
                    isDisabled={currentPage === pages - 1}
                    value={pages}
                />
            )}
            <Button
                handleClick={handleNextPage}
                isDisabled={currentPage + 1 === pages}
                value={"Next"}
            />
        </div>
    )
}

export default Pagination