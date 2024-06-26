import useIsMobile from "@/hooks/useIsMobile"
import { useCheckOut } from "@/providers/CheckOutProvider"
import Input from "@/shared/Input"
import ProductDetail from "./ProductDetail"
import RemoveCartButton from "./RemoveCartButton"

const CartItem = ({ data = null, cartId = null, cartIndex }: any) => {
  const isMobile = useIsMobile()
  const { handleQuantityChange } = useCheckOut()

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className="border-b border-b-gray_3 py-[24px] hover:bg-gray_3
        transition duration-[300ms]
        w-full flex flex-col md:flex-row md:justify-between cursor-pointer"
    >
      <div className="flex gap-x-[15px] md:gap-x-[10px] pl-[10px]">
        <ProductDetail data={data} />
      </div>
      {isMobile && (
        <p
          className="text-gray_6 text-[12px] tracking-[-0.3px] font-[400] leading-[100%] text-[12px] 
      mb-[8px] mt-[16px]"
        >
          QTY
        </p>
      )}
      <div
        className="flex flex-row items-center gap-x-[10px] 
      md:items-end md:flex-col md:justify-around pr-[10px]"
      >
        <div className="flex flex-col gap-y-[5px]">
          {!isMobile && (
            <p className="text-gray_6 text-[12px] tracking-[-0.3px] font-[400] leading-[100%] text-[12px]">
              QTY
            </p>
          )}
          <Input
            value={data.quantity}
            type="number"
            onChange={(e) => handleQuantityChange(e, cartIndex)}
            placeholder="Quantity"
            className="!border-gray_6 !bg-white !w-[100px]"
            id="qantity"
            name="qantity"
          />
        </div>
        <RemoveCartButton cartId={cartId} />
      </div>
    </div>
  )
}

export default CartItem
