import usePurchasedProducts from "@/hooks/usePurchasedProducts"
import DropItem from "./DropItem"

const DropList = () => {
  const { purchasedList } = usePurchasedProducts()

  return (
    <div className="md:col-span-6 xl:col-span-8">
      <div
        className="w-full flex flex-col gap-y-[24px]
                border-t border-t-gray_3 pt-[24px]"
      >
        {purchasedList.map((data) => (
          <DropItem key={data.id} data={data} />
        ))}
      </div>
    </div>
  )
}

export default DropList
