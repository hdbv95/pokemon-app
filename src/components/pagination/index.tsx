import { useEffect, useState } from "react"

interface PaginationProps {
    paginationData: {
        currentPage: number
        pages: number
        handlePrevPage: () => void
        handleNextPage: () => void
        handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
        shownButtons?: number
    }
}

const Pagination: React.FC<PaginationProps> = (props) => {
    const { pages, currentPage, handlePrevPage, handleNextPage, handleClick, shownButtons = 3 } = props.paginationData
    const [dynamicButtons, setDynamicButtons] = useState<number[]>([])

    useEffect(() => {
        let start = 0;
        let end = pages;

        if (pages > shownButtons) {
            const middle = Math.floor(shownButtons / 2);
            if (currentPage <= middle) {
                // Near the beginning
                start = 0;
                end = shownButtons;
            } else if (currentPage >= pages - middle - 1) {
                // Near the end
                start = pages - shownButtons;
                end = pages;
            } else {
                // In the middle
                start = currentPage - middle;
                end = currentPage + middle + (shownButtons % 2); // Adjust for even/odd shownButtons
            }
        }
        setDynamicButtons(Array.from({ length: end - start }, (_, i) => start + i));
    }, [currentPage, shownButtons, pages]);

    return (
        <>
            <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
            >
                Previous
            </button>

            {/* Render first page button, but only if it's not in dynamicButtons */}
            {pages > 0 && !dynamicButtons.includes(0) && (
                <button
                    key={0}
                    onClick={handleClick}
                    disabled={currentPage === 0}
                >
                    1
                </button>
            )}

            {/* Render ellipsis if needed */}
            {dynamicButtons[0] > 1 && pages > shownButtons && <span>...</span>}

            {/* Render dynamic buttons */}
            {dynamicButtons.map((elem) => (
                <button
                    key={elem}
                    onClick={handleClick}
                    disabled={currentPage === elem}
                >
                    {elem + 1}
                </button>
            ))}

            {/* Render ellipsis if needed */}
            {dynamicButtons.length > 0 && dynamicButtons[dynamicButtons.length - 1] < pages - 2 && pages > shownButtons && <span>...</span>}

            {/* Render last page button, but only if it's not in dynamicButtons */}
            {pages > 1 && !dynamicButtons.includes(pages - 1) && (
                <button
                    key={pages - 1}
                    onClick={handleClick}
                    disabled={currentPage === pages - 1}
                >
                    {pages}
                </button>
            )}

            <button
                onClick={handleNextPage}
                disabled={currentPage + 1 === pages}
            >
                Next
            </button>
        </>
    );
}

export default Pagination