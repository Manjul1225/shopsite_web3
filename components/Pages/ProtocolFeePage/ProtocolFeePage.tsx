import { useState } from "react"
import Layout from "@/components/Layout"
import SeoHead from "@/components/SeoHead"
import Input from "@/shared/Input"
import useSetProtocolFeeRecipient from "@/hooks/useSetProtocolFeeRecipient"
import ProtocolFeeRecipient from "./ProtocolFeeRecipient"

const ProtocolFeePage = () => {
  const [newFeeRecipient, setNewFeeRecipient] = useState<string>("")
  const { setProtocolFeeRecipient } = useSetProtocolFeeRecipient()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewFeeRecipient(e.target.value)
  }

  const handleClick = async () => {
    await setProtocolFeeRecipient(newFeeRecipient)
  }

  return (
    <Layout type="base">
      <SeoHead title="Matter | Home" />
      <div className="flex flex-col gap-5 h-[100vh] items-center justify-center text-black">
        <ProtocolFeeRecipient />
        <Input placeholder="new fee recipient" onChange={handleChange} />
        <button
          type="button"
          className="md:ml-[24px] rounded
            py-[5px] px-[20px] bg-black text-white"
          onClick={handleClick}
        >
          Update
        </button>
      </div>
    </Layout>
  )
}

export default ProtocolFeePage
