import { useTable } from "@/providers/TableProvider"
import Icon from "../../../../../shared/Icon"

const TableFooter = () => {
  const {
    lastPageIndex,
    preMaxPaginations,
    selectedPageIndex,
    prevPage,
    setSelectedPageIndex,
    nextPage,
  } = useTable()

  const paginationClasses = `rounded-[5px] w-[25px] h-[25px] flex justify-center items-center
  text-[16px] leading-[16px]`

  return (
    <tfoot>
      <tr>
        <td colSpan={4} className="py-[30px]">
          <div className="w-full flex justify-center gap-x-[10px] items-center">
            <button type="button" className="w-[25px] flex items-center" onClick={prevPage}>
              <Icon
                name="riArrowLeft"
                size={25}
                className={`${selectedPageIndex === 1 ? "text-gray_4" : "text-black"}`}
              />
            </button>
            {lastPageIndex < selectedPageIndex + preMaxPaginations - 1 &&
              Array(selectedPageIndex + preMaxPaginations - lastPageIndex - 1)
                .fill(0)
                .map((_, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
                    key={i}
                    className={`${
                      lastPageIndex - preMaxPaginations + i + 1 <= 0 ? "hidden" : "block"
                    }`}
                  >
                    {lastPageIndex - preMaxPaginations + i + 1 > 0 && (
                      <button
                        className={`${paginationClasses} text-black`}
                        onClick={() =>
                          setSelectedPageIndex(lastPageIndex - preMaxPaginations + i + 1)
                        }
                        type="button"
                      >
                        {lastPageIndex - preMaxPaginations + i + 1}
                      </button>
                    )}
                  </div>
                ))}
            {Array(lastPageIndex >= preMaxPaginations ? preMaxPaginations : lastPageIndex)
              .fill(0)
              .map((_, i) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                  className={`${selectedPageIndex + i > lastPageIndex ? "hidden" : "block"}`}
                >
                  {selectedPageIndex + i <= lastPageIndex && (
                    <button
                      className={`${paginationClasses} ${
                        i === 0 ? "!bg-black !text-white" : "text-black"
                      }`}
                      onClick={() => setSelectedPageIndex(selectedPageIndex + i)}
                      type="button"
                    >
                      {selectedPageIndex + i}
                    </button>
                  )}
                </div>
              ))}
            {lastPageIndex > selectedPageIndex + preMaxPaginations - 1 && (
              <>
                <p>...</p>
                <button
                  className={`${paginationClasses}`}
                  type="button"
                  onClick={() => setSelectedPageIndex(lastPageIndex)}
                >
                  {lastPageIndex}
                </button>
              </>
            )}
            <button type="button" className="w-[25px] flex items-center" onClick={nextPage}>
              <Icon
                name="riArrowRight"
                size={25}
                className={`${
                  selectedPageIndex > lastPageIndex - preMaxPaginations
                    ? "text-gray_4"
                    : "text-black"
                }`}
              />
            </button>
          </div>
        </td>
      </tr>
    </tfoot>
  )
}

export default TableFooter
